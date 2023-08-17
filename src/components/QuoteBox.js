import React from 'react'
import {useState} from 'react';
import quotes from './quotes.js'

const QuoteBox = () => {
  function selectQuoteIndex() {
    return Math.floor(Math.random()*quotes.length);
  };

  const [isClickedYet, setIsClickedYet] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(selectQuoteIndex());

  function getNewQuote() {
    setIsClickedYet(true);
    let oldQuoteIndex = quoteIndex;
    let newQuoteIndex;
    do {
        newQuoteIndex = selectQuoteIndex();
    } while (newQuoteIndex === oldQuoteIndex);
    setQuoteIndex(newQuoteIndex);
  }

  return (
    <>
      {!isClickedYet ? 
        <p>Click the button to get a quote</p>
        :
        <blockquote>
          <p>{quotes[quoteIndex].quote}</p>
          <footer>{quotes[quoteIndex].author}</footer>
        </blockquote>  
      }
      <button onClick={getNewQuote}>
        {!isClickedYet ?
          "Get Quote"
          : "Get Another Quote"
        }
      </button>
    </>
  )
}

export default QuoteBox