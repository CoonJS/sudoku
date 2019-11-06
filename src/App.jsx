import React, { Component } from 'react'

import './global.css'

import Sudoku from './components/Sudoku.jsx'

export default class App extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <Sudoku />
      </div>
    )
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}
