import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state={
      gifs: [],
      loading:true
    };
  } 

  componentDidMount(){
    this.performSearch();
  }

  performSearch = (query='cats') =>{

    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=10&api_key=0urK8qymDfBbUUx2CdkB9CnDpNhA8Ix8`)
    .then(response => {
      this.setState({
      gifs: response.data.data,
      loading:false
    });
  
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  }
  render() { 
    console.log(this.state.gifs)
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.loading)
          ?<h2>Loading ....</h2>
          : <GifList data={this.state.gifs} />
        }
         
        </div>
      </div>
    );
  }
}
