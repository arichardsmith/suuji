export default class Accumulator {
  private digit: number // Last value seen below 10
  private buffer: number // Last value seen below 10000
  private bigNumbers: number // Total of larger numbers

  constructor() {
    this.digit = 0
    this.buffer = 0
    this.bigNumbers = 0
  }

  add(number: number) {
    if (number < 10) {
      this.digit = number
      return this
    }

    if (number <= 9999) {
      if (number % 10 !== 0) {
        throw new Error(
          `Values over 10 must be multiples of ten. ${number} recived`
        )
      }

      // Push to temporary buffer incase we see a value over 10000
      this.buffer += (this.digit <= 1 ? 1 : this.digit) * number

      // Reset digit
      this.digit = 0

      return this
    }

    this.bigNumbers += (this.buffer + this.digit) * number

    this.buffer = 0
    this.digit = 0

    return this
  }

  getValue() {
    return this.bigNumbers + this.buffer + this.digit
  }
}
