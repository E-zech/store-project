import { useState, createContext, useEffect } from 'react';
import './css/App.css';
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
    const [filteredCards, setFilteredCards] = useState([]);

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
            fetch(`http://localhost:5000/users/login`, {
                credentials: 'include',
                headers: {
                    'Authorization': localStorage.token
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
                    setUserRoleType(RoleTypes.user);

                    if (data.business) {
                        setUserRoleType(RoleTypes.business);
                    } else if (data.admin) {
                        setUserRoleType(RoleTypes.admin);
                    }
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
            <GeneralContext.Provider value={{ user, setUser, loader, setLoader, snackbar, userRoleType, setUserRoleType, filteredCards, setFilteredCards }}>
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
