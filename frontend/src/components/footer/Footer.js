import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../../App';
import { RoleTypes } from '../navbar/Navbar';
import '../../css/App.css';

export default function Footer({ mode }) {
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;
  const [value, setValue] = useState(0);
  const { user, userRoleType } = useContext(GeneralContext);

  const activeColor = {
    "&.Mui-selected": {
      color: '#db8a45',
    }
  };

  useEffect(() => {
    if (path === '/about') {
      setValue(0);
    } else if (path === '/faves') {
      setValue(1);
    } else if (path === '/product-management') {
      setValue(2);
    } else if (path === '/user-management') {
      setValue(3);
    } else {
      setValue(-1);
    }
  }, [path]);

  return (
    <>
      <footer className='footer'>
        <Box sx={{
          width: '100%',
          height: 'auto',
          bottom: '0',
          position: 'fixed',
        }}>

          <BottomNavigation
            sx={{ backgroundColor: mode === 'dark' ? 'black' : '#ffefd7' }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}>

            <BottomNavigationAction label="About" icon={<InfoIcon />} onClick={() => navigate('/about')}
              sx={path === '/about' ? activeColor : {}} />

            {user &&
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => navigate('/faves')} sx={path === '/faves' ? activeColor : {}} />
            }

            {(userRoleType === RoleTypes.admin || userRoleType === RoleTypes.master) &&
              <BottomNavigationAction label="product management" icon={<LocalMallIcon />} onClick={() => navigate('/product-management')} sx={path === '/product-management' ? activeColor : {}} />
            }
            {(userRoleType === RoleTypes.admin || userRoleType === RoleTypes.master) &&
              <BottomNavigationAction label="user management" icon={<AccountCircleIcon />} onClick={() => navigate('/user-management')} sx={path === '/user-management' ? activeColor : {}} />
            }

          </BottomNavigation>
        </Box>
      </footer>
    </>
  );
}
