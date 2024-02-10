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
                    }
                    else {
                        return res.text().then(x => {
                            throw new Error(x);
                        });
                    }
                })
                .then(data => {
                    console.log(data)
                    setUser(data);
                    setUserRoleType(data.roleType);

                })
                .catch(err => {
                    console.log(err)
                    setUserRoleType(RoleTypes.none);
                })
                .finally(() => setLoader(false));
        } else {
            navigate('/');
            setLoader(false)
        }

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
