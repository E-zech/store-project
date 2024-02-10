import { useState, useContext, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../../App';
import SearchBar from '../searchBar/SearchBar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MenuIcon from '@mui/icons-material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import HomeIcon from '@mui/icons-material/Home';

export const RoleTypes = {
    none: 1, //can see products , add2cart , and buy .
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
    { route: '/product-management', title: 'product management', permissions: [RoleTypes.admin, RoleTypes.master] },
    { route: '/user-management', title: 'user management', permissions: [RoleTypes.admin, RoleTypes.master] }];

export default function Navbar({ mode, toggleMode }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isSearchBar, setIsSearchBar] = useState(false);
    const { user, setUser, setLoader, userRoleType, setUserRoleType, snackbar } = useContext(GeneralContext);
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
        const disableSearchBar = ['/admin', '/about', '/login', '/signup', '/account'];
        setIsSearchBar(!disableSearchBar.includes(path))
    }, [path]);

    const logout = async () => {
        try {
            setLoader(true);
            await localStorage.removeItem('token');
            setUser();
            setUserRoleType(RoleTypes.none);
            navigate('/');
            snackbar('You have been successfully logged out');
        } catch (error) {
            console.error('Error occurred during logout:', error);
        } finally {
            setLoader(false);
        }
    }

    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: mode === 'dark' ? 'black' : '#dda147' }}>
            <Container maxWidth="xl">
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
                            sx={{ display: { xs: 'block', md: 'none' }, }}
                        >
                            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRoleType)).map(p => (
                                <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: mode === 'dark' ? 'white' : 'black' }}>
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

                    {isSearchBar && (
                        <Box sx={{ width: user ? '29vw' : '40vw' }}>
                            <SearchBar />
                        </Box>)}


                    <Box sx={{}} >
                        <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
                            {mode === 'dark' ? <Brightness4Icon /> : <NightlightIcon />}
                        </IconButton>
                    </Box>

                    {user ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={user.imgUrl} alt="User Avatar" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
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
                                onClose={handleCloseUserMenu}>

                                <Link to="/account" style={{
                                    textDecoration: 'none',
                                    color: mode === 'dark' ? 'white' : 'black'
                                }}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{user.fullName}</Typography>
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
    );
}



