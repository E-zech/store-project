import { createContext, useContext, useEffect, useState } from "react";
import ProductComponent from "../components/product/ProductComponent";
import { GeneralContext } from "../App";
import ResultNotFound from "./ResultNotFound";
import Cart from '../components/cart/Cart'
import '../css/App.css'
import { RoleTypes } from "../components/navbar/Navbar";
export const CartContext = createContext();

export default function AllProducts() { // ALL Products Page basicly
    // const [products, setProducts] = useState([]);
    // const [productsInCart, setProductsInCart] = useState([]);
    const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader } = useContext(GeneralContext);

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


    const add2Cart = (productId, title, price) => {
        const quantity = 1;
        fetch(`http://localhost:5000/cart/add/${productId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 'Authorization': localStorage.token,
            },
            body: JSON.stringify({
                quantity,
                price
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data);
                setProductsInCart(data);
                snackbar(`${title} added to cart successfully`);
            })
    };

    useEffect(() => {
        fetch("http://localhost:5000/cart", {
            credentials: 'include',
            headers: { "Content-Type": "application/json", 'Authorization': localStorage.token }
        })
            .then(res => {
                if (!res.ok) {
                    snackbar('Network response was not ok : cart.js');
                    return [];
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
                setProductsInCart(data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

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
                                {
                                    user &&
                                    <Cart />
                                }

                            </div>

                            <div className="grid-cards">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map(product => (
                                        <ProductComponent key={product._id} product={product} add2Cart={add2Cart} />

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