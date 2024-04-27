import React, { useContext, useEffect } from 'react';
import ProductComponent from '../../components/product component/ProductComponent';
import { GeneralContext } from '../../App';
import Cart from '../../components/cart/Cart';
import Slider from '../../components/slider/Slider';
import Loader from '../../components/loader/Loader';
import '../../css/App.css';
import '../../css/grid.css';
import './Home.css';
import ResultResultNotFound from '../../utils/ResultNotFound';

export default function Home() {
    const { user, products, setProducts, loader, selectedCategory, setLoader } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true)
        fetch(`http://localhost:5000/products`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            }).finally(() => setLoader(false))
    }, []);

    const displayLowToHigh = () => {
        setProducts([...products.sort((a, b) => (a.price - a.discount) - (b.price - b.discount))]);
    }

    const displayHighToLow = () => {
        setProducts([...products.sort((a, b) => (b.price - b.discount) - (a.price - a.discount))]);
    }

    const displayDiscount = () => {
        setProducts([...products.filter(product => product.discount)]);
    }

    const displayA2Z = () => {
        setProducts([...products.sort((a, b) => a.title.localeCompare(b.title))]);
    }

    const displayZ2A = () => {
        setProducts([...products.sort((a, b) => b.title.localeCompare(a.title))]);
    }


    return (
        <>

            <section className='homeContainer'>
                <Slider />
                <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h1 className="homePage-title">Skin Care Store</h1>
                </header>

                <div className='homeBtnWrapper'>
                    {/* <span className='homeSpan'>Display: </span> */}
                    <button className='homeBtn' onClick={displayLowToHigh}>
                        Low to High
                    </button>

                    <button className='homeBtn' onClick={displayHighToLow}>
                        High to Low
                    </button>

                    <button className='homeBtn' onClick={displayDiscount}>
                        Discount
                    </button>

                    <button className='homeBtn' onClick={displayA2Z}>
                        A - Z
                    </button>

                    <button className='homeBtn' onClick={displayZ2A}>
                        Z - A
                    </button>




                </div>

                <section >
                    {loader ? (
                        <Loader />
                    ) : (
                        <>
                            <div className='cartWrapper'>
                                {
                                    user &&
                                    <Cart />
                                }
                            </div>

                            <div className="grid-cards">
                                {products.length > 0 ? (
                                    products
                                        .filter(product => product.category === selectedCategory || selectedCategory === "All")
                                        .map((product, index) => (
                                            <ProductComponent key={index} product={product} />
                                        ))
                                ) : (
                                    <ResultResultNotFound />
                                )}
                            </div>
                        </>
                    )}
                </section>
            </section>
        </>
    );
}
