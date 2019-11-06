import React, { Component } from 'react'

import { sudokuSolver } from '../utils/sudoku'

const emptyFields = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export default class Sudoku extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    field: [
      [0, 4, 3, 0, 0, 0, 6, 0, 0],
      [0, 0, 9, 5, 0, 0, 0, 0, 0],
      [2, 0, 0, 7, 6, 0, 5, 0, 0],
      [0, 0, 2, 0, 7, 0, 0, 0, 1],
      [0, 8, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 4, 8, 0, 0, 9],
      [4, 9, 0, 1, 0, 3, 0, 0, 2],
      [0, 0, 0, 0, 5, 0, 4, 0, 0],
      [0, 0, 1, 4, 0, 6, 9, 3, 0],
    ],
  }

  solveSudoku = () => {
    const { field } = this.state

    this.setState({
      field: [...sudokuSolver(field)]
    })
  }

  renderField = () => {
    const { field } = this.state
    return field.map((row, idx) => {

      return (
        <div key={idx}>
          {row.map(item => (
            <div key={Math.random()}>
              <input
                value={item}
                type="number"
                step="1"
                min="0"
                max="9"
                style={styles.input}
                onChange={() => {}}
              />
            </div>
          ))}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div style={styles.wrapper}>
          {this.renderField()}
        </div>
        <div>
          <button onClick={this.solveSudoku} style={styles.button}>Solve</button>
        </div>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    height: '100%',
  },
  input: {
    textAlign: 'center',
    width: 32,
    height: 32
  },
  button: {
    width: '100%',
    padding: '32px',
    background: '#ffeb3b',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
}
