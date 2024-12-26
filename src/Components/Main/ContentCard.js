import React from 'react';
import '../../Styles/Main/ContentCard.css';

function ContentCard({children}) {
  return (
    <div className='content-card-container'>
      {children}
    </div>
  );
}

export default ContentCard;
