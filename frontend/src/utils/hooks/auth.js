import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useAuth() {
    const [valid, setValid] = useState(null);

    const verifyToken = async ()=>{
        const token = localStorage.getItem('user_token') || ""
        console.log(token)
        await axios.post('/api/auth/verify', {token})
        .then(response=>{
            console.log(response)
            if(response.status===200){
                setValid(true)
            }else{
                setValid(false);
            }
        }).catch(e=>{
            console.log(e)
            setValid(false)
        })
    }

    useEffect(()=>{
        verifyToken()
    },[]);
    
    if(valid === null){
        return "Verifying";
    }
    return valid
}

export default useAuth