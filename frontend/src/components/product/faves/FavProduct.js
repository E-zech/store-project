import { useEffect, useState, useContext } from 'react';
import * as React from "react";
import { GeneralContext } from "../../../App.js";
import ProductComponent from '../ProductComponent.js';
import ResultNotFound from '../../../pages/ResultNotFound.js';

export default function FavCards() {
    const [favCards, setFavCards] = useState([]);
    const { filteredCards, setFilteredCards, loader, setLoader } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/cards/favorite?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
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
                <h1 className='main-title'> My Favorites Cards</h1>
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