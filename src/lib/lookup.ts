import { NumberMap, DigitMap } from '../types'

export function lookupMap(map: NumberMap) {
  function lookupFromMap(search: number): string | undefined
  function lookupFromMap(search: string): number | undefined
  function lookupFromMap(search: number | string) {
    if (typeof search === 'number') {
      const match = map.find(test => test[0] === search)
      return match === undefined ? undefined : match[1]
    }

    const match = map.find(test => test[1] === search)
    return match === undefined ? undefined : match[0]
  }

  return lookupFromMap
}

export function lookupArray(map: DigitMap) {
  function lookupFromArray(search: number): string | undefined
  function lookupFromArray(search: string): number | undefined
  function lookupFromArray(search: string | number) {
    if (typeof search === 'number') {
      return map[search]
    }

    const index = map.indexOf(search)

    return index === -1 ? undefined : index
  }

  return lookupFromArray
}
