import React from 'react'
import { Helmet } from 'react-helmet'
import { MainLayout } from '../../common/components/Layout'
import { PageTitle } from '../../common/components/Page'

export const TransactionsIndexRoute: React.FC = () => (
  <MainLayout
    breadcrumbs={[
      { to: '/blocks', name: 'Explorer' },
      { to: `/transactions`, name: 'Transactions', active: true },
    ]}
  >
    <Helmet>
      <title>Transactions | Blockchain Explorer</title>
    </Helmet>
    <PageTitle>Transactions</PageTitle>
  </MainLayout>
)
