import { DigitMap } from './types'

import { lookupArray } from './lib/lookup'

const DIGITS: DigitMap = [
  '〇',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九'
]

const lookupDigit = lookupArray(DIGITS)

export function generate(number: number) {
  const chars: Array<string> = []

  let remaining = number
  do {
    const digit = remaining % 10

    const res = lookupDigit(digit)

    if (res !== undefined) {
      chars.unshift(res)
    } else {
      throw new Error(`Unable to look up ${digit}`)
    }

    remaining = Math.floor(remaining / 10)
  } while (remaining > 0)

  return chars.join('')
}

export function parse(text: string): number {
  const chars = text.split('').reverse()

  const numbers = chars.map((char, powerOfTen) => {
    const digit = lookupDigit(char)
    if (digit === undefined) {
      throw new Error(`Unknown digit character ${char}`)
    }

    return digit * Math.pow(10, powerOfTen)
  })

  return numbers.reduce((total: number, num: number) => total + num, 0)
}
