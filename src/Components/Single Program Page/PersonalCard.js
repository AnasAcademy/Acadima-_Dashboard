import React from 'react';
import '../Styles/PersonalCard.css';
import personalimage from '../Images/personalpic.png';
import leftArrow from '../Images/LeftArrow.png';
import rightArrow2 from '../Images/RightArrow2.png';
import linkedinIcon from '../Images/linkedin.png';


function PersonalCard() {
  return (
    <div  className="personalContainer">
      <div className='secondContainer'>
      <div className='top'>
          <img src={personalimage} alt='personalimage' className='personalimage' />
          <div className='personInfo'>
            <h3 className='name'>Sophia Anderson</h3>
            <p className='age'>25 years </p>
          </div>
          <div className='arrowsContainer'>
            <img src={leftArrow} alt='leftArrow' className='card-left-arrow'/>
            <img src={rightArrow2} alt='rightArrow'  className='card-right-arrow'/>
          </div>
        </div>
        <p className='card-p'>Lorem ipsum dolor sit amet consectetur. Morbi consequat cum netus praesent. Pulvinar sapien lorem pulvinar cras nisi. 
          Non amet amet lectus mattis magna ipsum. Adipiscing facilisi rutrum amet leo malesuada velit vel. Nunc dictum.</p>
        <div className='bottom'>
          <img className='linkedinIcon' src={linkedinIcon} alt='linkedinIcon' />
          <p className='sophia-p'>@Sophia Anderson</p>
        </div>      
        </div>
    </div>
  );
}

export default PersonalCard;
