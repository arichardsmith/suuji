const { testPair, testThrows } = require('./common')

const kanji = require('../dist/kanji')

describe('Kanji', () => {
  describe('parse', () => {
    it('handles simple values', () => {
      ;[
        ['〇', 0],
        ['六', 6],
        ['十五', 15],
        ['二十', 20],
        ['三十四', 34],
        ['百七十八', 178],
        ['二百二十', 220],
        ['三百', 300],
        ['六百', 600],
        ['千五十', 1050],
        ['二千五十', 2050],
        ['三千二百', 3200],
        ['一万五千', 15000],
        ['四十万七千', 407000]
      ].forEach(testPair(kanji.parse))
    })

    it('handles 10^8, 10^12 and 10^16', () => {
      ;[['一億', 8], ['一兆', 12], ['一京', 16]]
        .map(([hira, num]) => [hira, Math.pow(10, num)])
        .forEach(testPair(kanji.parse))
    })

    it('errors on unknown input', () => {
      testThrows(() => kanji.parse('foo'))
    })
  })

  describe('generate', () => {
    it('handles simple numbers', () => {
      ;[
        ['〇', 0],
        ['七', 7],
        ['十三', 13],
        ['四十', 40],
        ['五十八', 58],
        ['百二十三', 123],
        ['四百九十', 490],
        ['三百', 300],
        ['六百', 600],
        ['千二百', 1200],
        ['五千二十', 5020],
        ['三千', 3000],
        ['一万二千', 12000],
        ['五十万七百', 500700],
        ['一億', 100000000]
      ]
        .map(pair => pair.reverse())
        .forEach(testPair(kanji.generate))
    })

    it('handles 10^8, 10^12 and 10^16', () => {
      ;[['一億', 8], ['一兆', 12], ['一京', 16]]
        .map(([hira, num]) => [Math.pow(10, num), hira])
        .forEach(testPair(kanji.generate))
    })
  })
})
