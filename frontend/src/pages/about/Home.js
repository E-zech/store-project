import { useContext, useEffect, useState } from "react";
import ProductComponent from "../../components/product/ProductComponent";
import { GeneralContext } from "../../App";
import ResultNotFound from "../ResultNotFound";
import '../../css/App.css'

export default function Home() {
    const [allCards, setAllCard] = useState([]);
    const { loader, setLoader, filteredCards, setFilteredCards } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/products`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllCard(data);
            }).finally(() => setLoader(false))
    }, [filteredCards]);


    return (
        <>
            <section>
                <header className="header">
                    <h1 className="main-title">Skin Care Store</h1>
                    <h3 className="sec-title">Explore Queenstown's Most Thrilling and Breathtaking Adventures !</h3>
                </header>

                <section className="container-cards">
                    {loader ? (
                        <h1>Loading...</h1>
                    ) : (
                        <div className="grid-cards">
                            {filteredCards.length > 0 ? (
                                filteredCards.map(card => (
                                    <ProductComponent key={card.id} card={card} setAllCard={setFilteredCards} />
                                ))
                            ) : (
                                <ResultNotFound />
                            )}
                        </div>
                    )}
                </section>
            </section>
        </>
    );
}