import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';
import ProductComponent from '../../components/product component/ProductComponent';
import ResultNotFound from '../ResultNotFound';
import Cart from '../../components/cart/Cart';
import '../../css/grid.css';
import Loader from '../../components/loader/Loader';
import '../../css/noResultsFound.css';
import './FavProduct.css';
export default function FavProducts() {

    const { user, snackbar, loader, setLoader, products, selectedCategory, favProducts, setFavProducts } = useContext(GeneralContext);


    useEffect(() => {
        setLoader(true);
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
                setLoader(false);
            });
    }, []);

    return (
        <>
            <header>
                <h1 className='main-title'> My Favorites Products</h1>
                <br />
            </header>

            <div className='cartWrapper'>
                {
                    user &&
                    <Cart />
                }
            </div>

            <section className="container-cards" style={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {loader ? (
                    <Loader />
                ) : (
                    <div className="grid-cards">

                        {products.length > 0 ? (
                            products
                                .filter(product => product.category === selectedCategory || selectedCategory === "All")
                                .filter(product => favProducts?.some(favProduct => favProduct._id === product._id))
                                .map((product, index) => <ProductComponent key={index} product={product} setFavProducts={setFavProducts} />)
                        ) : (
                            <h2 className='noResults'>No results found</h2>
                        )

                        }
                    </div>
                )}
            </section>
        </>
    )
}
