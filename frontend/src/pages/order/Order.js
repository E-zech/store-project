import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { GeneralContext } from "../../App";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function Order() {
    const { user, productsInCart, setProductsInCart, products, order, setOrder, snackbar, mode } = useContext(GeneralContext);


    useEffect(() => {
        fetch(`http://localhost:5000/my-orders`, {
            credentials: 'include',
            headers: { "Content-Type": "application/json", 'Authorization': localStorage.token, }
        })
            .then(res => {
                if (!res.ok) {
                    snackbar('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setOrder(data); // set the received orders
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, [])

    return (
        <>
            {order.length > 0 ? (
                <>
                    <h1 className="main-title">
                        Here are your orders
                    </h1>
                    <Grid container spacing={2}>
                        {order.map(order => (
                            <Grid item xs={12} key={order._id}>
                                <Box sx={{ border: 1, borderRadius: 1, padding: 2 }}>
                                    <Typography variant="h6">Order ID: {order._id}</Typography>
                                    <Typography variant="subtitle1">Total Price: ${order.totalPrice}</Typography>
                                    <Typography variant="subtitle2">Products:</Typography>
                                    <ul>
                                        {order.products.map(product => (
                                            <li key={product._id}>
                                                {product.name} - ${product.price} - Quantity: {product.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <h1 className="main-title">
                    You Don't Have Orders Yet
                </h1>
            )}
        </>
    );

}
