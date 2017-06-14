import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Navbar} from './Navbar';

var ReactDOM = require('react-dom')

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      loading: true
    };
  }
  
  componentDidMount () {
    const url = 'https://snacks-market-api-test.herokuapp.com/products';
    
    // in axios access data with .data
    axios.get(url)
      .then(response => {
        this.setState({
          data: response.data,
          loading: false
        });
      })      
      .catch(error => {
        console.log(error);
      });

  }
  
  render () {
    let content;

    if (this.state.loading) {
      content = <div>Loading...</div>;
    } else {      
      content = this.state.data.map((snacks, index) => {
        return (        
          <tr key={index}>           
            <td className="first-size">{snacks.name}</td>
            <td className="second-size">{snacks.price}</td>
            <td className="third-size">{snacks.stock}</td>              
          </tr>
        );
      });
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}


ReactDOM.render(<App />,  document.getElementById('root'));