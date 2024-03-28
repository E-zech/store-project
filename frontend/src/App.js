import { useState, createContext, useEffect } from 'react';
import './css/App.css';
import { jwtDecode } from 'jwt-decode';
import Router from './Router';
import Navbar from './components/navbar/Navbar';
import Loader from './components/loader/Loader';
import Footer from './components/footer/Footer';
import { RoleTypes } from './utils/constants';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SnackBar from './components/snackbar/Snackbar';
import './css/ScrollBar.css';
import { useNavigate, useResolvedPath } from 'react-router-dom';

export const GeneralContext = createContext();

function App() {
    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);
    const [snackbarText, setSnackbarText] = useState('');
    const [userRoleType, setUserRoleType] = useState(RoleTypes.none);
    const [mode, setMode] = useState('light');
    const [filteredProducts, setFilteredProducts] = useState([]);// not using anymore i hope MAYBE DELTE
    const [products, setProducts] = useState([]);
    const [initialProducts, setInitialProducts] = useState([]);
    const [favProducts, setFavProducts] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const navigate = useNavigate();
    const path = useResolvedPath().pathname;

    const snackbar = text => {
        setSnackbarText(text);
        setTimeout(() => setSnackbarText(''), 1 * 2000);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null); // Reset user state
        setUserRoleType(RoleTypes.none); // Reset user role type
        navigate('/'); // Redirect to the login page or homepage
        snackbar('You have been successfully logged out');
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: '#ffffff',
                // default: '#ffefd78a',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    // const toggleMode = () => {
    //     setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    // };

    useEffect(() => {
        setLoader(true);
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
                    console.log(data)
                    setUser(data);
                    setUserRoleType(data.roleType);
                })
                .catch(err => {
                    console.log(err);
                    setUserRoleType(RoleTypes.none);
                    logout();
                    navigate('/');
                })
                .finally(() => setLoader(false));
        } else {
            navigate('/');
            setLoader(false);
        }
    }, [localStorage.token]);

    useEffect(() => {
        setLoader(true)
        fetch(`http://localhost:5000/products`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setInitialProducts(data);
                // setFilteredProducts(data);
            }).finally(() => setLoader(false))
    }, [order]); // i change from [path] might cause isssuise!!!!!!!!!!!!!!!

    useEffect(() => {
        setLoader(true);
        fetch("http://localhost:5000/cart", {
            credentials: 'include',
            headers: { "Content-Type": "application/json", 'Authorization': localStorage.token, }
        })
            .then(res => {
                if (!res.ok) {
                    snackbar('Network response was not ok : App.js');
                    return [];
                }
                return res.json();
            })
            .then(data => {
                setProductsInCart(data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            }).finally(() => setLoader(false))
    }, [user]);

    const add2Cart = (productId, title, price) => {
        setLoader(true);
        const quantity = 1;
        const products = [{ productId, quantity, price }];
        fetch(`http://localhost:5000/cart/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token,
            },
            body: JSON.stringify({
                products,
            }),
        })
            .then(res => res.json())
            .then(data => {
                snackbar(`${title} added to cart successfully`);
                console.log(data);
                setProducts(existingProducts =>
                    existingProducts.map(product =>
                        product._id === data._id ? { ...product } : product));
                setProductsInCart(existingProducts => [...existingProducts, ...data]);
            })
            .catch(error => {
                console.error('Error adding product to cart:', error);
            }).finally(() => setLoader(false))
    };


    return (
        <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <GeneralContext.Provider value={{
                user, setUser, userRoleType, setUserRoleType,
                products, setProducts, productsInCart, setProductsInCart,
                filteredProducts, setFilteredProducts,
                loader, setLoader, snackbar, logout, mode, setMode, selectedCategory, setSelectedCategory,
                favProducts, setFavProducts, add2Cart,
                initialProducts, setInitialProducts,
                order, setOrder
            }}>

                <Navbar />
                <Router />
                {loader && <Loader />}
                {snackbarText && <SnackBar text={snackbarText} />}
                {/* <Footer /> */}
            </GeneralContext.Provider>
        </ThemeProvider>
    );
}

export default App;
