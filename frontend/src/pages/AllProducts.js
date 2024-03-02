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
    const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader, mode, isAppBarFixed, setIsAppBarFixed, selectedCategory, setSelectedCategory } = useContext(GeneralContext);

    const navigate = useNavigate();

    // useEffect(() => {
    //     fetch(`http://localhost:5000/products`, {
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setProducts(data);
    //             setFilteredProducts(data);
    //         })
    // }, []); // i removed the [filteredProducts] to save a call to the DB for each time the user insert/remove a word from the search input 

    const add2Cart = (productId, title, price) => {
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
                setProducts(data);
                setProductsInCart(existingProducts => [...existingProducts, ...data]);
            })
            .catch(error => {
                console.error('Error adding product to cart:', error);
            });
    };
    return (
        <>

            <section style={{ marginBottom: '100px' }}>
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
