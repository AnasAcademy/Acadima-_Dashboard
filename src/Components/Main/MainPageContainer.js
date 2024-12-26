import React from 'react';
import '../../Styles/Main/MainPageContainer.css';

import Navbar from '../Main/Navbar';
import Sidebar  from '../Main/Sidebar/Sidebar';

function MainPageContainer({children}) {
  return (
    <>
        <div className='main-page'>
            <Navbar />
            <div className='main-container'>
                <Sidebar />
                <div className='main-content'>
                    {children}
                </div>
            </div>
        </div>
    </>
  );
}

export default MainPageContainer;
