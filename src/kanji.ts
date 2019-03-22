import { NumberMap, DigitMap } from './types'

import { lookupMap, lookupArray } from './lib/lookup'
import { createGenerator, createParser } from './common'

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

const TENS: NumberMap = [
  [Math.pow(10, 16), '京'],
  [Math.pow(10, 12), '兆'],
  [Math.pow(10, 8), '億'],
  [Math.pow(10, 4), '万'],
  [1000, '千'],
  [100, '百'],
  [10, '十']
]

const ALL_TEXT = [...DIGITS, ...TENS.map(ten => ten[1])]

const lookupFuncs = {
  lookupDigit: lookupArray(DIGITS),
  lookupMultiple: lookupMap(TENS)
}

export const parse = createParser(lookupFuncs, ALL_TEXT)

export const generate = createGenerator(lookupFuncs, TENS.map(ten => ten[0]))
