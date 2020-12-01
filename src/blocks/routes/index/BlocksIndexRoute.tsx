import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import { gql, useQuery } from '@apollo/client'
import { DatePicker, Table } from 'antd'
import { MainLayout } from '../../../common/components/Layout'
import { maxDate } from '../../../common/helpers/date'
import { StyledAlert } from './BlocksIndexRoute.styled'
import { useUpdateEffect } from 'react-use'

const { Column } = Table

const GET_BLOCKS = gql`
  query GetBlocks($date: Day!) {
    blocks(date: $date) {
      height
      hash
      time
    }
  }
`

const disabledDate = (date: Moment) => {
  return date && moment(date).isAfter(maxDate)
}

export const BlocksIndexRoute: React.FC = () => {
  const [internalDate, setDate] = useState(maxDate)
  const date = internalDate && internalDate.isSameOrBefore(maxDate) ? internalDate : maxDate

  const { loading, error, data } = useQuery(GET_BLOCKS, {
    variables: { date: date.format('YYYY-MM-DD') },
  })

  const [latestBlocks, setLatestBlocks] = useState([])

  useUpdateEffect(() => {
    if (data?.blocks) {
      setLatestBlocks(data.blocks)
    }
  }, [data, loading, error])

  return (
    <MainLayout>
      {error && <StyledAlert message="Error while fetching blocks!" description={error.message} type="error" />}
      <DatePicker
        size={'large'}
        disabledDate={disabledDate}
        allowClear={false}
        showToday={false}
        value={date}
        onChange={(value) => setDate(moment(value))}
      />
      <Table dataSource={latestBlocks} loading={loading}>
        <Column title="Height" dataIndex="height" key="height" render={(text) => <a>{text}</a>} />
        <Column title="Hash" dataIndex="hash" key="hash" render={(text) => <a>{text}</a>} />
        <Column
          title="Mined"
          dataIndex="time"
          key="time"
          render={(value) => moment(value * 1000).format('YYYY-MM-DD HH:ss')}
        />
        <Column title="" key="action" render={(text, record) => <a>Delete</a>} />
      </Table>
      ,
    </MainLayout>
  )
}
