export const sudokuSolver = puzzle => {
  const arr = JSON.parse(JSON.stringify(puzzle))

  while (!isSolved(arr)) {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        arr[y][x] = digit(arr, x, y)
      }
    }
  }

  return arr
}

const digit = (puzzle, x, y) => {
  if (puzzle[y][x] !== 0) return puzzle[y][x]

  const row = puzzle[y]
  const column = columnArray(puzzle, x)
  const grid = gridArray(puzzle, x, y)

  const knowns = row.concat(column, grid)

  const possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(item => knowns.indexOf(item) === -1)

  return possibilities.length === 1 ? possibilities[0] : 0
}

const columnArray = (puzzle, idx) => puzzle.map(row => row[idx])

const gridArray = (puzzle, x, y) => {
  x = Math.floor(x / 3) * 3
  y = Math.floor(y / 3) * 3

  let arr = []

  for (let i = x; i < x + 3; i++) {
    for (let j = y; j < y + 3; j++) {
      arr.push(puzzle[j][i])
    }
  }

  return arr
}

const sum = arr => {
  return arr.reduce(function(a, n) {
    return a + n
  }, 0)
}

const isSolved = puzzle => {
  return puzzle.filter(row => !winningRow(row)).length === 0
}

const winningRow = arr => {
  return (
    sum(
      arr.map(function(num) {
        return Math.pow(2, num - 1)
      }),
    ) === 511
  )
}
