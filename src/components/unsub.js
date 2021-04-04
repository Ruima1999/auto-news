
import {Link, Redirect,UseHistory} from 'react-router-dom'

import React, { Component } from 'react';
import axios from 'axios';


export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    
    this.onSubmit = this.onSubmit.bind(this);
    //this.deleteEmail = this.deleteEmail.bind(this);
    this.onChangeId = this.onChangeId.bind(this);

    this.state = {
      id:'',
    
      emails: []
    };
  }
    
  componentDidMount() {
    axios.get('http://localhost:4000/users/')
      .then(response => {
        this.setState({ emails: response.data })
        
       
      })      
      .catch((error) => {
        console.log(error);
      })
  }
  onChangeId(e) {
    this.setState({
      id:e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.emails);
    console.log(this.state.id);
    

   
    axios.delete('http://localhost:4000/users/'+this.state.id)
      .then(res => console.log(res.data));

    this.setState({
      emails: this.state.emails.filter(user => user.email!==this.state.id),
      id: ''
    })
    this.props.history.push("/success");
   
    
  }

 
  render(){
   
    return (
      
    <div>
        <form className='add-form' onSubmit={this.onSubmit} > 
        <div className='form-control'>
          
          <input
            type='text'
            placeholder='Please enter your email'
            value={this.state.id}
            onChange={this.onChangeId}
            
            
            
          />
        </div>
        <input type='submit' value='unsubscribe' className='btn btn-block'/> 
        </form>
        <Link to ='/'> Go Back</Link>
        </div>
    
    )
}
}
