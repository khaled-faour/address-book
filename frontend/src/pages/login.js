import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import Input from '../components/input'
import Button from '../components/button'
function Login() {
    const [credentials, setCredentials] = useState({email: null, password: null});

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const login = async ()=>{
        await axios.post('/api/auth/login', {...credentials}).then(response=>{
            if(response.status === 200){
                localStorage.setItem("user_token", response.data.token);
            }
        })
    }

    useEffect(()=>{
        console.log(credentials)
    }, [credentials])
  return (
    <div className="login-container">
        <h1>Login</h1>
        <Input 
            label='Email' 
            input={{name: "email", placeholder: "example@example.com", onChange:onChange}} 
            fullWidth
        />
        <Input 
            label='Password' 
            input={{name: "password", placeholder: "password", type: "password", onChange:onChange}} 
            fullWidth
        />
        <Button
            text='Login'
            button={{onClick: login}}
            fullWidth
        />
        <Link className='form-link' to ="/signup">Don't have an account? Signup</Link>
    </div>
  )
}

export default Login