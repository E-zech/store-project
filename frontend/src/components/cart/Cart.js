import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Fab from '@mui/material/Fab';
import { useState, useContext } from 'react';
import { GeneralContext } from "../../App";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { listStyle, bigBoxStyle, counterWrapper, counterBtn, footerBtnWrapper, boxShadowLight, boxShadowDark, hoverBoxShadowLight, hoverBoxShadowDark, imgTitleWrapper, totalWrapper } from './Cart.style'
import { mainColor, white } from '../../css/Main.style';

export default function Cart() {
    const { productsInCart, setProductsInCart, snackbar, setLoader, mode } = useContext(GeneralContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    const incrementQuantity = (productId, price) => {
        const productIndex = productsInCart.findIndex(p => p._id === productId);
        if (productIndex !== -1) {
            const updatedproductsInCart = [...productsInCart];
            updatedproductsInCart[productIndex].quantity += 1;
            setProductsInCart(updatedproductsInCart);
        }
    }

    const decrementQuantity = (productId, price) => {
        const productIndex = productsInCart.findIndex(p => p._id === productId);
        if (productIndex !== -1) {
            const updatedproductsInCart = [...productsInCart];
            if (updatedproductsInCart[productIndex].quantity > 1) {
                updatedproductsInCart[productIndex].quantity -= 1;
                setProductsInCart(updatedproductsInCart);
            } else {
                removeFromCart(productId);
            }
        }
    };

    const saveChanges = () => {
        // setLoader(true);
        fetch(`http://localhost:5000/cart/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token,
            },
            body: JSON.stringify({
                products: productsInCart.map(product => ({
                    productId: product._id,
                    quantity: product.quantity,
                    price: product.price,
                })),
            }),
        })
            .then(res => res.json())
            .then(data => {
                setProductsInCart(data);
            })
            .catch(error => {
                console.error('Error saving changes:', error);
            });
    };

    const toggleDrawer = () => {
        if (isOpen) {
            saveChanges();
        }
        setIsOpen(!isOpen);
    };

    const removeFromCart = (id) => {
        if (window.confirm(`Are you sure you want to delete ${id ? 'this product' : 'all products'} ?`)) {
            const url = id ? `http://localhost:5000/cart/delete/${id}` : `http://localhost:5000/cart/delete-all`;
            fetch(url, {
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
                .then(() => {
                    if (id) {
                        setProductsInCart(productsInCart.filter(p => p._id !== id));
                    } else {
                        setProductsInCart([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching cart items:', error);
                });
        }
    }

    const list = () => (
        productsInCart.length !== 0 ? (
            <Box
                sx={{ width: 500 }}
                role="presentation"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={toggleDrawer}>

                <List
                    sx={listStyle}>
                    {productsInCart?.map((p, index) => (
                        <Box
                            onClick={(e) => e.stopPropagation()}
                            key={index}
                            sx={bigBoxStyle}>

                            <ListItem sx={{ width: '100%', padding: '0px', justifyContent: 'center' }}>
                                <Box sx={imgTitleWrapper}>
                                    <ListItemIcon >
                                        <img src={p.imgUrl} alt={p.imgAlt} style={{ width: '70px', height: '70px', borderRadius: '15px' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={<span style={{ fontSize: '17px', fontWeight: 'bold' }}>{p.title}</span>} sx={{ minWidth: '0px', maxWidth: '120px', color: 'black' }} />
                                </Box>

                                <Box sx={counterWrapper}>
                                    <IconButton aria-label="Add quantity" onClick={() => incrementQuantity(p._id, p.price)} sx={counterBtn}>
                                        <AddIcon />
                                    </IconButton>
                                    <span style={{ fontWeight: 'bold', fontSize: '17px' }}>{p.quantity}</span>
                                    <IconButton aria-label="Decrease quantity" onClick={() => decrementQuantity(p._id, p.price)}
                                        sx={counterBtn}>

                                        <RemoveIcon />
                                    </IconButton>
                                </Box>

                                <Box sx={totalWrapper}>
                                    <ListItemText
                                        primary={<span style={{ fontWeight: 'bold' }}>Total: {parseFloat((((p.price - p.discount) * p.quantity) * 100) / 100).toFixed(2)}</span>}
                                        sx={{ textAlign: 'center', }}
                                    />

                                    <Button sx={{
                                        justifyContent: 'center', minWidth: '0px',
                                        borderRadius: '25%', color: 'black', "&:hover": {
                                            backgroundColor: 'white'
                                        }
                                    }} onClick={() => removeFromCart(p._id)}>
                                        <RemoveShoppingCartIcon />
                                    </Button>
                                </Box>
                            </ListItem>
                        </Box>
                    ))}

                </List>

                <Box sx={footerBtnWrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Box sx={{ width: '350px' }}>
                        <Button onClick={() => {
                            if (productsInCart.length === 0) {
                                snackbar("You don't have products in cart");
                            } else {
                                navigate('/checkout');
                            }
                        }}
                            sx={{
                                color: 'black', "&:hover": {
                                    color: 'white'
                                }
                            }}
                        >Go To Checkout</Button>
                    </Box>

                    <Box sx={{ width: '150px', backgroundColor: '#ff7f7f', }}>
                        <Button onClick={() => {
                            if (productsInCart.length === 0) {
                                snackbar("You don't have products in cart");
                            } else {
                                removeFromCart(null);
                            }
                        }}
                            sx={{
                                color: 'black', "&:hover": {
                                    color: 'white'
                                }
                            }}
                        ><DeleteIcon /></Button>
                    </Box>
                </Box>
            </Box>
        ) : (
            <Box sx={{ width: 500, textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="body1">You don't have any products in your cart.</Typography>
            </Box>
        )
    );

    return (
        <>
            <div>
                <Box onClick={toggleDrawer} sx={{ '& > :not(style)': { m: 2 } }}>
                    <Fab
                        aria-label="add"
                        sx={{
                            width: '50px', height: '50px',
                            zIndex: '99',
                            color: mode === 'light' ? mainColor : white,
                            backgroundColor: mode === 'light' ? 'white' : 'black',
                            boxShadow: mode === 'light' ? boxShadowLight : boxShadowDark,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: mode === 'light' ? hoverBoxShadowLight : hoverBoxShadowDark,
                                backgroundColor: mode === 'light' ? 'white' : 'black',
                            },
                        }} >
                        <ShoppingCartIcon />
                    </Fab>
                </Box>
                <Drawer
                    anchor="right"
                    open={isOpen}
                    onClose={toggleDrawer}
                    transitionDuration={300}>
                    {list()}
                </Drawer>
            </div>
        </>
    );
}
