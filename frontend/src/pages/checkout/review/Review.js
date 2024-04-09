import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { GeneralContext } from "../../../App";
import Box from '@mui/material/Box';
import { mainColor } from '../../../css/Main.style';
import { useNavigate } from 'react-router-dom';
import './Review.css';

export default function Review({ formPayment, setCurrentStep, }) {
    const { user, productsInCart, setProductsInCart, products, setOrder, snackbar, mode, setLoader } = useContext(GeneralContext);
    const navigate = useNavigate();
    const fullAddress = `${user?.houseNumber} ${user?.street} St, ${user?.city}`;

    function removeOne(productId) {
        const confirmed = window.confirm("Are you sure you want to remove this product from the cart?");
        if (confirmed) {
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
        }
    }

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
        setLoader(true)
        const totalPrice = productsInCart
            .map(p => (p.price - p.discount) * p.quantity)
            .reduce((acc, curr) => acc + curr, 0)
            .toFixed(2);

        const combinedProducts = productsInCart.map(cartItem => ({
            productId: cartItem._id,
            quantity: cartItem.quantity,
            price: cartItem.price,
            ...products.find(product => product._id === cartItem._id)
        }));

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
            }).finally(() => {
                setLoader(false);
                setCurrentStep(currentStep => currentStep + 1);
                snackbar("Thank you for your purchase");
            });
    }

    return (
        <>
            {
                productsInCart.length !== 0 ? (
                    <section style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px', maxWidth: '2000px' }}>
                        <h1 className='sec-title'>Review</h1>

                        <section style={{ width: '90vw', backgroundColor: 'white', display: 'grid', gridTemplateColumns: '1fr', gap: '15px', justifyContent: 'center', alignItems: 'center', maxWidth: "2000px" }}>
                            {/* Products Header */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: mainColor, gap: '5px', fontSize: '1.2rem', alignItems: 'center', padding: '10px', borderRadius: '17px 17px 0 0',
                                width: "100%",
                                maxWidth: '2000px',
                                margin: '0 auto'

                            }}>
                                <div style={{ textAlign: 'center' }}>Image</div>
                                <div style={{ textAlign: 'center' }}>Title</div>
                                <div style={{ textAlign: 'center' }}>Quantity</div>
                                <div style={{ textAlign: 'center' }}>Price</div>
                                <div style={{ textAlign: 'center' }}>Discount</div>
                                <div style={{ textAlign: 'center' }}>Total </div>
                                <div style={{ textAlign: 'center' }}>Remove</div>
                            </div>

                            {/* Products */}
                            {productsInCart.map((p) => (
                                <div onClick={(e) => e.stopPropagation()} key={p._id} style={{
                                    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: mainColor, gap: '5px', fontSize: '1.2rem', alignItems: 'center', padding: '10px 0', width: "100%",
                                    maxWidth: '2000px',
                                    margin: '0 auto'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={p.imgUrl} alt={p.imgAlt} style={{ display: 'block', width: '70px', height: '70px', margin: 'auto', borderRadius: '15px', }} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>{p.title}</div>
                                    <div style={{ textAlign: 'center' }}>{p.quantity}</div>
                                    <div style={{ textAlign: 'center' }}>{p.price} $</div>
                                    <div style={{ textAlign: 'center' }}>{p.discount} $</div>
                                    <div style={{ textAlign: 'center' }}>{((p.price - p.discount) * p.quantity).toFixed(2)} $</div>
                                    <div onClick={() => removeOne(p._id)} style={{ textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}>❌</div>
                                </div>
                            ))}

                            <div className='papa'
                            //  style={{
                            //     display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', width: "100%",
                            //     maxWidth: '2000px',
                            //     margin: '0 auto'
                            // }}
                            >
                                {/* Address part */}
                                <section className='wrapA'
                                //  style={{
                                //     width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                //     maxWidth: '2000px',

                                // }}
                                >
                                    <div className='divAddress'
                                    // style={{
                                    //     display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', fontSize: '1.2rem', color: 'black', backgroundColor: mainColor, padding: '20px 0 20px 20px', borderBottomLeftRadius: '17px', '@media (max-width: 1200px)': {
                                    //         alignItems: 'flex-start'
                                    //     }
                                    // }}
                                    >
                                        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', paddingBottom: '20px' }}>Address Details</div>
                                        <div style={{ paddingTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Full Name:</span> {user.firstName + ' ' + user.lastName}</div>
                                        <div style={{ paddingTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Address:</span> {fullAddress}</div>
                                        <div style={{ paddingTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Zip Code:</span> {user.zip}</div>
                                    </div>
                                </section>

                                {/* Payment part */}
                                <section className='wrapA'
                                // style={{
                                //     width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',

                                //     maxWidth: '2000px',
                                //     margin: '0 auto'
                                // }}
                                >
                                    <div className='divPayment'
                                    // style={{
                                    //     display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', fontSize: '1.2rem', color: 'black', backgroundColor: mainColor, padding: '20px 0 20px 20px', borderBottomRightRadius: '17px', '@media (max-width: 1200px)': {
                                    //         alignItems: 'flex-start'
                                    //     }
                                    // }}
                                    >
                                        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', paddingBottom: '20px' }}>Payment Details</div>
                                        <div style={{ paddingTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Name On Card:</span> {formPayment.nameOnCard}</div>
                                        <div style={{ paddingTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Last 4 Digits (Card):</span> {formPayment.cardNumber.slice(-4)}</div>
                                        <div style={{ paddingTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Expiry Date:</span> {formPayment.expiryDate}</div>
                                    </div>
                                </section>
                            </div>
                        </section>

                        <Grid item xs={12} sm={12} sx={{ width: '90vw', maxWidth: '2000px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <Button onClick={placeOrder} fullWidth variant="contained" sx={{ mt: 6, mb: 2, borderBottomLeftRadius: '17px', backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white', '&:hover': { backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2' } }}>
                                Place Order
                            </Button>

                            <Button type="submit" fullWidth variant="contained" onClick={() => setCurrentStep(currentStep => Math.max(currentStep - 1, 1))} sx={{ mt: 6, mb: 2, borderBottomRightRadius: '17px', backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white', '&:hover': { backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2' } }}>
                                Back
                            </Button>
                        </Grid>
                    </section>
                ) : (
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>You dont have Product In Cart.</Typography>
                        <Button
                            onClick={() => navigate('/')}
                            variant="contained"
                            sx={{
                                mt: 3,
                                width: '220px', // Set width to 20vw
                                backgroundColor: mode === 'dark' ? 'black' : '#99c8c2',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                }
                            }}>
                            Back To Home Page
                        </Button>
                    </Box>
                )
            }
        </>
    );
}

