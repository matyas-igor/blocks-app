import * as React from 'react'
import moment, { Moment } from 'moment'
import { FormWrapper, PageText } from '../../../../common/components/Page'
import { Button, DatePicker, Space } from 'antd'
import { maxDate } from '../../../../common/helpers/date'
import { useMemo } from 'react'

const disabledDate = (date: Moment) => {
  return date && moment(date).isAfter(maxDate)
}

type Props = {
  date: Moment
  page: number
  pageSize: number
  loading: boolean
  total: number | undefined
  latestTotal: number
  onDateChange: (date: Moment | null) => void
  onPageChange: (page: number) => void
}

export const BlocksIndexForm: React.FC<Props> = ({
  date,
  page,
  pageSize,
  loading,
  total,
  latestTotal,
  onDateChange,
  onPageChange,
}) => {
  const isMaxDay = useMemo(() => moment(date).add(1, 'days').isAfter(maxDate), [date])
  return (
    <FormWrapper>
      <Space direction={'horizontal'}>
        <DatePicker
          size={'large'}
          disabledDate={disabledDate}
          allowClear={false}
          showToday={false}
          value={date}
          onChange={onDateChange}
        />
        <Button size={'large'} disabled={loading} onClick={() => onDateChange(moment(date).add(-1, 'days'))}>
          Previous day
        </Button>
        <Button size={'large'} disabled={loading || isMaxDay} onClick={() => onDateChange(moment(date).add(1, 'days'))}>
          Next day
        </Button>
        {total && (
          <PageText>
            Blocks on {moment(date).format('MMM D, YYYY')}: <strong>{total}</strong>
          </PageText>
        )}
      </Space>
      <Space direction={'horizontal'}>
        <Button size={'large'} disabled={loading || page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous page
        </Button>
        <Button
          size={'large'}
          disabled={loading || page * pageSize >= latestTotal}
          onClick={() => onPageChange(page + 1)}
        >
          Next page
        </Button>
      </Space>
    </FormWrapper>
  )
}
