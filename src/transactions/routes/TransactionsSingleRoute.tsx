import React from 'react'
import { Helmet } from 'react-helmet'
import { MainLayout } from '../../common/components/Layout'
import { LinkMono, PageTitle } from '../../common/components/Page'
import { Descriptions } from 'antd'
import { Link, useParams } from 'react-router-dom'

const LABEL_STYLE = { width: 180 }

export const TransactionsSingleRoute: React.FC = () => {
  const { hash } = useParams<{ hash: string }>()
  return (
    <MainLayout
      breadcrumbs={[
        { to: '/blocks', name: 'Explorer' },
        { to: `/transactions`, name: 'Transactions' },
        { to: `/transactions/${hash}`, name: `Transaction: ${hash}`, active: true },
      ]}
    >
      <Helmet>
        <title>Transactions: {hash} | Blockchain Explorer</title>
      </Helmet>
      <PageTitle>Transaction</PageTitle>
      <Descriptions bordered size={'small'} column={1}>
        <Descriptions.Item labelStyle={LABEL_STYLE} label="Hash">
          <Link component={LinkMono} to={`/transactions/${hash}`}>
            {hash}
          </Link>
        </Descriptions.Item>
      </Descriptions>
    </MainLayout>
  )
}
