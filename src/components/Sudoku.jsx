import React, { Component } from 'react'

import { sudokuSolver } from '../utils/sudoku'

const emptyField = [
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

const exampleField1 = [
  [0, 4, 3, 0, 0, 0, 6, 0, 0],
  [0, 0, 9, 5, 0, 0, 0, 0, 0],
  [2, 0, 0, 7, 6, 0, 5, 0, 0],
  [0, 0, 2, 0, 7, 0, 0, 0, 1],
  [0, 8, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 8, 0, 0, 9],
  [4, 9, 0, 1, 0, 3, 0, 0, 2],
  [0, 0, 0, 0, 5, 0, 4, 0, 0],
  [0, 0, 1, 4, 0, 6, 9, 3, 0],
]

const exampleField2 = [
  [0, 5, 6, 8, 9, 1, 0, 4, 0],
  [0, 4, 0, 7, 0, 0, 0, 0, 1],
  [8, 0, 1, 0, 0, 5, 2, 0, 0],
  [1, 0, 2, 0, 7, 0, 0, 0, 0],
  [5, 9, 8, 0, 6, 0, 0, 0, 4],
  [0, 6, 4, 0, 3, 8, 1, 0, 0],
  [0, 2, 7, 0, 0, 3, 0, 5, 0],
  [0, 0, 0, 2, 0, 4, 0, 0, 7],
  [9, 0, 0, 0, 8, 0, 4, 3, 2],
]

const fields = [exampleField1, exampleField2]


export default class Sudoku extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    field: exampleField1,
  }

  solveSudoku = () => {
    const { field } = this.state

    this.setState({
      field: sudokuSolver(field)
    })
  }


  handleChange = (value, rowIdx, cellIdx) => {
    const { field } = this.state

    this.setState({
      field: field
          .map((row, oldRowIndex) => row
              .map((cell, oldCellIdx) => (rowIdx === oldRowIndex)&& (cellIdx === oldCellIdx) ? Number(value): cell))
    })
  }


  clearField = () => {
    this.setState({
      field: emptyField
    })
  }

  generateSudoku = () => {

    this.setState({
      field: fields[Math.floor(Math.random() * fields.length)]
    })
  }

  renderField = () => {
    const { field } = this.state
    return field.map((row, rowIdx) => {
      return (
        <div key={rowIdx} style={styles.getRowStyles(rowIdx)}>
          {row.map((cell, cellIdx) => (
            <div key={`${rowIdx} ${cellIdx}`}>
              <input
                value={cell}
                type="number"
                step="1"
                min="0"
                max="9"
                style={{...styles.input, ...styles.getInputStyles(cell)}}
                onChange={(e) => this.handleChange(e.target.value, rowIdx, cellIdx)}
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
          <button onClick={this.generateSudoku} style={styles.button}>Generate</button>
        </div>
        <div>
          <button onClick={this.solveSudoku} style={styles.button}>Solve</button>
        </div>
        <div>
          <button onClick={this.clearField} style={styles.button}>Clear</button>
        </div>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    height: '100%',
    border: '1px solid'
  },
  input: {
    fontSize: '32px',
    textAlign: 'center',
    width: 60,
    height: 60
  },
  rowItem: {
    display: 'flex'
  },
  rowItemThird: {
    display: 'flex',
    borderBottom: '1px solid'
  },
  button: {
    width: '100%',
    padding: '32px',
    background: '#ffeb3b',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  line: {
    borderBottom: '1px solid'
  },
  rowItemLast: {
    display: 'flex',
  },
  getRowStyles:(rowIdx) => {
    if (rowIdx === 8 ) {
      return  styles.rowItemLast
    }
    return rowIdx % 3 !== 2 ? styles.rowItem : styles.rowItemThird
  },
  getInputStyles: (cell) => {
    const emptyCell = Number(cell) === 0
    return { fontWeight : emptyCell ? '100' : '500', color: emptyCell ? 'rgba(0,0,0, .1)' : 'rgba(0,0,0, .75)' }
  }
}
