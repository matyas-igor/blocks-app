import * as React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { LinkMono } from '../../../../common/components/Page'
import { TablePaginationConfig } from 'antd/es/table'
import { FORMAT_LONG } from '../../../../common/helpers/date'

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
    <Table.Column
      title="Height"
      dataIndex="height"
      key="height"
      render={(text, record: any) => <Link to={`/blocks/${record.hash}`}>{text}</Link>}
      width={100}
    />
    <Table.Column
      title="Hash"
      dataIndex="hash"
      key="hash"
      render={(text, record: any) => (
        <Link component={LinkMono} to={`/blocks/${record.hash}`}>
          {text}
        </Link>
      )}
    />
    <Table.Column
      title="Mined"
      dataIndex="time"
      key="time"
      render={(value) => moment(value * 1000).format(FORMAT_LONG)}
      width={180}
    />
    <Table.Column
      title=""
      key="action"
      render={(text, record: any) => <Link to={`/blocks/${record.hash}`}>Explore block</Link>}
      width={132}
    />
  </Table>
)
