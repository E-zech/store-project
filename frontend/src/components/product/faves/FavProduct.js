import { useEffect, useState, useContext } from 'react';
import * as React from "react";
import { GeneralContext } from "../../../App.js";
import ProductComponent from '../ProductComponent.js';
import ResultNotFound from '../../../pages/ResultNotFound.js';

export default function FavProducts() {
    const [favCards, setFavCards] = useState([]);
    const { filteredCards, setFilteredCards, loader, setLoader } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/products/my-faves-products`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                setFavCards(data);
            }).finally(() => {
                setLoader(false);
            });
    }, [filteredCards]);

    const filteredFavCards = favCards.filter(card => {
        return filteredCards.some(filteredCard => filteredCard.id === card.id);

    });

    return (
        <>
            <header>
                <h1 className='main-title'> My Favorites Products</h1>
                <br />
            </header>
            <section className="container-cards">
                {loader ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="grid-cards">
                        {filteredFavCards.length > 0 ? (
                            filteredFavCards.map(card => (
                                <ProductComponent key={card.id} card={card} setAllCard={setFilteredCards} />
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