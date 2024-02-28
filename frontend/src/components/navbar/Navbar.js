import { useState, useContext, useEffect, useRef } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Paper } from '@mui/material';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../../App';
import SearchBar from '../searchBar/SearchBar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MenuIcon from '@mui/icons-material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const RoleTypes = {
    none: 1, //can see products .
    user: 2, //all of the above + add to faves +(will recive mails about marketing)
    business: 3, //(users who already make few purcheses/ the admin decide to make them business) : all of the above + spiceal prices (fast deliveries)
    admin: 4, //can do all + CRUD + CRM (can view all users , change thier status, delete) . // owner of the site
    master: 5, //can do all + can edit users detailes. // me
};

export const checkPermissions = (permissions, userRoleType) => {
    return permissions.includes(userRoleType);
}

const pages = [
    { route: '/about', title: 'about' },
    { route: '/login', title: 'login', permissions: [RoleTypes.none] },
    { route: '/signup', title: 'signup', permissions: [RoleTypes.none] },
    { route: '/faves', title: 'favorites ', permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin, RoleTypes.master] },
    { route: '/product-management', title: 'PRM', permissions: [RoleTypes.admin, RoleTypes.master] },
    { route: '/user-management', title: 'CRM', permissions: [RoleTypes.admin, RoleTypes.master] }];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isSearchBar, setIsSearchBar] = useState(false);
    const [visibleSecondAppBar, setVisibleSecondAppBar] = useState(false); // incharge of the visibility of the secondary appBar based on the path
    const [isAppBarFixed, setIsAppBarFixed] = useState(false);


    const { user, setUser, setLoader, userRoleType, setUserRoleType, snackbar, logout, mode, setMode, selectedCategory, setSelectedCategory } = useContext(GeneralContext);

    const style = {
        fontSize: '0.8rem'
    };

    const navigate = useNavigate();
    const path = useResolvedPath().pathname;

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
        const disableSearchBar =
            ['/user-management', '/about', '/product/:id', '/login', '/signup', '/account', '/product/add-edit/:id?', '/checkout',];
        const disableSecondaryAppBar =
            ['/user-management', '/about', '/product/:id', '/login', '/signup', '/account', '/product/add-edit/:id?', '/checkout'];
        setIsSearchBar(!disableSearchBar.includes(path));
        setVisibleSecondAppBar(!disableSecondaryAppBar.includes(path));
    }, [path]);

    useEffect(() => {
        const cleanup = () => {
            setSelectedCategory('All');
        };

        return cleanup;
    }, [path]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsAppBarFixed(scrollPosition > 70);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const handleAppBar = () => {
        window.scrollTo({
            top: 71,
            behavior: 'smooth' // Optional: smooth scrolling effect
        });
    };
    return (
        <>
            <AppBar
                position="static"
                sx={{ backgroundColor: mode === 'dark' ? 'black' : '#99c8c2' }}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => navigate('/')}
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'color', textDecoration: 'none', cursor: "pointer", userSelect: 'none' }}>
                            <HomeIcon />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                        backgroundColor: mode === 'dark' ? 'black' : '#99c8c2',
                                        color: 'white'
                                    }
                                }}
                            >
                                {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                                    <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: 'white' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{p.title}</Typography>
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
                            sx={{
                                mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                            }}>
                            <HomeIcon />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                                <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: 'white' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                            backgroundColor: p.route === path ? '#ffffff3d' : {}
                                        }}>
                                        {p.title}
                                    </Button>
                                </Link>))}
                        </Box>
                        {
                            visibleSecondAppBar &&
                            <Button color="inherit" onClick={handleAppBar} >
                                CATEGORY <ArrowDropDownIcon />
                            </Button>
                        }


                        {isSearchBar && (
                            <Box sx={{
                                width: user ? '30vw' : '40vw',
                            }}>
                                <SearchBar />
                            </Box>)}


                        <Box sx={{}} >
                            <IconButton sx={{ ml: 1 }} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
                                {mode === 'dark' ? <Brightness4Icon /> : <NightlightIcon />}
                            </IconButton>
                        </Box>

                        {user ?
                            <Box sx={{ flexGrow: 0, color: 'black' }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar sx={{ m: 1, bgcolor: 'transparent', color: '#fdfdfd' }} src={user.imgUrl} alt="User Avatar" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{
                                        mt: '45px',
                                        '& .MuiMenu-paper': {
                                            backgroundColor: mode === 'dark' ? 'black' : '#99c8c2',
                                            color: 'white'
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
                                        color: 'white'
                                    }}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography align="center">{user.firstName || 'Account'}</Typography>
                                        </MenuItem>
                                    </Link>

                                    <MenuItem onClick={logout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>



                                </Menu>
                            </Box> : ''}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* /////// */}
            {

                visibleSecondAppBar &&
                <AppBar
                    position="fixed"
                    sx={{
                        top: '0px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        transform: isAppBarFixed ? 'translateY(0px)' : 'translateY(-100%)',
                        transition: 'transform 0.3s ease-in-out',
                    }}>
                    <Toolbar sx={{
                        width: '60vw',
                        maxWidth: '600px',
                        backgroundColor: mode === 'dark' ? 'black' : '#99c8c2',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderBottomLeftRadius: '15px',
                        borderBottomRightRadius: '15px',
                    }}
                        onClick={handleAppBar}>
                        <Button color="inherit" onClick={() => setSelectedCategory('All')} sx={style}>All</Button>
                        <Button color="inherit" onClick={() => setSelectedCategory('Face')} sx={style}>Face</Button>
                        <Button color="inherit" onClick={() => setSelectedCategory('Eyes')} sx={style}>Eyes</Button>
                        <Button color="inherit" onClick={() => setSelectedCategory('Body')} sx={style}>Body</Button>
                        <Button color="inherit" onClick={() => setSelectedCategory('Hands')} sx={style}>Hands</Button>
                        <Button color="inherit" onClick={() => setSelectedCategory('Feet')} sx={style}>Feet</Button>
                    </Toolbar>
                </AppBar>
            }

        </>


    );
}



