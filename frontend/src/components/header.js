import React, {useState} from 'react'
import Button from './button'


function Header() {


    const logout = ()=>{
        localStorage.removeItem('user_token');
        window.location.reload()
    }

  return (
    <div className='header'>
        <h1 className='title'>Address Book</h1>
        <div>
          <Button text='logout' button={{onClick: logout}}/>
        </div>
    </div>
  )
}

export default Header