const { testPair, testThrows } = require('./common')

const digit = require('../dist/digit')

describe('Digit', () => {
  describe('parse', () => {
    it('handles simple values', () => {
      ;[
        ['〇', 0],
        ['六', 6],
        ['二〇', 20],
        ['三四', 34],
        ['一〇〇', 100],
        ['二二〇', 220],
        ['三五六', 356],
        ['一〇〇〇', 1000],
        ['二〇五〇', 2050],
        ['三二〇〇', 3200],
        ['一五〇〇〇', 15000],
        ['四〇〇七〇〇', 400700],
        ['一〇〇〇〇〇〇〇〇', 100000000]
      ].forEach(testPair(digit.parse))
    })

    it('handles 10^8, 10^12 and 10^16', () => {
      ;[
        ['一〇〇〇〇〇〇〇〇', 8],
        ['一〇〇〇〇〇〇〇〇〇〇〇〇', 12],
        ['一〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇', 16]
      ]
        .map(([hira, num]) => [hira, Math.pow(10, num)])
        .forEach(testPair(digit.parse))
    })

    it('errors on unknown input', () => {
      testThrows(() => digit.parse('foo'))
    })
  })

  describe('generate', () => {
    it('handles simple numbers', () => {
      ;[
        ['〇', 0],
        ['七', 7],
        ['一〇', 10],
        ['四〇', 40],
        ['五六', 56],
        ['一〇〇', 100],
        ['四九〇', 490],
        ['三四二', 342],
        ['三〇〇〇', 3000],
        ['五〇二〇', 5020],
        ['八二〇〇', 8200],
        ['一二〇〇〇', 12000],
        ['五〇〇七〇〇', 500700]
      ]
        .map(pair => pair.reverse())
        .forEach(testPair(digit.generate))
    })

    it('handles 10^8, 10^12 and 10^16', () => {
      ;[
        ['一〇〇〇〇〇〇〇〇', 8],
        ['一〇〇〇〇〇〇〇〇〇〇〇〇', 12],
        ['一〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇', 16]
      ]
        .map(([hira, num]) => [Math.pow(10, num), hira])
        .forEach(testPair(digit.generate))
    })
  })
})
