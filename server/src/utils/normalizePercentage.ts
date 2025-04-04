export function calculateNormalizePercentages(values: number[]): number[] {
  const total = values.reduce((sum, val) => sum + val, 0)
  const rawPercents = values.map((val) => (val / total) * 100)

  const floored = rawPercents.map(Math.floor)
  const remainder = rawPercents.map((val, i) => ({ i, diff: val - floored[i] }))

  const sumFloored = floored.reduce((a, b) => a + b, 0)
  const remainderToDistribute = 100 - sumFloored

  remainder
    .sort((a, b) => b.diff - a.diff)
    .slice(0, remainderToDistribute)
    .forEach(({ i }) => {
      floored[i]++
    })

  return floored
}
