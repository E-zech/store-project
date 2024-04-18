import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useContext } from 'react';
import { GeneralContext } from "../../App";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainColor } from '../../css/Main.style';

export default function Order() {
    const { user, productsInCart, setProductsInCart, products, order, setOrder, snackbar, mode, setLoader } = useContext(GeneralContext);


    useEffect(() => {
        setLoader(true);
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
                setOrder(data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            }).finally(() => setLoader(false))
    }, [])

    return (
        <>
            {order.length > 0 ? (
                <>
                    <h1 className="main-title">
                        My Orders
                    </h1>
                    <Grid container spacing={2} justifyContent="center" sx={{ width: '90vw', margin: '35px auto', maxWidth: '2000px', minHeight: '70vh' }}>
                        {order.map((orderItem, index) => (
                            <Grid item xs={12} key={index}>
                                <Accordion>
                                    <AccordionSummary sx={{ backgroundColor: mainColor }}
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography sx={{ fontSize: '1.4rem' }}><strong>Order ID:</strong> {orderItem._id}
                                            <br />
                                            <Typography sx={{ fontSize: '1.3rem' }}><strong>Created At:</strong> {new Date(orderItem.createdAt).toLocaleString()}</Typography>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box sx={{ width: '100%' }}>

                                            <Accordion>
                                                <AccordionSummary sx={{ backgroundColor: mainColor, mt: 1 }}
                                                    expandIcon={<ExpandMoreIcon />}
                                                >
                                                    <Typography sx={{ fontSize: '1.3rem' }}><strong>Products:</strong></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box sx={{ width: '100%' }}>
                                                        {orderItem.products.map((product, idx) => (

                                                            <Accordion key={idx}>
                                                                <AccordionSummary sx={{ backgroundColor: mainColor, mt: 1 }} expandIcon={<ExpandMoreIcon />}>
                                                                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{product.title}</Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <section style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>

                                                                        <section style={{ width: '100%', backgroundColor: mainColor, display: 'grid', gridTemplateColumns: '1fr', justifyContent: 'center', alignItems: 'center', }}>
                                                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: mainColor, gap: '5px', fontSize: '1.2rem', alignItems: 'center', padding: '10px', borderRadius: '0px', border: '2px solid black', borderBottom: 'none' }}>
                                                                                <div style={{ textAlign: 'center' }}>Image</div>
                                                                                <div style={{ textAlign: 'center' }}>Quantity</div>
                                                                                <div style={{ textAlign: 'center' }}>Price</div>
                                                                                <div style={{ textAlign: 'center' }}>Discount</div>
                                                                                <div style={{ textAlign: 'center' }}>Total </div>
                                                                            </div>

                                                                            <div key={product._id} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: 'white', gap: '5px', fontSize: '1.2rem', alignItems: 'center', padding: '10px 0', border: '2px solid black' }}>
                                                                                <div className='reviewImgWrapper' style={{ textAlign: 'center' }}>
                                                                                    <img src={product.imgUrl} alt={product.imgAlt} style={{ display: 'block', width: '70px', height: '70px', margin: 'auto', borderRadius: '15px' }} />
                                                                                </div>

                                                                                <div className='reviewQTY' style={{ textAlign: 'center' }}>{product.quantity}</div>
                                                                                <div className='reviePrice' style={{ textAlign: 'center' }}>{product.price} $</div>
                                                                                <div className='revieDiscount' style={{ textAlign: 'center' }}>{product.discount} $</div>
                                                                                <div className='reviewTotal' style={{ textAlign: 'center' }}>{((product.price - product.discount) * product.quantity).toFixed(2)} $</div>
                                                                            </div>
                                                                        </section>
                                                                    </section>
                                                                </AccordionDetails>
                                                            </Accordion>

                                                        ))}
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>

                                            <br />
                                            <Accordion>
                                                <AccordionSummary sx={{ backgroundColor: mainColor }}
                                                    expandIcon={<ExpandMoreIcon />}
                                                >
                                                    <Typography sx={{ fontSize: '1.3rem' }}><strong>Payment Details:</strong></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography sx={{ fontSize: '1.1rem', mt: 1 }}><strong>Name on Card:</strong> {orderItem.paymentDetails.nameOnCard}</Typography>
                                                    <Typography sx={{ fontSize: '1.1rem', mt: 1 }}><strong>Card Last 4 Digits:</strong> {orderItem.paymentDetails.cardLast4Digits}</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <br />
                                            <AccordionDetails>
                                                <Box >
                                                    <Typography sx={{ fontSize: '1.3rem' }}><strong>Full Address:</strong> {orderItem.fullAddress}</Typography>
                                                    <Typography sx={{ fontSize: '1.3rem', mt: 1 }}><strong>Total Order:</strong> {orderItem.totalPrice}$</Typography>

                                                </Box>
                                            </AccordionDetails>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <>

                    <h1 className="main-title">
                        My Orders
                    </h1>

                    <section style={{ minHeight: '56vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            You Dont Have Orders Yet
                        </div>
                    </section>
                </>

            )
            }
        </>
    );
}
