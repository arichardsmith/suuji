type AbacusRow = {
  multiplier: number
  count: number
}

type Abacus = Array<AbacusRow>

const countMultiplier = (multi: number, target: number) => {
  return (target - (target % multi)) / multi
}

export const projectToMultiples = (multiples: Array<number>) => (
  value: number
): Abacus => {
  let remaining = value
  return multiples.map(multiplier => {
    const count = countMultiplier(multiplier, remaining)

    remaining = remaining - multiplier * count

    return {
      multiplier,
      count
    }
  })
}
