import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import List from './components/List';
import New from './components/New';
import Detail from './components/Detail';
import Edit from './components/Edit';
import './App.css';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <h1>Pet Shelter</h1>
        <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
        </ul>
        <Route exact path="/" component={List} />
        <Route path="/new" component={New} />
        <Route path="/pets/:_id" component={Detail} /> 
        <Route path="/edit/:_id" component={Edit} />
      </BrowserRouter>
    );
  }
}

export default App;
