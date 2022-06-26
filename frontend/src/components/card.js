import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import { Map, Marker } from "pigeon-maps"
import axios from 'axios';


function Card({info, setContacts}) {
    const [expanded, setExpanded] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editedValue, setEditedValue] = useState({...info})
    const position = [info?.location?.latitude ?? 0, info?.location?.longitude ?? 0]
    const [editPosition, setEditPosition] = useState([info?.location?.latitude ?? 0, info?.location?.longitude ?? 0]);

    const toggleExpand = ()=>{
        setExpanded(!expanded)
    }

    const deleteContact = async ()=>{
        const value = window.confirm("Confirm delete!");
        if(value){
            await axios.delete('/api/contact/'+info._id, {headers:{authorization: "Bearer " + localStorage.getItem("user_token")}}).then(response=>{
                setContacts((contacts)=>{
                    return contacts.filter(contact=> contact._id !== info._id)
                })
            })
        }
    }

    const toggleEdit = ()=>{
        setEdit(!edit);
    }

    const onChange = (e)=>{
        setEditedValue({...editedValue, [e.target.name]: e.target.value})
    }

    const onMapChange = (e)=>{
        setEditPosition(e.latLng)
        setEditedValue({...editedValue, location: {latitude: e.latLng[0], longitude: e.latLng[1]}})
    }

    const saveChanges = async()=>{
        await axios.put('/api/contact', {...editedValue}, {headers:{authorization: "Bearer " + localStorage.getItem("user_token")}})
        .then(response=>{
            if(response.status === 200){
                setContacts((contacts)=>{
                    let temp = [...contacts];
                    let index = temp.findIndex(contact=>contact._id === info._id);
                    temp[index] = editedValue
                    return temp
                })
                setEdit(false)
            }
        }).catch(e=>console.log(e))
    }
  return (
    <>
        {!edit && (
        <div className="card">
            <div className='card-header'  onClick={toggleExpand}>
                <h3>{info.first_name} {info.last_name}</h3>
                <span className='card-expand'>
                    {expanded === true ? <BsChevronUp/>:<BsChevronDown/>}
                </span>
            </div>
            <div className={`card-content ${expanded === true? "card-expanded" : ""}`}>
                <div><strong>Phone: </strong> {info.phone}</div>
                <div><strong>Email: </strong> {info.email}</div>
                <div><strong>Relation: </strong> {info.relation}</div>
                <div className='map'>
                    <Map height={300} defaultCenter={position} defaultZoom={16}>
                        <Marker width={50} anchor={position} />
                    </Map>
                </div>
                <div className='card-footer'>
                    <Button text='edit' button={{onClick: toggleEdit}}/>
                    <Button text='delete' button={{onClick: deleteContact}}/>
                </div>
            </div>
        </div>)}

        {edit && (
        <div className="card">
            <div className='card-header'  onClick={toggleExpand}>
                <h3></h3>
                <span className='card-expand'>
                    {expanded === true ? <BsChevronUp/>:<BsChevronDown/>}
                </span>
            </div>
            <div>
                <Input fullWidth label='First name' input={{name: "first_name", defaultValue: info.first_name, onChange: onChange}}/>
                <Input fullWidth label='last name'input={{name: "last_name", defaultValue: info.last_name, onChange: onChange}}/>
                <Input fullWidth label='phone' input={{name: "phone", defaultValue: info.phone, onChange: onChange}}/>
                <Input fullWidth label='email' input={{name: "email", defaultValue: info.email, onChange: onChange}}/>
                <Input fullWidth label='relation' input={{name: "relation", defaultValue: info.relation, onChange: onChange}}/>
                <div className='map'>
                    <Map height={300} defaultCenter={editPosition} defaultZoom={16} onClick={onMapChange}>
                        <Marker width={50} anchor={editPosition} />
                    </Map>
                </div>
                <div className='card-footer'>
                    <Button text='cancel' button={{onClick: toggleEdit}}/>
                    <Button text='save' button={{onClick: saveChanges}}/>
                </div>
            </div>
        </div>)}
    </>
  )
}

export default Card