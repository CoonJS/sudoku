import React, { Component } from 'react'

export default class Sudoku extends Component {
  renderField = () => {
    return FIELD_MATRIX.map((row, idx) => {
      const SIZE = 32
      return (
        <div key={idx}>
          {row.map(item => (
            <div key={item}>
              <input style={{ width: SIZE, height: SIZE }} type="number" step="1" min="1" max="9" />
            </div>
          ))}
        </div>
      )
    })
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/*{this.renderField()}*/}
      </div>
    )
  }
}
