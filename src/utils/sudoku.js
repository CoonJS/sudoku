export const sudokuSolver = puzzle => {
  const arr = [...puzzle]
  while (!isSolved(arr)) {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        arr[y][x] = digit(arr, x, y)
      }
    }
  }

  return arr
}

export const digit = (puzzle, x, y) => {
  if (puzzle[y][x] !== 0) return puzzle[y][x]

  const row = puzzle[y]
  const column = columnArray(puzzle, x)
  const grid = gridArray(puzzle, x, y)

  const knowns = row.concat(column, grid)

  const possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(item) {
    return knowns.indexOf(item) === -1
  })

  return possibilities.length === 1 ? possibilities[0] : 0
}

export const columnArray = (puzzle, idx) => {
  return puzzle.map(function(row) {
    return row[idx]
  })
}

export const gridArray = (puzzle, x, y) => {
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

export const sum = arr => {
  return arr.reduce(function(a, n) {
    return a + n
  }, 0)
}

export const winningRow = arr => {
  return (
    sum(
      arr.map(function(num) {
        return Math.pow(2, num - 1)
      }),
    ) === 511
  )
}

export const isSolved = puzzle => {
  return (
    puzzle.filter(function(row) {
      return !winningRow(row)
    }).length === 0
  )
}
