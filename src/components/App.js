import {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import './App.css';

let appInfo = {
    title: "Quote of the Day",
    author: "Dan J. Blain",
    copyrightYear: new Date().getFullYear(),
};

function App() {
  return (
    <div className="App">
      <Header appTitle={appInfo.title}/>
      <Main />
      <Footer copyrightYear={appInfo.copyrightYear} author={appInfo.author}/>
    </div>
  );
}

export default App;
