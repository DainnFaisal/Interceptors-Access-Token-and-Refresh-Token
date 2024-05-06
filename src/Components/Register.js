import React, { useState } from 'react'
import axios from 'axios';
import '../Stylesheets/Register.css'

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");


    const handleRegister = (e) => {
    e.preventDefault();

    axios.post('https://api.storerestapi.com/auth/register', {
      name,
      email,
      number,
      password
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));

    setName("");
    setEmail("");
    setNumber("");
    setPassword("");
  }

  return (

    <>
      <div className='container'>
        <div className='register-form'>

          <form onSubmit={handleRegister}>
            <br/>
            <h3 className='register-heading'>Register:</h3>
            <input className='input-fields' type='text' placeholder='Name:' value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <br />
            <input className='input-fields' type='email' placeholder='Email:' value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />
            <input className='input-fields' type='number' placeholder='Number:' value={number} onChange={(e) => setNumber(e.target.value)} />
            <br />
            <br />
            <input className='input-fields' type='password' placeholder='Password:' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br />
            <button className='register-btn'>Register</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
