import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from "../../App.js";
import ProductComponent from '../../components/product component/ProductComponent.js';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/Add.js';
import '../../css/grid.css';
import Loader from '../../components/loader/Loader.js';
import { mainColor, white } from '../../css/Main.style.js';
import { boxShadowDark, boxShadowLight, hoverBoxShadowDark, hoverBoxShadowLight } from '../../components/cart/Cart.style.js';
import '../../css/noResultsFound.css'

export default function ProductMangement() {
    const [allMyProducts, setAllMyProducts] = useState([]);
    const { products, setProducts, setInitialProducts, loader, setLoader, mode, selectedCategory, } = useContext(GeneralContext);
    const navigate = useNavigate();

    const btnStyle = {
        minWidth: 0,
        width: '50px', height: '50px',
        zIndex: '99',
        bottom: '15px',
        borderRadius: '50%',
        left: '15px',
        color: mode === 'light' ? mainColor : white,
        backgroundColor: mode === 'light' ? 'white' : 'black',
        boxShadow: mode === 'light' ? boxShadowLight : boxShadowDark,
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: mode === 'light' ? hoverBoxShadowLight : hoverBoxShadowDark,
            backgroundColor: mode === 'light' ? 'white' : 'black',
        },
    };

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
            }).finally(() => setLoader(false))
    }, []);


    return (
        <>
            <header>
                <h1 className='main-title leftFix'>Products Manegment </h1> <br />
            </header>
            <section style={{ maxWidth: '2000px', minHeight: '70vh' }}>
                {loader ? (
                    <Loader />
                ) : (
                    <div className="grid-cards">
                        {products.length > 0 ? (
                            products.filter(product => product.category === selectedCategory || selectedCategory === "All").map((product, index) => <ProductComponent key={index} product={product} />)
                        ) : (
                            <h2 className='noResults'>No results found</h2>
                        )
                        }
                        <div className='cartWrapper'>
                            <Button
                                variant="contained"
                                onClick={() => { navigate(`/product/add-edit`) }}
                                sx={btnStyle}>
                                <Add sx={{ fontSize: '2.5rem' }} />
                            </Button>
                        </div>
                    </div>)}
            </section >


        </>
    )
}


