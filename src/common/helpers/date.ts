import moment, { Moment } from 'moment'

export const now = moment.utc()

export const maxDate = moment(now).add(-1, 'days')

export const parseDate = (date: string): Moment => {
  return moment(`${date} 00:00:00+00:00`, 'YYYY-MM-DD HH:mm:ss+Z')
}

export const formatDate = (date: Moment): string => {
  return date.format('YYYY-MM-DD')
}
