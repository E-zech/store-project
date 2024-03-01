import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../App";
import { useParams } from "react-router-dom";
import './Product.css';
import Cart from "../components/cart/Cart";

import { GiBarefoot } from "react-icons/gi";
import { FaHandSparkles } from "react-icons/fa";
import { IoBody } from "react-icons/io5";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

export default function Product() {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { user, loader, setLoader, filteredProducts, setFilteredProducts, snackbar } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/products/${id}`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setProduct(data);
            }).finally(() => {
                setLoader(false);
            })
    }, [id]);

    return (
        <> <main id="body">
            <header className="header" >
                <h1 className="main-title">{product.title}</h1>
            </header>

            <section className="first-wrapper">

                <div className="img-container">
                    <img className="img" src={product.imgUrl} alt={product.imgAlt} />
                </div>

                <div className="btnsPrice-wrapper">
                    <div className="priceDiscount-container">
                        <span className="price">Price: {product.price}$</span> <br />
                        <span className="discount">Discount: {product.discount}$</span>
                    </div>

                    <div className="btns-container">
                        <button className="btn">Add to cart</button>
                        <button className="btn">Buy now</button>
                    </div>
                </div>

            </section>

            <div>

                <GiBarefoot size={50} />
                <FaHandSparkles size={50} />
                <IoBody size={50} />
                <MdOutlineFaceRetouchingNatural size={50} />
                <IoEyeSharp size={50} />
            </div>


            <section className="second-wrapper">
                <div className="description">
                    <h2>Description</h2>
                    {product.description}
                </div>
                <div className="how2use">
                    <h2>How To Use</h2>
                    {product.howToUse}
                </div>
                <div className="Ingredients">
                    <h2>Ingredients</h2>
                    {product.Ingredients}
                </div>
                <div style={{ display: 'flex', position: 'fixed', bottom: '10px', left: '10px', zIndex: '9999' }}>
                    {
                        user &&
                        <Cart />
                    }

                </div>
            </section>
        </main>
        </>
    )
}


