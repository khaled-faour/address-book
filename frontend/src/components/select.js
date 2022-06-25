import React from 'react'

function Select({label = "label", input = {}, fullWidth = false, children}) {
  return (
    <div  className={`input-container ${fullWidth === true? "full-width": ""}`}>
        <label>{label}</label>
        <select {...input}>
          {children}
        </select>
    </div>
  )
}

export default Select