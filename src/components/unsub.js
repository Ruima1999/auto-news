
import {Link} from 'react-router-dom'

import React, { Component } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    
    this.onSubmit = this.onSubmit.bind(this);
    //this.deleteEmail = this.deleteEmail.bind(this);

    this.state = {
      email: '',
      emails: []
    }
  }
    
  componentDidMount() {
    axios.get('http://localhost:4000/users/')
      .then(response => {
        this.setState({ emails: response.data })
        console.log(this.state.emails)
      })
      .catch((error) => {
        console.log(error);
      })
  }



  onSubmit(e) {
    e.preventDefault();
    

   
    axios.delete('http://localhost:4000/users/'+e.target.value)
      .then(res => console.log(res.data));

    this.setState({
      emails: this.state.emails.filter(user => user._id!==e.target.value)
      
    })
    console.log.bind(this.state.emails);
  }

 
render(){
   
    return (
      
    <div>
        <form className='add-form' onSubmit={this.onSubmit}>
        <div className='form-control'>
          
          <input
            type='text'
            placeholder='Please enter your email'
            
            
            
          />
        </div>
        <input type='submit' value='unsubscribe' className='btn btn-block' />
        </form>
        <Link to ='/'> Go Back</Link>
        </div>
    
    )
}
}
