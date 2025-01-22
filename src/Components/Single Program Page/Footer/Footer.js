import React from 'react';
import '../../../Styles/SingleProgramPage/Footer/Footer.css';
import AnasAcademyFooter from './AnasAcademyFooter';
import AnascoFooter from './AnascoFooter';
import CreditsSection from './CreditsSection';

function Footer() {
  return (
    <div className='footer-container'>

      <AnasAcademyFooter />

      <AnascoFooter />

      <CreditsSection />

    </div>
  );
}

export default Footer;
