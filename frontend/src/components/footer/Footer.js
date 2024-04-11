import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';
import './Footer.css';
import { black, mainColor } from '../../css/Main.style';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const { user, userRoleType, mode, setMode } = useContext(GeneralContext);

  return (
    <>
      <footer className="footer" style={{
        backgroundColor: mode === 'dark' ? black : mainColor,
      }}>

        <section className='footerTop'>

          <div className='footerLogo' onClick={() => navigate('/')}>Logo</div>
          <div className='footerAboutBtn' onClick={() => navigate('/about')}>About Us</div>
          <div>Phone: 050-12345678</div>
          <div>Email: skinCare@gmail.com</div>

        </section>


        <hr className='footerHr' />

        <section className='footerBottom'>
          <div className="footer-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTiktok />
            <FaTwitter />
            <FaLinkedin />
          </div>

          <div>
            &copy; All Rights Reserved E.Z
          </div>

        </section>
      </footer>
    </>
  );
}
