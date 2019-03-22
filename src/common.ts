import { projectToMultiples } from './lib/abacus'
import Accumulator from './lib/accumulator'
import createChunkReader from './lib/chunk-reader'

interface LookupFunctions {
  lookupDigit(number: number): string | undefined
  lookupDigit(text: string): number | undefined
  lookupMultiple(number: number): string | undefined
  lookupMultiple(text: string): number | undefined
  lookupException?(number: number): string | undefined
  lookupException?(text: string): number | undefined
}

const NULL = () => undefined

export function createGenerator(
  { lookupDigit, lookupMultiple, lookupException }: LookupFunctions,
  multiples: Array<number>
) {
  // Patch lookup exception when undefiend
  const lookupExcept = lookupException !== undefined ? lookupException : NULL

  if (!multiples.includes(1)) {
    multiples.push(1)
  }

  // Create our project function
  const project = projectToMultiples(multiples)

  return function generate(number: number): string {
    number = Math.abs(number) // Ensure it's not negative

    // Handle simple digits quickly
    if (number < 10) {
      return lookupDigit(number) || ''
    }

    const multiples = project(number)

    const parts = multiples.map(({ multiplier, count }) => {
      const exception = lookupExcept(multiplier * count)
      if (exception !== undefined) {
        return exception
      }

      if (count === 0) {
        return null
      }

      if (multiplier === 1) {
        return lookupDigit(count) || null
      }

      const multiText = lookupMultiple(multiplier)
      const digitText =
        count > 9
          ? generate(count)
          : count !== 1 || multiplier > 1000
          ? lookupDigit(count)
          : ''

      if (digitText === undefined || multiText === undefined) {
        return null
      }

      return digitText + multiText
    })

    return parts.filter(part => part !== null).join('')
  }
}

export function createParser(
  { lookupDigit, lookupException, lookupMultiple }: LookupFunctions,
  chunks: Array<string>
) {
  const lookupBoth = (text: string) => lookupDigit(text) || lookupMultiple(text)
  const lookupInt =
    lookupException !== undefined
      ? (text: string) => lookupException(text) || lookupBoth(text)
      : lookupBoth

  const loadChunkReader = () => createChunkReader(chunks)

  return function parse(text: string): number {
    const digit = lookupDigit(text)
    if (digit !== undefined) {
      // Return quick if we can do a straight lookup
      return digit
    }

    const chunkReader = loadChunkReader()

    const acc = new Accumulator()

    const reader = chunkReader(text)
    let res: IteratorResult<string>
    do {
      res = reader.next()

      if (res.value !== undefined) {
        const value = lookupInt(res.value)
        if (value === undefined) {
          throw new Error(`Couldn't map ${res.value} to a number`)
        }

        acc.add(value)
      }
    } while (res.done !== true)

    return acc.getValue()
  }
}
