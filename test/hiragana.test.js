const { testPair, testThrows } = require('./common')

const hiragana = require('../cjs/hiragana')

describe('Hiragana', () => {
  describe('parse', () => {
    it('handles simple values', () => {
      ;[
        ['れい', 0],
        ['ろく', 6],
        ['じゅうご', 15],
        ['にじゅう', 20],
        ['さんじゅうよん', 34],
        ['ひゃくななじゅうはち', 178],
        ['にひゃくにじゅう', 220],
        ['さんびゃく', 300],
        ['ろっぴゃく', 600],
        ['はっぴゃく', 800],
        ['せんごじゅう', 1050],
        ['にせんごじゅう', 2050],
        ['さんぜんにひゃく', 3200],
        ['いちまんごせん', 15000],
        ['よんじゅうまんななひゃく', 400700]
      ].forEach(testPair(hiragana.parse))
    })

    it('handles 10^8, 10^12 and 10^16', () => {
      ;[['いちおく', 8], ['いちちょう', 12], ['いちけい', 16]]
        .map(([hira, num]) => [hira, Math.pow(10, num)])
        .forEach(testPair(hiragana.parse))
    })

    it('errors on unknown input', () => {
      testThrows(() => hiragana.parse('foo'))
    })
  })

  describe('generate', () => {
    it('handles simple numbers', () => {
      ;[
        ['れい', 0],
        ['なな', 7],
        ['じゅうさん', 13],
        ['よんじゅう', 40],
        ['ごじゅうはち', 58],
        ['ひゃくにじゅうさん', 123],
        ['よんひゃくきゅうじゅう', 490],
        ['さんびゃく', 300],
        ['ろっぴゃく', 600],
        ['はっぴゃく', 800],
        ['せんにひゃく', 1200],
        ['ごせんにじゅう', 5020],
        ['さんぜん', 3000],
        ['いちまんにせん', 12000],
        ['ごじゅうまんななひゃく', 500700],
        ['いちおく', 100000000]
      ]
        .map(pair => pair.reverse())
        .forEach(testPair(hiragana.generate))
    })

    it('handles 10^8, 10^12 and 10^16', () => {
      ;[['いちおく', 8], ['いちちょう', 12], ['いちけい', 16]]
        .map(([hira, num]) => [Math.pow(10, num), hira])
        .forEach(testPair(hiragana.generate))
    })
  })
})
