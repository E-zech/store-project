import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../App";
import { useParams } from "react-router-dom";
import './Product.css';


export default function Product() {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { loader, setLoader, filteredProducts, setFilteredProducts, snackbar } = useContext(GeneralContext);

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
                <h1>{product.title}</h1>
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

            </section>
        </main>
        </>
    )
}


