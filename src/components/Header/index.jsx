import React from 'react';
import './style.module.css';

function Header (props) {

  return <div style={{
    fontFamily: `'Barlow', sans-serif`,
    fontSize: '2rem',
    color: '#fff',
    width: '100%',
    background: 'rgb(2,0,36)',
    background: 'linear-gradient(180deg, rgba(2,0,36,1) 68%, rgba(0,0,0,0) 100%)',
    height: '7rem',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem'}}
    >
      <img style={{
        width: '5rem',
        height: '5rem',
      }} src='resources/logo/sun.jpg'  />
      <span>Kamil </span><span style={{fontWeight: 100}}>&nbsp;Kulig</span>
    
    </div>
  </div>
} 

export default Header;