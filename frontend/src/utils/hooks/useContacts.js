import React, { useEffect, useState } from 'react'
import axios from 'axios';

function useContacts() {
    const [contacts, setContacts] = useState();

    const getContacts = async ()=>{
        await axios.get(
            '/api/contact', 
            {headers: {Authorization: "Bearer "+localStorage.getItem("user_token")}}
        )
        .then(response=>{
            if(response.status === 200){
                setContacts(response.data.contacts)
            }
        })
        .catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getContacts();
    }, [])

    if(contacts === null){
        return "Fetching Contacts";
    }
    return {contacts, setContacts};
}

export default useContacts