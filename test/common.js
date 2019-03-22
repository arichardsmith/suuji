class AssertationError extends Error {
  constructor(input, expected, got) {
    super(`Expected ${input} => ${expected} but got ${got}`)
    this.name = 'AssertationError'
  }
}

module.exports.testPair = function testPair(func) {
  return pair => {
    const res = func(pair[0])
    if (pair[1] !== res) {
      throw new AssertationError(pair[0], pair[1], res)
    }
  }
}

module.exports.testThrows = function testThrows(func) {
  let threw = false
  try {
    func()
  } catch {
    threw = true
  }

  if (!threw) {
    throw new AssertationError('Expected function to throw')
  }
}
