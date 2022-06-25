import React from 'react'

function Button({className = "", text = "Button", button={onClick: ()=>{}}, fullWidth = false}) {
  return (
    <button 
        {...button} 
        className={className + " " + `btn ${fullWidth === true ? "full-width" : ""}`}>
            {text}
        </button>
  )
}

export default Button