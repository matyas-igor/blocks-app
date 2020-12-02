import * as React from 'react'
import moment from 'moment'
import { Table } from 'antd'
import { LinkMono } from '../../../../common/components/Page/Page.styled'
import { TablePaginationConfig } from 'antd/es/table'

type Props = {
  page: number
  pageSize: number
  loading: boolean
  latestTotal: number
  latestBlocks: any[]
  onTableChange: (pagination: TablePaginationConfig) => void
}

export const BlocksIndexList: React.FC<Props> = ({
  page,
  pageSize,
  loading,
  latestTotal,
  latestBlocks,
  onTableChange,
}) => (
  <Table
    pagination={{ pageSize: pageSize, current: page, total: latestTotal, position: ['bottomLeft'] }}
    dataSource={latestBlocks}
    loading={loading}
    onChange={onTableChange}
  >
    <Table.Column title="Height" dataIndex="height" key="height" render={(text) => <a>{text}</a>} width={100} />
    <Table.Column title="Hash" dataIndex="hash" key="hash" render={(text) => <LinkMono>{text}</LinkMono>} />
    <Table.Column
      title="Mined"
      dataIndex="time"
      key="time"
      render={(value) => moment(value * 1000).format('YYYY-MM-DD HH:ss')}
      width={180}
    />
    <Table.Column title="" key="action" render={(text, record) => <a>Explore block</a>} width={132} />
  </Table>
)
