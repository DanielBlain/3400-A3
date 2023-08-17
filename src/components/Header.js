import React from 'react'
import logo from './logo.svg'

const Header = ({appTitle}) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>{appTitle}</h1>
    </header>
  )
}

Header.defaultProps = {
    appTitle: "React App",
}

export default Header