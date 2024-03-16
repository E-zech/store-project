import React, { useContext, useEffect, useRef, useState } from 'react';
import ProductComponent from '../../components/product component/ProductComponent';
import { GeneralContext } from '../../App';
import ResultNotFound from '../ResultNotFound';
import Cart from '../../components/cart/Cart';
import '../../css/App.css';
import '../../css/grid.css';
import { RoleTypes } from '../../components/navbar/Navbar';
import { Box, MenuItem, Select, Switch, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider/Slider';



export default function AllProducts() { // ALL Products Page basically
    const { user, products, loader, selectedCategory, } = useContext(GeneralContext);
    const navigate = useNavigate();

    return (
        <>

            <section style={{ marginBottom: '100px' }}>
                <Slider />
                <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h1 className="main-title">Skin Care Store</h1>
                </header>

                <section >
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
                                {products
                                    .filter(product => product.category === selectedCategory || selectedCategory === "All")
                                    .map((product, index) => (
                                        <ProductComponent key={index} product={product} />
                                    ))}
                            </div>
                        </>

                    )}
                </section>
            </section>
        </>
    );
}
