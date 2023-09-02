import React from 'react'
import { calculatorButtons } from '../data/calculator-bonus-03-button-data.js';
import DanCalc from './DanCalc';

const Main = () => {
  return (
    <main className="App-main">
      <DanCalc calculatorButtons={calculatorButtons} />
    </main>
  )
}

export default Main