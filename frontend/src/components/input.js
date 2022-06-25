import React from 'react'

function Input({label = "label", input = {placeholder: "placeholder"}, fullWidth = false}) {
  return (
    <div  className={`input-container ${fullWidth === true? "full-width": ""}`}>
        <label>{label}</label>
        <input {...input} />
    </div>
  )
}

export default Input