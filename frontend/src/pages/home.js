import React, {useEffect, useState} from 'react'
import Button from '../components/button';
import Card from '../components/card'
import useContacts from '../utils/hooks/useContacts'
import Input from '../components/input'
import { Map, Marker } from "pigeon-maps"
import axios from 'axios';
import Select from '../components/select';

const AddContact = ({setContacts})=>{
  const [editPosition, setEditPosition] = useState([33.8892846,35.4692628])
  const [addForm, setAddForm] = useState(false)
  const [values, setValues] = useState({first_name: null, last_name: null, email: null, phone: null, location:{latitude: null, logitude: null}})
  
  const toggleAdd = ()=>{
    setAddForm(!addForm)
  }

  const onChange = (e)=>{
    setValues({...values, [e.target.name]: e.target.value});
  }

  const onMapChange = (e)=>{
    setEditPosition(e.latLng)
    setValues({...values, location: {latitude: e.latLng[0], longitude: e.latLng[1]}});
  }

  const save = async()=>{
    await axios.post('/api/contact', {...values}, {headers:{authorization: "Bearer " + localStorage.getItem("user_token")}})
    .then(response=>{
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
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [filterField, setFilterField] = useState('first_name')
    const [filterType, setFilterType] = useState('includes')
    const [filterValue, setFilterValue] = useState('')

    const onFieldChange = (e)=>{
      setFilterField(e.currentTarget.value)
    }
   
    const onTypeChange = (e)=>{
      setFilterType(e.currentTarget.value)
    }

    const onValueChange = (e)=>{
      setFilterValue(e.target.value)
    }

    useEffect(()=>{
        switch(filterType){
          case 'includes':
            setFilteredContacts(contacts?.filter(contact=>contact[filterField]?.toLowerCase()?.includes(filterValue.toLowerCase())));
            break;
          case 'start': 
            setFilteredContacts(contacts?.filter(contact=>contact[filterField]?.toLowerCase()?.startsWith(filterValue.toLowerCase())));
            break;
          case 'end':
            setFilteredContacts(contacts?.filter(contact=>contact[filterField]?.toLowerCase()?.endsWith(filterValue.toLowerCase())));
            break;
        }
    },[filterField, filterType, filterValue, contacts])
  return (
    <div className='contacts-container'>
        <AddContact setContacts={setContacts}/>
        <div className='filter-container'>
          <Select label='Filter by' fullWidth input={{onChange: onFieldChange}}>
            <option value="first_name">First name</option>
            <option value="last_name">Last name</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="relation">Relation</option>
          </Select>
          <Select label={null} fullWidth input={{onChange: onTypeChange}}>
            <option value="includes">Includes</option>
            <option value="start">Starts with</option>
            <option value="end">Ends with</option>
          </Select>
          <Input label={null} input={{placeholder: "Search...", onChange: onValueChange, defaultValue: ""}} fullWidth/>
        </div>
        {filteredContacts?.length > 0 ? filteredContacts?.map(contact=>{
            return <Card key={contact._id} info={contact} setContacts={setContacts}/>
        }) : "No Contacts"}
    </div>
  )
}

export default Home