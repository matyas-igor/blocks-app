export const formatValue = (number: number | BigInt, currency: string = 'BTC'): string => {
  if (number === undefined || number === null) {
    return ''
  }
  const bigNumber = BigInt(number)
  const floatPart = bigNumber % 10n ** 8n
  const integerPart = bigNumber - floatPart
  return `${(integerPart / 10n ** 8n).toLocaleString()}.${floatPart.toString().padStart(8, '0')}${
    currency ? ` ${currency}` : ''
  }`
}

const INITIAL_REWARD = 50n * 10n ** 8n
const HALVINGS_INTERVAL = 210000n

export const getBlockReward = (blockHeight: number, currency: string = 'BTC'): string => {
  const halvingsAmount = BigInt(blockHeight) / HALVINGS_INTERVAL
  const currentReward = INITIAL_REWARD / 2n ** halvingsAmount
  return formatValue(currentReward, currency)
}
