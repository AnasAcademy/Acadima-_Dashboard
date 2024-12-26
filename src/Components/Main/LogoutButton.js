import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Main/LogoutButton.css';

import logout from '../../Images/Sidebar icons/logout.svg';

function LogoutButton() {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleLogout = () => {
    // Perform any logout-related actions here (e.g., clearing localStorage/session)
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className='logout-button' onClick={handleLogout}>
      <img src={logout} alt='logout' className='logout' />
      <p className='logout-button-text'>تسجيل الخروج</p>
    </div>
  );
}

export default LogoutButton;
