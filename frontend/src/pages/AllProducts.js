import React, { useContext, useEffect, useRef, useState } from 'react';
import ProductComponent from '../components/product/ProductComponent';
import { GeneralContext } from '../App';
import ResultNotFound from './ResultNotFound';
import Cart from '../components/cart/Cart';
import '../css/App.css';
import { RoleTypes } from '../components/navbar/Navbar';
import { Box, MenuItem, Select, Switch, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AllProducts() { // ALL Products Page basically
    const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader, mode, isAppBarOpen, setIsAppBarOpen } = useContext(GeneralContext);
    const [selectedCategory, setSelectedCategory] = useState("All");



    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/products`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, [filteredProducts]);

    const add2Cart = (productId, title, price) => {
        const quantity = 1;
        fetch(`http://localhost:5000/cart/add/${productId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 'Authorization': localStorage.token,
            },
            body: JSON.stringify({
                quantity,
                price
            }),
        })
            .then(res => res.json())
            .then(data => {
                snackbar(`${title} added to cart successfully`);
                console.log(data)
                setProducts(data);
                setProductsInCart(data);
            })
    };


    return (
        <>
            <AppBar position="static"
                sx={{
                    width: '97vw',
                    top: '70px', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                    transform: isAppBarOpen ? 'translateY(0px)' : 'translateY(-200%)',
                    transition: 'transform 0.3s ease-in-out',
                }}>
                <Toolbar sx={{
                    width: '40vw',
                    backgroundColor: mode === 'dark' ? 'black' : '#99c8c2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',

                }}>
                    <Button color="inherit" onClick={() => setSelectedCategory('All')}>All</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Face')}>Face</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Eyes')}>Eyes</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Body')}>Body</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Hands')}>Hands</Button>
                    <Button color="inherit" onClick={() => setSelectedCategory('Feet')}>Feet</Button>
                </Toolbar>
            </AppBar>


            <section>
                <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h1 className="main-title">Skin Care Store</h1>
                </header>

                <section className="container-cards">
                    {loader ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            <div style={{ display: 'flex', position: 'fixed', bottom: '10px', left: '10px', zIndex: '9999' }}>
                                {
                                    user &&
                                    <Cart />
                                }

                            </div>

                            <div className="grid-cards">
                                {filteredProducts.filter(product => product.category === selectedCategory || selectedCategory === "All").map(product => (
                                    <ProductComponent key={product._id} product={product} add2Cart={add2Cart} />
                                ))}
                            </div>
                        </>

                    )}
                </section>
            </section>
        </>
    );
}
