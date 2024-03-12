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
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { listStyle, boxStyle, counterWrapper, counterBtn, footerBtnWrapper, colorLight, colorDark, boxShadowLight, boxShadowDark, hoverBoxShadowLight, hoverBoxShadowDark } from './Cart.style'
import { mainColor, white } from '../../css/Main.style';

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

    const removeAllFromCart = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
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
    };

    const list = () => (
        <Box // the big div 
            sx={{ width: 500 }}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={toggleDrawer}
        >
            <List // the wrapper div of the items
                sx={listStyle}>
                {productsInCart.map((p) => (
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        key={p._id}
                        sx={boxStyle}>

                        <ListItem>
                            <Box sx={boxStyle}>
                                <ListItemIcon>
                                    <img src={p.imgUrl} alt={p.imgAlt} style={{ width: '60px', height: '60px', borderRadius: '15px' }} />
                                </ListItemIcon>
                                <ListItemText primary={p.title} />
                            </Box>

                            <Box sx={counterWrapper}>
                                <IconButton aria-label="Add quantity" onClick={() => incrementQuantity(p._id, p.price)} sx={counterBtn}>
                                    <AddIcon />
                                </IconButton>
                                <span>{p.quantity}</span>
                                <IconButton aria-label="Decrease quantity" onClick={() => decrementQuantity(p._id, p.price)}
                                    sx={counterBtn}>

                                    <RemoveIcon />
                                </IconButton>
                            </Box>

                            <Box sx={boxStyle}>
                                <ListItemText primary={`Total: ${parseFloat((((p.price - p.discount) * p.quantity) * 100) / 100).toFixed(2)}`} />

                                <ListItemButton onClick={() => removeFromCart(p._id)}>
                                    <RemoveShoppingCartIcon />
                                </ListItemButton>
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
                    }}>Go To Checkout</Button>
                </Box>

                <Box sx={{ width: '150px', backgroundColor: 'blue' }}>
                    <Button onClick={() => {
                        if (productsInCart.length === 0) {
                            snackbar("You don't have products in cart");
                        } else {
                            removeAllFromCart();
                        }
                    }}><DeleteIcon /></Button>
                </Box>
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
                            width: '50px', height: '50px',
                            color: mode === 'light' ? mainColor : white,
                            backgroundColor: mode === 'light' ? 'white' : 'black',
                            boxShadow: mode === 'light' ? boxShadowLight : boxShadowDark,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: mode === 'light' ? hoverBoxShadowLight : hoverBoxShadowDark,
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
