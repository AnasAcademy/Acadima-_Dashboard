import React from 'react';
import '../Styles/SuccessStory.css';
import PersonalCard from './PersonalCard';
import rightArrow from '../Images/RightArrow.png';


function SuccessStory({title,p}) {
  return (
    <div className='successStory'>
      <div className='left'>
          <h2 className='explore-h2'>{title}</h2>
          <p className='explore-p'>{p}</p>
          <div className='explore'>
            <img src={rightArrow} alt='rightArrow' style={{width: '87px', height:'87px', marginRight:'20px' , marginBottom:'40px'}}/>
            <p className='explore-p2'>Explore and get inspired by our students' success stories.</p>
          </div>
        </div>
        <div className='right'>
          <PersonalCard />
        </div>
    </div>
  )
}

export default SuccessStory;
