import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import queryString from 'query-string'
import { Moment } from 'moment'
import { gql, useQuery } from '@apollo/client'
import { useUpdateEffect } from 'react-use'
import { TablePaginationConfig } from 'antd/es/table'
import { MainLayout } from '../../../common/components/Layout'
import { formatDate, maxDate, parseDate } from '../../../common/helpers/date'
import { PageTitle } from '../../../common/components/Page'
import { BlocksIndexForm } from './components/BlocksIndexForm'
import { BlocksIndexList } from './components/BlocksIndexList'
import { NetworkAlert } from '../../../common/components/Alert'

const PAGE_MIN_SIZE = 10
const PAGE_SIZE = 20

const GET_BLOCKS = gql`
  query GetBlocks($date: Day!, $offset: Int!, $limit: Int!) {
    blocks(date: $date, offset: $offset, limit: $limit) {
      total
      blocks {
        height
        hash
        time
      }
    }
  }
`

type Filter = { page: number; pageSize: number; date: Moment }

const parseSearch = (search: string): Filter => {
  const { page, pageSize, date } = queryString.parse(search)
  const momentDate = date && typeof date === 'string' ? parseDate(date) : maxDate
  return {
    page: Math.max(parseInt((page || '').toString(), 10) || 1, 1),
    pageSize: Math.max(parseInt((pageSize || '').toString(), 10) || PAGE_SIZE, PAGE_MIN_SIZE),
    date: momentDate.isValid() && momentDate.isSameOrBefore(maxDate) ? momentDate : maxDate,
  }
}

const formatSearch = ({ page, pageSize, date }: Filter): string => {
  return queryString.stringify({
    page,
    pageSize,
    date: formatDate(date),
  })
}

export const BlocksIndexRoute: React.FC = () => {
  const history = useHistory()
  const { search } = useLocation()
  const [filter, setFilter] = useState(parseSearch(search))

  const { loading, error, data, refetch } = useQuery(GET_BLOCKS, {
    variables: {
      date: filter.date.format('YYYY-MM-DD'),
      offset: (filter.page - 1) * filter.pageSize,
      limit: filter.pageSize,
    },
  })

  const [latestBlocks, setLatestBlocks] = useState(data?.blocks?.blocks || [])
  const [latestTotal, setLatestTotal] = useState(data?.blocks?.total || 0)

  useUpdateEffect(() => {
    if (data?.blocks?.total) {
      setLatestBlocks(data.blocks.blocks)
      setLatestTotal(data.blocks.total)
    }
  }, [data, loading, error])

  useUpdateEffect(() => {
    setFilter(parseSearch(search))
  }, [search])

  const handleTableChange = ({ current, pageSize }: TablePaginationConfig) => {
    history.push({
      search: formatSearch({ ...filter, page: current || 1, pageSize: pageSize || PAGE_SIZE }),
    })
  }
  const handleDateChange = (date: Moment | null) => {
    history.push({
      search: formatSearch({ ...filter, page: 1, date: date || maxDate }),
    })
  }
  const handlePageChange = (page: number) => {
    history.push({
      search: formatSearch({ ...filter, page }),
    })
  }

  return (
    <MainLayout breadcrumbs={[{ to: '/blocks', name: 'Explorer', active: true }]}>
      <Helmet>
        <title>Blockchain Explorer</title>
      </Helmet>
      <PageTitle>Blocks</PageTitle>
      <NetworkAlert error={error} refetch={refetch} loading={loading} />
      <BlocksIndexForm
        date={filter.date}
        page={filter.page}
        pageSize={filter.pageSize}
        loading={loading}
        onDateChange={handleDateChange}
        onPageChange={handlePageChange}
        total={data?.blocks?.total}
        latestTotal={latestTotal}
      />
      <BlocksIndexList
        page={filter.page}
        pageSize={filter.pageSize}
        loading={loading}
        latestTotal={latestTotal}
        latestBlocks={latestBlocks}
        onTableChange={handleTableChange}
      />
    </MainLayout>
  )
}
