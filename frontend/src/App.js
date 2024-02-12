import { useState, createContext, useEffect } from 'react';
import './css/App.css';
import { jwtDecode } from 'jwt-decode';
import Router from './Router';
import Navbar, { RoleTypes } from './components/navbar/Navbar';
import Loader from './components/loader/Loader';
import Footer from './components/footer/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SnackBar from './components/snackbar/Snackbar';
import './css/ScrollBar.css';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

function App() {
    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);
    const [snackbarText, setSnackbarText] = useState('');
    const [userRoleType, setUserRoleType] = useState(RoleTypes.none);
    const [mode, setMode] = useState('light');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();

    const snackbar = text => {
        setSnackbarText(text);
        setTimeout(() => setSnackbarText(''), 1 * 2000);
    }

    const logoutApp = () => {
        localStorage.removeItem('token');
        setUser(null); // Reset user state
        setUserRoleType(RoleTypes.none); // Reset user role type
        navigate('/'); // Redirect to the login page or homepage
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: '#ffefd78a',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const toggleMode = () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const expirationTime = decodedToken.exp * 1000;
                const currentTime = Date.now();

                if (expirationTime - currentTime < 5 * 60 * 1000) { // Refresh token 5 minutes before expiration
                    refreshToken(token);
                }
            }
        };

        const refreshToken = (expiredToken) => {
            fetch('http://localhost:5000/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': expiredToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('token', data.token); // Update token in local storage
                })
                .catch(error => {
                    console.error('Error refreshing token:', error);
                    logoutApp();
                });
        };

        const intervalId = setInterval(checkTokenExpiration, 10 * 60 * 1000); // Check every 10 minutes

        if (localStorage.token) {
            const decodedToken = jwtDecode(localStorage.token);
            const userId = decodedToken.userId;

            fetch(`http://localhost:5000/users/${userId}`, {
                credentials: 'include',
                headers: {
                    'Authorization': localStorage.token,
                    'Content-Type': 'application/json',
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.text().then(x => {
                            throw new Error(x);
                        });
                    }
                })
                .then(data => {
                    console.log(data);
                    setUser(data);
                    setUserRoleType(data.roleType);
                })
                .catch(err => {
                    console.log(err);
                    setUserRoleType(RoleTypes.none);
                    logoutApp();
                })
                .finally(() => setLoader(false));
        } else {
            navigate('/');
            setLoader(false);
        }

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);
    return (
        <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <GeneralContext.Provider value={{ user, setUser, loader, setLoader, snackbar, userRoleType, setUserRoleType, filteredProducts, setFilteredProducts }}>
                <Navbar mode={mode} toggleMode={toggleMode} />
                <Router />
                {loader && <Loader />}
                {snackbarText && <SnackBar text={snackbarText} />}
                <Footer mode={mode} toggleMode={toggleMode} />
            </GeneralContext.Provider>
        </ThemeProvider>
    );
}

export default App;
