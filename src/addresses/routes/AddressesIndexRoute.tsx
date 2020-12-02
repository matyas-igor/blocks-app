import React from 'react'
import { Helmet } from 'react-helmet'
import { MainLayout } from '../../common/components/Layout'
import { PageTitle } from '../../common/components/Page'

export const AddressesIndexRoute: React.FC = () => (
  <MainLayout
    breadcrumbs={[
      { to: '/blocks', name: 'Explorer' },
      { to: `/addresses`, name: 'Addresses', active: true },
    ]}
  >
    <Helmet>
      <title>Addresses | Blockchain Explorer</title>
    </Helmet>
    <PageTitle>Addresses</PageTitle>
  </MainLayout>
)
