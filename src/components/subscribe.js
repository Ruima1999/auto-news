
/*import React from 'react'
import { useState } from 'react'
import { FaMailBulk } from 'react-icons/fa'
import axios from 'axios';

  const AddTask = ({ onAdd }) => {
    const [email, setEmail] = useState('')
    const [username, setUsername = useState('')
    const [reminder, setReminder] = useState(false)
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      if (!text) {
        alert('Please add a task')
        return
      }
  
      axios.post('http://localhost:5000/users/add',user).then(res=>console.log(res.data));
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Your email</label>
          <input
            type='text'
            placeholder='Add your email'
            value={text}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Your birthday</label>
          <input
            type='text'
            placeholder='Your birthday'
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className='form-control form-control-check'>
          <label>Set Reminder</label>
          <input
            type='checkbox'
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>
  
        <input type='submit' value='Subscribe!' className='btn btn-block' />
      </form>
    )
  }
export default AddTask*/

import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.state = {
      email: '',
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:4000/users/add', user)
      .then(res => console.log(res.data));
    axios.get('http://localhost:4000/users/');
    
    this.setState({
      email: '',
      username: ''
    })
  }

  render() {
    return (
    
        <form className='add-form' onSubmit={this.onSubmit}>
       
        <div className='form-control'>
          <label>Your Username</label>
          <input
            type='text'
            placeholder='Add your username'
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div className='form-control'>
          <label>Your Email</label>
          <input
            type='text'
            placeholder='Your Email'
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
    
    )
  }
}