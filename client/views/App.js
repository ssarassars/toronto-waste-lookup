import React, { Component } from 'react';
import shadetitle from '../assets/shadetitle.png';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import Searchbar from '../components/Searchbar.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                 <div id="gradtitle"><h1>Toronto Waste Lookup</h1></div>
                </header>
                <Searchbar/>
            </div>
        );
    }
}

export default App;
