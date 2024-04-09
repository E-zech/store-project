import { useState, useContext, useEffect, useRef } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Paper } from '@mui/material';
import { Link, useLocation, useNavigate, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../../App';
import { pathToRegexp } from 'path-to-regexp';
import SearchBar from '../searchBar/SearchBar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MenuIcon from '@mui/icons-material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SecondNavbar from './SecondNavbar';
import { black, font, gray, mainColor, mainFont, selectColor, transparent, white } from '../../css/Main.style';
import { homeIconStyle, homeIconStyleSmall, menuIconStyle } from './Navbar.style';
import { RoleTypes, pages, disable } from '../../utils/constants';

export const checkPermissions = (permissions, userRoleType) => {
    return permissions.includes(userRoleType);
}

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isSearchBar, setIsSearchBar] = useState(false);
    const [visibleSecondAppBar, setVisibleSecondAppBar] = useState(false);
    const [isAppBarFixed, setIsAppBarFixed] = useState(false);
    const [toggleIcon, setToggleIcon] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();
    const path = useResolvedPath().pathname;

    const { user, userRoleType, logout, mode, setMode, selectedCategory, setSelectedCategory } = useContext(GeneralContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    };

    useEffect(() => {
        document.body.style.paddingRight = '0';
        document.body.style.overflow = 'visible';

        return () => {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        };
    }, [handleOpenNavMenu]);


    useEffect(() => {
        const productPathRegex = pathToRegexp('/product/:id');
        const addEditProductPathRegex = pathToRegexp('/product/add-edit/:id?');

        setIsSearchBar(!disable.includes(pathname) && !productPathRegex.test(pathname) && !addEditProductPathRegex.test(pathname));
        setVisibleSecondAppBar(!disable.includes(pathname) && !productPathRegex.test(pathname) && !addEditProductPathRegex.test(pathname));
    }, [pathname]);

    useEffect(() => {
        const cleanup = () => {
            setSelectedCategory('All');
            setIsAppBarFixed(false);
        };
        return cleanup;
    }, [path]);

    const openMenu = () => {
        setToggleIcon(!toggleIcon);
        setIsAppBarFixed(!isAppBarFixed);
    }

    return (
        <>
            <AppBar sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '2000px',
                height: '75px',
                margin: '0 auto', // This centers the AppBar horizontally
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: mode === 'dark' ? black : mainColor,
                color: mode === 'dark' ? white : gray,
                fontFamily: font,
                paddingRight: '0 !important',
            }}>
                <Container sx={{
                    maxWidth: "2000px !important", color: mode === 'dark' ? white : gray,
                    '@media screen and (max-width: 600px)': {
                        padding: 0
                    }
                }}>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => { navigate('/') }}
                            sx={homeIconStyle}>
                            <HomeIcon />
                        </Typography>

                        <Box sx={menuIconStyle}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    '& .MuiMenu-paper': {
                                        backgroundColor: mode === 'dark' ? black : mainColor,
                                        color: white,
                                        top: "75px !important",
                                        left: '1px !important',
                                        width: '140px'
                                    },
                                    body: {
                                        paddingRight: "0 !important",
                                        overflow: 'visible !important'
                                    }
                                }}>
                                {/* the hamburger navbar titles */}
                                {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                                    <Link key={p.route} to={p.route}
                                        style={{ textDecoration: 'none', color: mode === 'dark' ? white : gray, }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" sx={{ textTransform: 'none', fontSize: "1.1rem", }}>{p.title}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={homeIconStyleSmall}>
                            <HomeIcon />
                        </Typography>
                        {/* the big navbar titles */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                                <Link key={p.route} to={p.route} style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            display: 'block',
                                            textTransform: 'none',
                                            fontSize: "1.1rem",
                                            color: mode === 'dark' ? white : gray,
                                            backgroundColor: p.route === path ? selectColor : transparent
                                        }}>
                                        {p.title}
                                    </Button>
                                </Link>))}
                        </Box>

                        {visibleSecondAppBar &&
                            <Button color="inherit" onClick={openMenu} >
                                {selectedCategory.toUpperCase()}
                                {toggleIcon ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </Button>
                        }

                        {isSearchBar && (
                            <Box sx={{
                                width: user ? '30vw' : '40vw',
                            }}>
                                <SearchBar />
                            </Box>)}

                        <Box  >
                            <IconButton sx={{
                                ml: 1, '@media screen and (max-width: 600px)': {
                                    padding: 0
                                }
                            }} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
                                {mode === 'dark' ? <Brightness4Icon /> : <NightlightIcon />}
                            </IconButton>
                        </Box>

                        {user ?
                            <Box sx={{ flexGrow: 0, color: black }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar
                                            sx={{
                                                m: 1, bgcolor: transparent,
                                                color: mode === 'dark' ? white : gray
                                            }}
                                            src={user.imgUrl} alt="User Avatar" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{
                                        mt: '59px',
                                        left: '0px',
                                        '& .MuiMenu-paper': {
                                            backgroundColor: mode === 'dark' ? black : mainColor,
                                            color: mode === 'dark' ? white : gray,
                                            right: '0 !important',
                                            marginLeft: '24px',
                                            width: '130px',

                                        }
                                    }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu} >


                                    <Link to="/account" style={{
                                        textDecoration: 'none',
                                        color: mode === 'dark' ? white : gray,
                                    }}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography align="center">My Account</Typography>
                                        </MenuItem>
                                    </Link>

                                    <MenuItem onClick={() => { navigate('/my-orders') }}>
                                        <Typography textAlign="center">My Orders</Typography>
                                    </MenuItem>

                                    <MenuItem onClick={logout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>

                                </Menu>
                            </Box> : ''}
                    </Toolbar>
                </Container>
            </AppBar>
            {
                visibleSecondAppBar &&
                isAppBarFixed &&
                <SecondNavbar openMenu={openMenu} />
            }
        </>
    );
}