import React from 'react'

const Footer = ({ copyrightYear, author }) => {
  return (
    <footer className="App-footer">
      <p>Copyright &copy; {author} {copyrightYear}</p>
    </footer>
  )
}

Footer.defaultProps = {
    copyrightYear: new Date().getFullYear(),
    author: 'Unknown',
}

export default Footer