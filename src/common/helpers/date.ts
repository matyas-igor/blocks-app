import moment from 'moment'

export const now = moment.utc()

export const maxDate = moment(now).add(-1, 'days')
