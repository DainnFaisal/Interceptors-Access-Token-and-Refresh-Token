import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig.js';
import '../Stylesheets/Login.css';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('login', {
                email,
                password
            });
            console.log(response);

            if (response.status === 200 && response.data.data) {

                const token = response.data.data;
                localStorage.setItem('token', token);      // Saving token in localStorage
                console.log('Tokens:',token);
            }
        } catch (error) {
            console.error(error);
        }

    }      

    return (
        <div className='container'>
            <div className='login-form'>
                <form onSubmit={handleLogin}>
                <br/>
            <h3 className='login-heading'>Login:</h3>
                    <input className='input-fields' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br /><br />
                    <input className='input-fields' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br /><br />
                    <button className='login-btn' type='submit'>Login</button> 
                    </form>
                    </div>
            </div>
    );
}

export default Login;
