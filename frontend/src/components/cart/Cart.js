import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Fab from '@mui/material/Fab';
import { useEffect, useState, useContext } from 'react';
import { GeneralContext } from "../../App";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from "@mui/material/IconButton";
import { CartContext } from '../../pages/AllProducts';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader, mode } = useContext(GeneralContext);
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
                console.log(data);
                setProductsInCart(data);
            })
            .catch(error => {
                console.error('Error saving changes:', error);
            })
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        saveChanges();

    };

    const removeFromCart = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
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

    };

    const list = () => (
        <Box // the big div 
            sx={{
                width: 500,
            }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List // the wrapper div of the items
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

            >
                {productsInCart.map((p) => (
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        key={p._id}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            backgroundColor: 'black',
                            textAlign: 'center'
                        }}
                    >
                        <ListItem>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                color: 'white',
                                backgroundColor: 'black',
                                textAlign: 'center'
                            }}>
                                <ListItemIcon>
                                    <img src={p.imgUrl} alt={p.imgAlt} style={{ width: '60px', height: '60px', borderRadius: '15px' }} />
                                </ListItemIcon>
                                <ListItemText primary={p.title} />
                            </Box>

                            <Box sx={{
                                width: '100px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '5px',
                                textAlign: 'center'
                            }}>
                                <IconButton aria-label="Add quantity" onClick={() => incrementQuantity(p._id, p.price)} sx={{
                                    color: 'white',
                                    backgroundColor: 'black',
                                }}>
                                    <AddIcon />
                                </IconButton>
                                <span>{p.quantity}</span>
                                <IconButton aria-label="Decrease quantity" onClick={() => decrementQuantity(p._id, p.price)}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'black',
                                    }}
                                >
                                    <RemoveIcon />
                                </IconButton>
                            </Box>

                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '5px',
                                marginLeft: '5px',
                                textAlign: 'center'
                            }}>

                                <ListItemText primary={`Total: ${parseFloat(((p.price * p.quantity) * 100) / 100).toFixed(2)}`} />

                                <ListItemButton onClick={() => removeFromCart(p._id)}>
                                    <RemoveShoppingCartIcon />
                                </ListItemButton>

                            </Box>


                        </ListItem>
                    </Box>
                ))}

            </List>

            <Box sx={{ backgroundColor: 'black', color: 'white', textAlign: 'center', position: "absolute", bottom: '0px', width: '100%' }}>

                <Button onClick={() => navigate('/checkout')}>Go To Checkout</Button>

            </Box>
        </Box>

    );


    return (
        <>
            <div>
                <Box onClick={toggleDrawer} sx={{ '& > :not(style)': { m: 2 } }}>
                    <Fab
                        aria-label="add"
                        sx={{
                            width: '50px',
                            height: '50px',
                            color: mode === 'light' ? '#99c8c2' : '#fff',
                            backgroundColor: mode === 'light' ? '#fff' : '#000',
                            boxShadow: mode === 'light' ? '0px 0px 0px 5px #99c8c2, 0px 0px 9px 1px #99c8c2, 0px 0px 0px 7px #99c8c2' : '0px 0px 0px 5px #fff, 0px 0px 9px 1px #fff, 0px 0px 0px 7px #fff',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: mode === 'light' ? '0px 0px 0px 6px #99c8c2, 0px 0px 10px 2px #99c8c2, 0px 0px 0px 8px #99c8c2' : '0px 0px 0px 6px #fff, 0px 0px 10px 2px #fff, 0px 0px 0px 8px #fff',
                            },
                        }}
                    >
                        <ShoppingCartIcon />
                    </Fab>
                </Box>


                <Drawer
                    anchor="right"
                    open={isOpen}
                    onClose={toggleDrawer}
                    transitionDuration={300}
                >
                    {list()}
                </Drawer>
            </div>
        </>
    );
}
