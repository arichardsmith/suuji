/**
 * Creates a generator that will splits a string into chunks, yielding each one
 *
 * @param chunks Array of chunks to match
 * @param rtl Start at right end
 */
export default function createChunkReader(chunks: Array<string>, rtl = false) {
  const head: (text: string, length: number) => string =
    rtl === true
      ? (text, length) => text.slice(0 - length)
      : (text, length) => text.slice(0, length)

  const tail: (text: string, start: number) => string =
    rtl === true
      ? (text, start) => text.slice(0, 0 - start)
      : (text, start) => text.slice(start)

  // Sort the chunks into descending size order
  const sortedChunks = chunks.sort((a, b) => b.length - a.length)

  const chunkMatchers = sortedChunks.map(chunk => (test: string) => {
    return head(test, chunk.length) === chunk
  })

  const chunkCount = chunks.length

  const matchStartingChunk = (text: string) => {
    for (let i = 0; i < chunkCount; i++) {
      if (chunkMatchers[i](text)) {
        return sortedChunks[i]
      }
    }

    return null
  }

  return function* chunkReader(text: string) {
    let remainingText = text

    while (remainingText.length > 0) {
      const match = matchStartingChunk(remainingText)

      if (match === null) {
        throw new Error('ParseError: Encountered unknown text')
      }

      yield match

      remainingText = tail(remainingText, match.length)
    }
  }
}
