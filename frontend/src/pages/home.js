import React, {useState} from 'react'
import Button from '../components/button';
import Card from '../components/card'
import useContacts from '../utils/hooks/useContacts'
import Input from '../components/input'
import { Map, Marker } from "pigeon-maps"
import axios from 'axios';

const AddContact = ({setContacts})=>{
  const [editPosition, setEditPosition] = useState([33.8892846,35.4692628])
  const [addForm, setAddForm] = useState(false)
  const [values, setValues] = useState({first_name: null, last_name: null, email: null, phone: null, location:{latitude: null, logitude: null}})
  
  const toggleAdd = ()=>{
    setAddForm(!addForm)
  }

  const onChange = (e)=>{
    console.log({[e.target.name]: e.target.value});
    setValues({...values, [e.target.name]: e.target.value});
  }

  const onMapChange = (e)=>{
    setEditPosition(e.latLng)
    setValues({...values, location: {latitude: e.latLng[0], longitude: e.latLng[1]}});
  }

  const save = async()=>{
    console.log(values)
    await axios.post('/api/contact', {...values}, {headers:{authorization: "Bearer " + localStorage.getItem("user_token")}})
    .then(response=>{
      console.log(response)
      setContacts((contacts=>{
        return [...contacts, response.data.contact]
      }))
    })
  }
  return (
    <>
      <Button className='new-contact-btn' text='New Contact'  button={{onClick: toggleAdd}}/>
      <div className={`add-contact ${addForm && 'add-contact-show'}`}>
        <div className="card">
            <div className='card-header'>
                <h3>New Contact</h3>
            </div>
            <div>
                <Input fullWidth label='First name' input={{name: "first_name",  onChange: onChange}}/>
                <Input fullWidth label='last name'input={{name: "last_name",  onChange: onChange}}/>
                <Input fullWidth label='phone' input={{name: "phone",  onChange: onChange}}/>
                <Input fullWidth label='email' input={{name: "email",  onChange: onChange}}/>
                <Input fullWidth label='relation' input={{name: "relation",  onChange: onChange}}/>
                <div className='map'>
                    <Map height={300} defaultCenter={editPosition} defaultZoom={16} onClick={onMapChange}>
                        <Marker width={50} anchor={editPosition} />
                    </Map>
                </div>
                <div className='card-footer'>
                    <Button text='cancel' button={{onClick: toggleAdd}}/>
                    <Button text='save' button={{onClick: save}}/>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}


function Home() {
    const {contacts, setContacts} = useContacts();
   
  return (
    <div className='contacts-container'>
        <AddContact setContacts={setContacts}/>
        {contacts?.map(contact=>{
            return <Card key={contact._id} info={contact} setContacts={setContacts}/>
        })}
    </div>
  )
}

export default Home