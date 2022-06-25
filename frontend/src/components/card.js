import React, { useState } from 'react'
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';

function Card({info}) {
    const [expanded, setExpanded] = useState(false);

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
            <h3>{info.first_name} {info.last_name}</h3>
            <h3>{info.first_name} {info.last_name}</h3>
        </div>
    </div>
  )
}

export default Card