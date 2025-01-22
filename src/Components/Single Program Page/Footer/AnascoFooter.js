import React from 'react';
import '../../../Styles/SingleProgramPage/Footer/AnascoFooter.css';

import x from '../../../Images/Single Program Page/Footer/x.png';
import fb from '../../../Images/Single Program Page/Footer/fb.png';
import ln from '../../../Images/Single Program Page/Footer/ln.png';
import multiLogo1 from '../../../Images/Single Program Page/Footer/multilogo1.png';
import extraLogo4 from '../../../Images/Single Program Page/Footer/extraLogo4.webp';

function AnascoFooter() {
  return (
    <div className='bottom-container'>
            <div className='bottom-one'>
                <h2 className='bottom-one-title'>Quick links</h2>
                <ul className='bottom-one-content'>                    
                    <a className='bottom-one-item' href="https://anascogroup.com/uk/">Anasco Britain</a>
                    <a className='bottom-one-item' href="https://anascogroup.com/sa/">Anasco Saudia</a>
                    <a className='bottom-one-item' href="https://anascogroup.com/eg/">Anasco Egypt</a>
                    <a className='bottom-one-item' href="#">Soon Anasco Emirates</a>
                </ul>
            </div>
            <div className='bottom-one'>
                <h2  className='bottom-one-title'>Other sites</h2>
                <ul className='bottom-one-content'>
                    <a className='bottom-one-item' href="https://anasacademy.uk/"> ANAS Academy</a>
                    <a className='bottom-one-item' href="https://acadima.net">Acadima college </a>
                    <a className='bottom-one-item' href="http://neobridge.uk/">Neobridge Center</a>
                    <a className='bottom-one-item' href="https://anasacademy.uk/privacy/">Privacy policy</a>
                </ul>
            </div>
            <div className='bottom-three'>
                <h2 className='bottom-one-title'>Social responsibility</h2>
                <ul className='bottom-one-content'>
                    <a className='bottom-one-item' href="https://anascogroup.com/sa/#rep">Social responsibility in Saudia</a>
                    <a className='bottom-one-item' href="https://anascogroup.com/uk/#rep">Social responsibility in Britain</a>
                    <a className='bottom-one-item' href="https://anascogroup.com/eg/#rep">Social responsibility in Egypt</a>
                    <a className='bottom-one-item' href="#">Social responsibility in Emirates</a>
                </ul>
            </div>

            <div className='bottom-four'>
                <h2 className='bottom-four-title'>Contact us</h2>
                <ul className='logos-main-container'>
                    <a className='logo-container' href="https://www.facebook.com/profile.php?id=61567250176332"><img src={fb} alt='fb' className='logo'/></a>
                    <a className='logo-container' href="https://x.com/ANASCOGROUP"><img src={x} alt='x' className='logo'/></a>
                    <a className='logo-container' href="https://www.linkedin.com/company/anascogruop/about/"><img src={ln} alt='ln' className='logo'/></a>
                </ul>
            </div>

            <div className='bottom-five'>
                <h2 className='bottom-one-title'>Accreditations</h2>
                <div className='multilogo-container'>
                    <img src={extraLogo4} alt='extraLogo4' className='multiLogo2'/>
                    <img src={multiLogo1} alt='multiLogo1' className='multiLogo1'/>
                </div>
            </div>

        </div>
  );
}

export default AnascoFooter;
