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
import { mainColor } from '../../css/Main.style';
import Loader from '../../components/loader/Loader';
import '../../css/noResultsFound.css';


export default function AllProducts() { // ALL Products Page basically
    const { user, products, setProducts, loader, selectedCategory, setLoader } = useContext(GeneralContext);
    const navigate = useNavigate();

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
            }).finally(() => setLoader(false))
    }, []);

    const displayLow2high = () => {
        console.log("displayLow2high")
        // const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        // setProducts(sortedProducts);
    }

    const displayHigh2Low = () => {
        console.log("displayHigh2Low")
        // const sortedProducts = [...products].sort((a, b) => b.price - a.price);
        // setProducts(sortedProducts);
    }

    const displayDiscount = () => {
        console.log("displayDiscount")
        // const sortedProducts = [...products].filter(product => product.discount > 0).sort((a, b) => b.discount - a.discount);
        // setProducts(sortedProducts);
    }

    return (
        <>

            <section style={{ width: '100%', maxWidth: '2000px', margin: '0 auto', minHeight: '70vh' }}>
                <Slider />
                <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h1 className="homePage-title">Skin Care Store</h1>
                </header>

                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '50px 0'
                }}>

                    <button style={{ padding: '7px 15px', borderRadius: '15px', fontSize: '1em', borderColor: 'transparent', backgroundColor: mainColor, cursor: 'pointer' }}
                        onClick={displayLow2high}>
                        Low To High
                    </button>

                    <button style={{ padding: '7px 15px', borderRadius: '15px', fontSize: '1em', borderColor: 'transparent', backgroundColor: mainColor, cursor: 'pointer' }}
                        onClick={displayHigh2Low}>
                        High To Low
                    </button>

                    <button style={{ padding: '7px 15px', borderRadius: '15px', fontSize: '1em', borderColor: 'transparent', backgroundColor: mainColor, cursor: 'pointer' }}
                        onClick={displayDiscount}>
                        Discount Products
                    </button>
                </div>


                <section >
                    {loader ? (
                        <Loader />
                    ) : (
                        <>
                            <div className='cartWrapper'>
                                {
                                    user &&
                                    <Cart />
                                }

                            </div>

                            <div className="grid-cards">
                                {products.length > 0 ? (
                                    products
                                        .filter(product => product.category === selectedCategory || selectedCategory === "All")
                                        .map((product, index) => (
                                            <ProductComponent key={index} product={product} />
                                        ))
                                ) : (
                                    <h2 className='noResults'>No results found</h2>
                                )}
                            </div>
                        </>

                    )}
                </section>
            </section>
        </>
    );
}
