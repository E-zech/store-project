import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../../../App';
import ProductComponent from '../../ProductComponent';
import ResultNotFound from '../../../../pages/ResultNotFound';

export default function FavProducts() {
    const [favProducts, setFavProducts] = useState([]);
    const { snackbar, loader, setFilteredProducts, selectedCategory } = useContext(GeneralContext);

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
                console.log(data)
                setFavProducts(data);
            });
    }, [selectedCategory]);

    const filteredFavProducts = favProducts.filter(product => {
        return product.category === selectedCategory || selectedCategory === "All";
    });

    return (
        <>
            <header>
                <h1 className='main-title'> My Favorites Products</h1>
                <br />
            </header>
            <section className="container-cards" style={{ marginBottom: '100px' }}>
                {loader ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="grid-cards">
                        {filteredFavProducts.length > 0 ? (
                            filteredFavProducts.map(product => (
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
