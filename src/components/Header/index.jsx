import React from 'react';
import {Colors} from  './../../utils/colors';

import './style.module.css';

function Header (props) {

  return <div style={{
    fontFamily: `'Barlow', sans-serif`,
    fontSize: '2rem',
    color: '#fff',
    width: '100%',
    background: `linear-gradient(180deg, ${Colors.NAVY} 50%, rgba(0,0,0,0) 100%)`,
    height: '12rem',
    position: 'absolute',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem'}}
    >
      <img alt='' style={{
        width: '5rem',
        height: '5rem',
      }} src='resources/logo/sun.jpg'  />
      <span>Kamil </span><span style={{fontWeight: 100}}>&nbsp;Kulig</span>
      <div style={{ // divider
          height: '1.5rem',
          marginLeft: '1rem',
          marginRight: '1rem',
          width: '1px',
          backgroundColor: 'hsla(21,16%,79%,.4)',
          marginTop: '0.5rem',

        }} 
      />
      <span style={{
        fontSize: '1.25rem',
        fontWeight: 100,
        marginTop: '0.5rem',
      }}>
        Webdesigner & developer
      </span>
    </div>
  </div>
} 

export default Header;