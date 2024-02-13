import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../App";
import { useParams } from "react-router-dom";

export default function Product() {
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
                console.log(data);
            }).finally(() => {
                setLoader(false);
            })
    }, [id]);


    return (
        <>

        </>
    )
}


