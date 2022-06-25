import React from 'react'
import Card from '../components/card'
import useContacts from '../utils/hooks/useContacts'

function Home() {
    const contacts = useContacts();
   
  return (
    <div className='contacts-container'>
        
        {contacts?.map(contact=>{
            return <Card key={contact._id} info={contact}/>
        })}
    </div>
  )
}

export default Home