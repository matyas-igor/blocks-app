import React from 'react'
import { Helmet } from 'react-helmet'
import { MainLayout } from '../../common/components/Layout'
import { LinkMono, PageTitle } from '../../common/components/Page'
import { Descriptions } from 'antd'
import { Link, useParams } from 'react-router-dom'

const LABEL_STYLE = { width: 180 }

export const AddressesSingleRoute: React.FC = () => {
  const { hash } = useParams<{ hash: string }>()
  return (
    <MainLayout
      breadcrumbs={[
        { to: '/blocks', name: 'Explorer' },
        { to: `/addresses`, name: 'Addresses' },
        { to: `/addresses/${hash}`, name: `Address: ${hash}`, active: true },
      ]}
    >
      <Helmet>
        <title>Addresses: {hash} | Blockchain Explorer</title>
      </Helmet>
      <PageTitle>Address</PageTitle>
      <Descriptions bordered size={'small'} column={1}>
        <Descriptions.Item labelStyle={LABEL_STYLE} label="Hash">
          <Link component={LinkMono} to={`/addresses/${hash}`}>
            {hash}
          </Link>
        </Descriptions.Item>
      </Descriptions>
    </MainLayout>
  )
}
