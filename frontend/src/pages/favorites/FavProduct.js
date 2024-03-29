import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';
import ProductComponent from '../../components/product component/ProductComponent';
import ResultNotFound from '../ResultNotFound';
import Cart from '../../components/cart/Cart';
import '../../css/grid.css';
import Loader from '../../components/loader/Loader';

export default function FavProducts() {

    const { user, snackbar, loader, setLoader, filteredProducts, setFilteredProducts, products, selectedCategory, favProducts, setFavProducts, add2Cart } = useContext(GeneralContext);


    // useEffect(() => {
    //     setLoader(true)
    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 1000);
    // }, []);


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

            <div style={{ display: 'flex', position: 'fixed', bottom: '10px', left: '10px', zIndex: '9999' }}>
                {
                    user &&
                    <Cart />
                }

            </div>

            <section className="container-cards" style={{ marginBottom: '100px' }}>
                {loader ? (
                    <Loader />
                ) : (
                    <div className="grid-cards">
                        {products
                            .filter(product => product.category === selectedCategory || selectedCategory === "All")
                            .filter(product => favProducts?.some(favProduct => favProduct._id === product._id))
                            .map((product, index) => <ProductComponent key={index} product={product} setFavProducts={setFavProducts} />)
                        }
                    </div>
                )}
            </section>
        </>
    )
}
