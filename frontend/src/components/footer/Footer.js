import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';
import './Footer.css';
import { mainColor } from '../../css/Main.style';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';

export default function Footer() {

  const { user, userRoleType, mode, setMode } = useContext(GeneralContext);

  return (
    <>
      <footer className="footer" style={{
        width: '100%',
        height: '110px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
        gap: '30px',
        padding: '15px',
        position: 'relative',
        bottom: '0',
      }}>
        <div style={{
          width: '100%', display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <div>Logo</div>
          <div>Phone: 050-12345678</div>
          <div>Email: skinCare@gmail.com</div>
        </div>

        <div className="footer-icons" style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px'
        }}>
          <FaFacebook className='icon' />
          <FaInstagram className='icon' />
          <FaTiktok className='icon' />
          <FaTwitter className='icon' />
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          2024 &copy; All Rights Reserved by E.Z.
        </div>
      </footer>
    </>
  );
}
