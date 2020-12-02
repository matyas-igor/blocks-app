import React, { useState } from 'react'
import { Moment } from 'moment'
import { gql, useQuery } from '@apollo/client'
import { useUpdateEffect } from 'react-use'
import { Alert } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'
import { MainLayout } from '../../../common/components/Layout'
import { maxDate } from '../../../common/helpers/date'
import { AlertWrapper, PageTitle } from '../../../common/components/Page'
import { BlocksIndexForm } from './components/BlocksIndexForm'
import { BlocksIndexList } from './components/BlocksIndexList'

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

export const BlocksIndexRoute: React.FC = () => {
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: PAGE_SIZE,
    date: maxDate,
  })

  const date = filter.date && filter.date.isSameOrBefore(maxDate) ? filter.date : maxDate

  const { loading, error, data } = useQuery(GET_BLOCKS, {
    variables: { date: date.format('YYYY-MM-DD'), offset: (filter.page - 1) * filter.pageSize, limit: filter.pageSize },
  })

  const [latestBlocks, setLatestBlocks] = useState([])
  const [latestTotal, setLatestTotal] = useState(0)

  useUpdateEffect(() => {
    if (data?.blocks?.total) {
      setLatestBlocks(data.blocks.blocks)
      setLatestTotal(data.blocks.total)
    }
  }, [data, loading, error])

  const handleTableChange = ({ current, pageSize }: TablePaginationConfig) => {
    setFilter((state) => ({ ...state, page: current || 1, pageSize: pageSize || PAGE_SIZE }))
  }
  const handleDateChange = (date: Moment | null) => {
    setFilter((state) => ({ ...state, page: 1, date: date || maxDate }))
  }
  const handlePageChange = (page: number) => {
    setFilter((state) => ({ ...state, page }))
  }

  return (
    <MainLayout>
      <PageTitle>Blocks</PageTitle>
      {error && (
        <AlertWrapper>
          <Alert message="Error while fetching blocks!" description={error.message} type="error" />
        </AlertWrapper>
      )}
      <BlocksIndexForm
        date={date}
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
