import React from 'react';
import './Logo.css';

function Logo (props) {
  const {title, fontSize, padding, backgroundImageURL} = props;

  return <div className='logo'>
    <div
      class='clip-text'
      style={{
        'background-image': backgroundImageURL,
        fontSize,
        padding,
      }}
    >
        {title}
    </div>
  </div>
} 

export default Logo;