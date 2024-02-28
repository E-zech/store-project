import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from "../../../App.js";
import ResultNotFound from '../../../pages/ResultNotFound.js';
import ProductComponent from '../ProductComponent.js';
import AddOrEditProduct from './AddOrEditProduct.js';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/Add.js';

export default function ProductMangement() {
    const [allMyProducts, setAllMyProducts] = useState([]);
    const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader, mode, isAppBarFixed, setIsAppBarFixed, selectedCategory, setSelectedCategory } = useContext(GeneralContext);
    const navigate = useNavigate();

    useEffect(() => {

        // maybe insert if theres localstorage.token and if not send alertt or somthing
        fetch(`http://localhost:5000/products`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setAllMyProducts(data);
            })
    }, [filteredProducts])


    const filteredMyProducts = allMyProducts.filter(product => {
        return product.category === selectedCategory || selectedCategory === "All";
    });

    return (
        <>
            <header>
                <h1 className='main-title leftFix'>Products Manegment </h1> <br />
            </header>
            <section className="container-cards" style={{ marginBottom: '100px' }}>
                {loader ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="grid-cards">
                        {filteredMyProducts.length > 0 ? (
                            filteredMyProducts.map(product => (
                                <ProductComponent key={product._id} product={product} />))
                        ) : (
                            <ResultNotFound />
                        )}

                        <Button
                            variant="contained"
                            onClick={() => navigate(`/product/add-edit`)}
                            sx={{
                                minWidth: 0,
                                width: '50px', // Set the width to the same value as the height
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'fixed',
                                right: '12px',
                                bottom: '70px',
                                color: mode === 'light' ? '#99c8c2' : '#fff',
                                backgroundColor: mode === 'light' ? '#fff' : '#000',
                                boxShadow: mode === 'light' ? '0px 0px 0px 5px #99c8c2, 0px 0px 9px 1px #99c8c2, 0px 0px 0px 7px #99c8c2' : '0px 0px 0px 5px #fff, 0px 0px 9px 1px #fff, 0px 0px 0px 7px #fff',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: mode === 'light' ? '0px 0px 0px 6px #99c8c2, 0px 0px 10px 2px #99c8c2, 0px 0px 0px 8px #99c8c2' : '0px 0px 0px 6px #fff, 0px 0px 10px 2px #fff, 0px 0px 0px 8px #fff',
                                    backgroundColor: 'white',
                                },
                            }}
                        >
                            <Add style={{ fontSize: '2.5rem', fontWeight: 'bold' }} />
                        </Button>

                    </div>)}
            </section>


        </>
    )
}


