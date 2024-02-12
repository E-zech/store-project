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

    const add2Cart = async (productId, price, quantity) => {
        console.log(price, quantity)
        const obj = { price, quantity }
        fetch(`http://localhost:5000/cart/add/${productId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 'Authorization': localStorage.token,
            },
            body: JSON.stringify(obj),
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
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
                                        <ProductComponent key={product._id} product={product} setProducts={setFilteredProducts} add2Cart={add2Cart} />
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