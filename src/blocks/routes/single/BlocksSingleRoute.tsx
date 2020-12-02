import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { gql, useQuery } from '@apollo/client'
import { MainLayout } from '../../../common/components/Layout'
import { PageTitle } from '../../../common/components/Page'
import { Typography } from 'antd'
import { NetworkAlert } from '../../../common/components/Alert'

const GET_BLOCK = gql`
  query GetBlock($hash: Hash!) {
    block(hash: $hash) {
      hash
      ver
      prev_block
      mrkl_root
      time
      bits
      block_index
      height
      main_chain
      n_tx
      nonce
      received_time
      relayed_by
      size
    }
  }
`

export const BlocksSingleRoute: React.FC = () => {
  const { hash } = useParams<{ hash: string }>()
  const { loading, error, data, refetch } = useQuery(GET_BLOCK, {
    variables: { hash },
  })

  console.log('DATA', loading, error, data)

  const title = `Block${data?.block?.height ? `: ${data.block.height}` : ''}`

  return (
    <MainLayout
      breadcrumbs={[
        { to: '/blocks', name: 'Explorer' },
        { to: `/blocks/${hash}`, name: title, active: true },
      ]}
    >
      <Helmet>
        <title>{title} | Blockchain Explorer</title>
      </Helmet>
      <PageTitle>{title}</PageTitle>
      <NetworkAlert error={error} refetch={refetch} loading={loading} />
      <Typography.Title level={2}>Transactions</Typography.Title>
    </MainLayout>
  )
}
