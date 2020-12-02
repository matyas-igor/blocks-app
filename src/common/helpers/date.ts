import moment, { Moment } from 'moment'

export const FORMAT_SHORT = 'YYYY-MM-DD'
export const FORMAT_LONG = 'YYYY-MM-DD HH:ss'

export const now = moment.utc()

export const maxDate = moment(now).add(-1, 'days')

export const parseDate = (date: string): Moment => {
  return moment(`${date} 00:00:00+00:00`, 'YYYY-MM-DD HH:mm:ss+Z')
}

export const formatDate = (date: Moment): string => {
  return date.format(FORMAT_SHORT)
}
