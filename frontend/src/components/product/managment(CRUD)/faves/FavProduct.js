import { useEffect, useState, useContext } from 'react';
import * as React from "react";
import { GeneralContext } from "../../../App.js";
import ProductComponent from '../ProductComponent.js';
import ResultNotFound from '../../../pages/ResultNotFound.js';

export default function FavProducts() {
    const [favProducts, setFavProducts] = useState([]);
    const { filteredProducts, setFilteredProducts, loader, setLoader, snackbar } = useContext(GeneralContext);

    useEffect(() => {
        fetch(`http://localhost:5000/products/my-faves-products`, {
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
                        return snackbar(x); // of there is no product react error NEED TO FIX   
                    });
                }
            })
            .then(data => {
                setFavProducts(data);
            });
    }, [filteredProducts]);

    const filteredfavProducts = favProducts && favProducts.filter(product => {
        return filteredProducts.some(filteredProduct => filteredProduct._id === product._id);

    });

    return (
        <>
            <header>
                <h1 className='main-title'> My Favorites Products</h1>
                <br />
            </header>
            <section className="container-cards">
                {loader ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="grid-cards">
                        {favProducts && filteredfavProducts.length > 0 ? (
                            filteredfavProducts.map(product => (
                                <ProductComponent key={product._id} product={product} setProducts={setFilteredProducts} />
                            ))
                        ) : (
                            <ResultNotFound />
                        )}
                    </div>
                )}
            </section>
        </>
    )
}