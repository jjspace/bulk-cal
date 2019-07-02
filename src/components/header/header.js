import React from 'react';
import './header.scss';

function Header(props) {
  return (
    <header className='header'>
      <div className='header-body'>
        <div className='logo'>Bulk Cal</div>
        <div className='header-right'>
          <button>Export</button>
          <button>+</button>
        </div>
      </div>
    </header>
  )
}

export default Header;
