import AddProduct from './add/AddProduct';
import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from "../../../App.js";
import ResultNotFound from '../../../pages/ResultNotFound.js';
import ProductComponent from '../ProductComponent.js';
import AddOrEditProduct from './AddOrEditProduct.js';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function ProductMangement() {
    const [allMyProducts, setAllMyProducts] = useState([]);
    const { filteredProducts, setFilteredProducts, snackbar, loader, setLoader } = useContext(GeneralContext);
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
        return filteredProducts.some(filteredProduct => filteredProduct._id === product._id);
    });

    return (
        <>
            <header>
                <h1 className='main-title leftFix'>Products Manegment </h1> <br />
            </header>
            <section className="container-cards">
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
                            color='primary'
                            onClick={() => navigate(`/product/add-edit`)}
                            sx={{
                                backgroundColor: 'indigo',
                                '&:hover': {
                                    backgroundColor: '#7e30b7'
                                },
                                display: 'block',
                                position: 'fixed',
                                right: '18px',
                                bottom: '75px'
                            }}
                        >
                            Add Product
                        </Button>

                    </div>)}
            </section>


        </>
    )
}


