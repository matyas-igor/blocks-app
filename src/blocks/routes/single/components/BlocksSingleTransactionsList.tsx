import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Descriptions, Table, Typography } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'
import { FORMAT_LONG } from '../../../../common/helpers/date'
import { formatValue } from '../../../../common/helpers/format'
import { DescriptionsBlock, LinkMono, TextMono } from '../../../../common/components/Page'

const LABEL_TINY_STYLE = { width: 60 }
const LABEL_SMALL_STYLE = { width: 80 }
const ADDRESS_STYLE = { width: 310 }

type Props = {
  page: number
  pageSize: number
  loading: boolean
  latestTotal: number
  latestTransactions: any[]
  onTableChange: (pagination: TablePaginationConfig) => void
}

export const BlocksSingleTransactionsList: React.FC<Props> = ({
  page,
  pageSize,
  loading,
  latestTotal,
  latestTransactions,
  onTableChange,
}) => (
  <Table
    showHeader={false}
    pagination={{ pageSize: pageSize, current: page, total: latestTotal, position: ['bottomLeft'] }}
    dataSource={latestTransactions}
    loading={loading}
    onChange={onTableChange}
  >
    <Table.Column
      title="Info"
      dataIndex="time"
      key="time"
      render={(_, record: any) => (
        <DescriptionsBlock size={'small'} column={2}>
          <Descriptions.Item labelStyle={LABEL_TINY_STYLE} label="Hash">
            <Link component={LinkMono} to={`/transactions/${record.hash}`}>
              {record.hash}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={LABEL_TINY_STYLE} label="Time">
            {moment(record.time * 1000).format(FORMAT_LONG)}
          </Descriptions.Item>
          <Descriptions.Item labelStyle={LABEL_TINY_STYLE} label="Input">
            <DescriptionsBlock size={'small'} column={1}>
              {record.inputs.map((input: any, index: number) =>
                input?.prev_out ? (
                  <Descriptions.Item
                    key={index}
                    label={
                      <Typography.Text ellipsis>
                        <Link component={LinkMono} to={`/addresses/${input.prev_out.addr}`}>
                          {input.prev_out.addr}
                        </Link>
                      </Typography.Text>
                    }
                    labelStyle={ADDRESS_STYLE}
                  >
                    {formatValue(input.prev_out?.value)}
                  </Descriptions.Item>
                ) : (
                  <Descriptions.Item key={input.index} label={'Newly generated coins'} labelStyle={ADDRESS_STYLE}>
                    {formatValue(0)}
                  </Descriptions.Item>
                )
              )}
            </DescriptionsBlock>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={LABEL_TINY_STYLE} label="Output">
            <DescriptionsBlock size={'small'} column={1}>
              {record.out.map((output: any, index: number) => (
                <Descriptions.Item
                  key={index}
                  label={
                    output?.addr && output.addr !== 'null' ? (
                      <Typography.Text ellipsis>
                        <Link component={LinkMono} to={`/addresses/${output.addr}`}>
                          {output.addr}
                        </Link>
                      </Typography.Text>
                    ) : (
                      'OP_RETURN'
                    )
                  }
                  labelStyle={ADDRESS_STYLE}
                >
                  {formatValue(output?.value)}
                </Descriptions.Item>
              ))}
            </DescriptionsBlock>
          </Descriptions.Item>
        </DescriptionsBlock>
      )}
    />
    <Table.Column
      title="Fee"
      dataIndex="fee"
      key="fee"
      width={240}
      render={(_, record: any) => {
        const value = record.out.reduce((acc: bigint, out: any) => acc + BigInt(out?.value || 0), 0n)
        return (
          <DescriptionsBlock size={'small'} column={1}>
            <Descriptions.Item labelStyle={LABEL_SMALL_STYLE} label="Value">
              <Typography.Text ellipsis strong>
                {formatValue(value)}
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_SMALL_STYLE} label="Fee">
              <Typography.Text ellipsis type="secondary">
                {formatValue(record.fee)}
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_SMALL_STYLE} label="Weight">
              {parseInt(record.weight, 10).toLocaleString()} WU
            </Descriptions.Item>
          </DescriptionsBlock>
        )
      }}
    />
  </Table>
)
