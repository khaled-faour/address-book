import React, { useState } from 'react'
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import { Map, Marker } from "pigeon-maps"


function Card({info}) {
    const [expanded, setExpanded] = useState(false);
    const position = [info.location.latitude, info.location.longitude]

    const toggleExpand = ()=>{
        setExpanded(!expanded)
    }

  return (
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
                <Map height={300} defaultCenter={position} defaultZoom={15}>
                    <Marker width={50} anchor={position} />
                </Map>
            </div>
        </div>
    </div>
  )
}

export default Card