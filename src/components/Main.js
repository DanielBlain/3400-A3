import React from 'react'
import { calculatorButtons } from '../data/calculator-base-button-data.js';
import DanCalc from './DanCalc';
import QuoteBox from './QuoteBox';

const Main = () => {
  return (
    <main className="App-main">
      <DanCalc calculatorButtons={calculatorButtons} />
      <QuoteBox />
    </main>
  )
}

export default Main