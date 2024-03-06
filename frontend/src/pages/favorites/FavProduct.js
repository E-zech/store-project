import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';
import ProductComponent from '../../components/product component/ProductComponent';
import ResultNotFound from '../ResultNotFound';
import Cart from '../../components/cart/Cart';

export default function FavProducts() {

    const { user, snackbar, loader, setLoader, filteredProducts, setFilteredProducts, selectedCategory, favProducts, setFavProducts, add2Cart } = useContext(GeneralContext);


    // useEffect(() => {
    //     setLoader(true)
    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 1000);
    // }, []);


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
                    <h1>Loading...</h1>
                ) : (
                    <div className="grid-cards">
                        {filteredProducts
                            .filter(product => product.category === selectedCategory || selectedCategory === "All")
                            .filter(product => favProducts?.some(favProduct => favProduct._id === product._id))
                            .map(product => <ProductComponent key={product._id} product={product} setFavProducts={setFavProducts} />)
                        }
                    </div>
                )}
            </section>
        </>
    )
}
