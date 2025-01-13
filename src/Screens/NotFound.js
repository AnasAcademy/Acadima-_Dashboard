import React from 'react';
import '../Styles/NotFound/NotFound.css';

import AcadimaLogo from "../Images/AcadimaLogo.png";
import disconnect from '../Images/disconnecttion.svg';

function NotFound() {
  return (
    <div className='notfound-container'>
      <div className='notfound-nav'><img src={AcadimaLogo} alt='AcadimaLogo' className='notLogo'/></div>
      <div className='notfound-content'>
        <img src={disconnect} alt='disconnect' className='disconnect'/>
        <h1>Page Not Found</h1>
        <p>Something Went Wrong!</p>
        <p>Check your internet connection, or try to refresh your browser.</p>
      </div>
    </div>
  );
}

export default NotFound
