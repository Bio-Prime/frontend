import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

class App extends Component {
  render() {
    return (
        <div>
            <HashRouter>
                <h1>Simple SPA</h1>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                </div>
            </HashRouter>
        </div>
    );
  }
}

export default App;
