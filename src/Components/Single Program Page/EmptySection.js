import React from 'react';
import '../../Styles/Program Details/EmptySection.css';

function EmptySection({title}) {
    return (
        <div className='empty-section'>
            <h2 className='empty-section-title'>{title}</h2>
        </div>
    );
}

export default EmptySection
