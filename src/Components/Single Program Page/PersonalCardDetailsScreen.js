import React from 'react';
import User from '../../Images/ProgramDetails/AcadimaUser.png';
import linkedinIcon from '../../Images/linkedin.png';

import '../../Styles/Program Details/PersonalCardDetailsScreen.css';

function PersonalCardDetailsScreen() {
  return (
    <div className='personal-card-details'>
       <div className='personal-card-details-top'>
          <img src={User} className='user-pic' alt='User'/>
          <div className='personal-card-personInfo'>
            <h3 className='personal-card-name'>Sophia Anderson</h3>
            <p className='personal-card-age'>25 years </p>
          </div>
        </div>

        <p className='personal-card-desc'>Lorem ipsum dolor sit amet consectetur. Morbi consequat cum netus praesent. Pulvinar sapien lorem pulvinar cras nisi. 
          Non amet amet lectus mattis magna ipsum. Adipiscing facilisi rutrum amet leo malesuada velit vel. Nunc dictum.</p>
        <div className='personal-card-details-bottom'>
          <img className='linkedinIcon' src={linkedinIcon} alt='linkedinIcon'/>
          <p className='personal-card-username'>@Sophia Anderson</p>
        </div>      
    </div>
  );
}

export default PersonalCardDetailsScreen
