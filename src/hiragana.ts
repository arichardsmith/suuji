import { NumberMap, DigitMap } from './types'

import { lookupMap, lookupArray } from './lib/lookup'
import { createGenerator, createParser } from './common'

const DIGITS: DigitMap = [
  'れい',
  'いち',
  'に',
  'さん',
  'よん',
  'ご',
  'ろく',
  'なな',
  'はち',
  'きゅう'
]

const TENS: NumberMap = [
  [Math.pow(10, 16), 'けい'],
  [Math.pow(10, 12), 'ちょう'],
  [Math.pow(10, 8), 'おく'],
  [Math.pow(10, 4), 'まん'],
  [1000, 'せん'],
  [100, 'ひゃく'],
  [10, 'じゅう']
]

const EXCEPTIONS: NumberMap = [
  [300, 'さんびゃく'],
  [3000, 'さんぜん'],
  [600, 'ろっぴゃく'],
  [800, 'はっぴゃく'],
  [8000, 'はっせん']
]

const ALL_TEXT = [
  ...DIGITS,
  ...TENS.map(ten => ten[1]),
  ...EXCEPTIONS.map(excep => excep[1])
]

const lookupFuncs = {
  lookupDigit: lookupArray(DIGITS),
  lookupException: lookupMap(EXCEPTIONS),
  lookupMultiple: lookupMap(TENS)
}

export const parse = createParser(lookupFuncs, ALL_TEXT)

export const generate = createGenerator(lookupFuncs, TENS.map(ten => ten[0]))
