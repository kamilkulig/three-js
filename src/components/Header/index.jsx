import React from 'react';
import './style.module.css';

function Header (props) {

  return <div style={{
    fontFamily: `'Cutive Mono', monospace`,
    fontSize: '2rem',
    color: '#fff',
    width: '100%',
    background: 'rgb(2,0,36)',
    background: 'linear-gradient(180deg, rgba(2,0,36,1) 68%, rgba(0,0,0,0) 100%)',
    height: '7rem'
  }}>
    <img style={{
      width: '5rem',
    }} src='resources/logo/sun.jpg'  />
    
  </div>
} 

export default Header;