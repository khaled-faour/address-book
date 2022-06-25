import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import Input from '../components/input'
import Button from '../components/button'
function Signup() {
    const [credentials, setCredentials] = useState({first_name: null, last_name: null, email: null, password: null});

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const signup = async ()=>{
        await axios.post('/api/auth/register', {...credentials}).then(response=>{
            if(response.status === 201){
                localStorage.setItem("user_token", response.data.token);
            }
        })
    }

    useEffect(()=>{
        console.log(credentials)
    }, [credentials])
  return (
    <div className="login-container">
        <h1>Signup</h1>
        <Input 
            label='First name' 
            input={{name: "first_name", placeholder: "Khaled", onChange:onChange}} 
            fullWidth
        />
        <Input 
            label='last name' 
            input={{name: "last_name", placeholder: "Faour", onChange:onChange}} 
            fullWidth
        />
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
            text='Signup'
            button={{onClick: signup}}
            fullWidth
        />
        <Link className='form-link' to="/login">Already have an account? Login</Link>
    </div>
  )
}

export default Signup