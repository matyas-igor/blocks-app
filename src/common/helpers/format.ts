// '**' operation for BigInt's is broken on transpiling level, so I have to replace it
// TypeError: Cannot convert a BigInt value to a number
//     at Math.pow (<anonymous>)
const power = (x: bigint, y: bigint) => {
  let result = BigInt(x)
  let exponent = BigInt(y)
  while (exponent > 1n) {
    result = result * BigInt(x)
    exponent -= 1n
  }
  return result
}

export const formatValue = (number: number | BigInt, currency: string = 'BTC'): string => {
  if (number === undefined || number === null) {
    return ''
  }
  const bigNumber = BigInt(number)
  const floatPart = bigNumber % 100000000n
  const integerPart = bigNumber - floatPart
  return `${(integerPart / 100000000n).toLocaleString()}.${floatPart.toString().padStart(8, '0')}${
    currency ? ` ${currency}` : ''
  }`
}

const INITIAL_REWARD = 50n * 100000000n
const HALVINGS_INTERVAL = 210000n

export const getBlockReward = (blockHeight: number, currency: string = 'BTC'): string => {
  const halvingsAmount = BigInt(blockHeight) / HALVINGS_INTERVAL
  const currentReward = INITIAL_REWARD / power(2n, halvingsAmount)
  return formatValue(currentReward, currency)
}
