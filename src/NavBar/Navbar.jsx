import React from 'react'
import Logo from './Logo'
import Search from './Search'
import { useState } from 'react';
import NumResults from './NumResults';



function Navbar({children}) {
  
  return (
    <nav className="nav-bar">   
  {children}
  </nav>
  )
}

export default Navbar