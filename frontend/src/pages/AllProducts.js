import { useContext, useEffect, useState } from "react";
import ProductComponent from "../components/product/ProductComponent";
import { GeneralContext } from "../App";
import ResultNotFound from "./ResultNotFound";
import Cart from '../components/cart/Cart'
import '../css/App.css'

export default function AllProducts() { // ALL Products Page basicly
    const [products, setProducts] = useState([]);
    const { loader, setLoader, filteredProducts, setFilteredProducts } = useContext(GeneralContext);

    useEffect(() => {

        fetch(`http://localhost:5000/products`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, [filteredProducts]);

    const add2Cart = async (id) => {
        const updatedProducts = products.map(p => p._id === id ? { ...p, addToCart: !p.addToCart } : p);
        setProducts(updatedProducts);

        const productUpdate = updatedProducts.find(p => p._id === id);

        try {
            const res = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productUpdate),
            });

            const data = await res.json();

            setProducts(updatedProducts.map(p => (p._id === id ? data : p)));

        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    return (
        <>
            <section>
                <header className="header">
                    <h1 className="main-title">Skin Care Store</h1>
                    <h3 className="sec-title">All Products</h3>
                </header>

                <section className="container-cards">
                    {loader ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            <div className="cart-buttonDiv" style={{ display: 'flex', position: 'fixed', bottom: '55px', left: '5px', zIndex: '9999' }}>
                                <Cart add2Cart={add2Cart} />
                            </div>

                            <div className="grid-cards">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map(product => (
                                        <ProductComponent key={product._id} product={product} setProducts={setFilteredProducts} />
                                    ))
                                ) : (
                                    <ResultNotFound />
                                )}
                            </div>
                        </>

                    )}
                </section>
            </section>
        </>
    );
}