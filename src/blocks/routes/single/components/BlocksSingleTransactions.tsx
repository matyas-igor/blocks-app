import React, { useState } from 'react'
import { Typography } from 'antd'
import { gql, useQuery } from '@apollo/client'
import { NetworkAlert } from '../../../../common/components/Alert'
import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { TablePaginationConfig } from 'antd/es/table'
import { BlocksSingleTransactionsList } from './BlocksSingleTransactionsList'

const PAGE_MIN_SIZE = 10
const PAGE_SIZE = 10

const GET_TRANSACTIONS = gql`
  query GetTransactions($hash: Hash!, $offset: Int!, $limit: Int!) {
    transactions(hash: $hash, offset: $offset, limit: $limit) {
      total
      transactions {
        fee
        hash
        inputs {
          index
          prev_out {
            addr
            value
          }
        }
        lock_time
        out {
          addr
          value
        }
        size
        time
        tx_index
        weight
      }
    }
  }
`

type Filter = { page: number; pageSize: number }

type Props = {
  hash?: string
}

const parseSearch = (search: string): Filter => {
  const { page, pageSize } = queryString.parse(search)
  return {
    page: Math.max(parseInt((page || '').toString(), 10) || 1, 1),
    pageSize: Math.max(parseInt((pageSize || '').toString(), 10) || PAGE_SIZE, PAGE_MIN_SIZE),
  }
}

const formatSearch = ({ page, pageSize }: Filter): string => {
  return queryString.stringify({
    page,
    pageSize,
  })
}

export const BlocksSingleTransactions: React.FC<Props> = ({ hash }) => {
  const history = useHistory()
  const { search } = useLocation()
  const [filter, setFilter] = useState(parseSearch(search))

  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: { hash, offset: (filter.page - 1) * filter.pageSize, limit: filter.pageSize },
  })

  const [latestTransactions, setLatestTransactions] = useState(data?.transactions?.transactions || [])
  const [latestTotal, setLatestTotal] = useState(data?.transactions?.total || 0)

  useUpdateEffect(() => {
    if (data?.transactions?.total) {
      setLatestTransactions(data.transactions.transactions)
      setLatestTotal(data.transactions.total)
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

  return (
    <>
      <Typography.Title level={2}>Transactions</Typography.Title>
      <NetworkAlert error={error} refetch={refetch} loading={loading} />
      <BlocksSingleTransactionsList
        loading={loading}
        page={filter.page}
        pageSize={filter.pageSize}
        latestTotal={latestTotal}
        latestTransactions={latestTransactions}
        onTableChange={handleTableChange}
      />
    </>
  )
}
