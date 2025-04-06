export const adjustLabelYPositions = (
  positions: [number, number][],
  spacing = 14
) => {
  const sorted = [...positions].sort((a, b) => a[1] - b[1])
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][1] - sorted[i - 1][1] < spacing) {
      sorted[i][1] = sorted[i - 1][1] + spacing
    }
  }

  return positions
}
