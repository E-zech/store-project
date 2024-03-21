import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { GeneralContext } from "../../../App";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export default function Review({ formPayment, setCurrentStep, }) {
    const { user, productsInCart, setProductsInCart, products, order, setOrder, snackbar, mode } = useContext(GeneralContext);

    const fullAddress = `${user?.houseNumber} ${user?.street}, ${user?.city}, ${user?.zip}`;



    function removeOne(productId) {
        fetch(`http://localhost:5000/cart/delete/${productId}`, {
            method: 'DELETE',
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
                console.log(data.addToCart)
                setProductsInCart(productsInCart.filter(p => p._id !== productId));
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    };


    function emptyCart() {
        fetch(`http://localhost:5000/cart/delete-all`, {
            method: 'DELETE',
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
                console.log(data.addToCart)
                setProductsInCart([]);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }

    const placeOrder = () => {
        const totalPrice = productsInCart
            .map(p => (p.price - p.discount) * p.quantity)
            .reduce((acc, curr) => acc + curr, 0)
            .toFixed(2);

        // Combine the product details with the cart items
        const combinedProducts = productsInCart.map(cartItem => ({
            productId: cartItem._id,
            quantity: cartItem.quantity,
            price: cartItem.price,
            ...products.find(product => product._id === cartItem._id)
        }));
        console.log(combinedProducts)
        // Construct the order object
        const obj = {
            user: user._id,
            fullName: user.firstName + ' ' + user.lastName,
            products: combinedProducts,
            paymentDetails: {
                nameOnCard: formPayment.nameOnCard,
                cardLast4Digits: formPayment.cardNumber.slice(-4)
            },
            fullAddress: fullAddress,
            totalPrice: parseFloat(totalPrice)
        };
        fetch(`http://localhost:5000/create/order`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': localStorage.token },
            body: JSON.stringify(obj),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setOrder(data);
                emptyCart();
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });

        setCurrentStep(currentStep => currentStep + 1);
        snackbar("Thank you for your purchase");
    }
    return (
        <>
            <section
                style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>
                <h1 className='sec-title'>review</h1>

                <section style={{ width: '80vw', backgroundColor: '#80808040', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {productsInCart.map((p) => ( // products part
                        <Box
                            onClick={(e) => e.stopPropagation()}
                            key={p._id}
                            sx={{
                                width: '80vw',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                backgroundColor: 'yellow',
                                gap: '5px'
                            }}>

                            <Typography sx={{}}>
                                {p.title}
                            </Typography>
                            <Typography sx={{}}>
                                {p.price}
                            </Typography>
                            <Typography sx={{}}>
                                {p.discount}
                            </Typography>
                            <Typography sx={{}}>
                                {p.quantity}
                            </Typography>
                            <Typography sx={{}}>
                                {`Total Price: ${((p.price - p.discount) * p.quantity).toFixed(2)}`}
                            </Typography>
                            <Typography sx={{}}>
                                <img src={p.imgUrl} alt={p.imgAlt} style={{ width: '50px', height: '50px' }} />
                            </Typography>
                            <Typography
                                onClick={() => removeOne(p._id)}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease-in-out', // Added a comma here
                                    '&:hover': {
                                        transform: 'scale(1.2)'
                                    }
                                }}>
                                ❌
                            </Typography>
                        </Box>
                    ))}

                    <hr className='hr' />

                    <Box //address part
                        sx={{
                            width: '80vw',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '1rem', color: 'black', backgroundColor: "green"
                        }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Address Details: </Typography>
                        <Box >
                            <Typography > {user.firstName + ' ' + user.lastName} </Typography>
                            <Typography>{fullAddress}</Typography>
                        </Box>
                    </Box>

                    <hr className='hr' />
                    <Box //payment part
                        sx={{ width: '80vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '1rem', color: 'black', backgroundColor: "blue" }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Payment Details: </Typography>
                        <Box >
                            <Typography>Name On Card: {formPayment.nameOnCard}</Typography>
                            <Typography>Card Number:XXXX-XXXX-XXXX-{formPayment.cardNumber.slice(-4)}</Typography>
                            <Typography>
                                Expiry Date: {formPayment.expiryDate}
                            </Typography>
                        </Box>
                    </Box>
                </section>

                <Grid item xs={12} sm={12}>
                    <Button
                        onClick={placeOrder}
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                            '&:hover': {
                                backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                            }
                        }}>
                        Place Order
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => setCurrentStep(currentStep => Math.max(currentStep - 1, 1))}
                        sx={{
                            mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                            '&:hover': {
                                backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                            }
                        }}>
                        Back
                    </Button>
                </Grid>
            </section >
        </>
    );
}

