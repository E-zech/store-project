import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
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


export default function Cart({ add2Cart }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const { snackbar } = useContext(GeneralContext);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetch("http://localhost:5000/cart", {
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
                console.log(data)
                setCartItems(data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, [add2Cart]);

    const removeFromCart = (productId) => {
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
                setCartItems(cartItems.filter(p => p._id !== productId));
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    };



    const list = () => (
        <Box // the big div 
            sx={{
                width: 500,
                backgroundColor: 'blue',
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
                    gap: '10px',
                    padding: '10px',
                    backgroundColor: '#dcdcdc',
                }}

            >
                {cartItems.map((p) => (
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        key={p._id}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: 'red',
                            backgroundColor: 'greenyellow',
                        }}
                    >
                        <ListItem>
                            <ListItemText primary={p.title} />
                            <ListItemText primary={p.price} />
                            <ListItemText primary={p.quantity} />
                            <ListItemIcon>
                                <img src={p.imgUrl} alt={p.imgAlt} style={{ width: '50px', height: '50px' }} />
                            </ListItemIcon>
                            <ListItemButton onClick={() => removeFromCart(p._id)}>
                                <RemoveShoppingCartIcon />
                            </ListItemButton>
                        </ListItem>
                    </Box>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <div>
                <Box onClick={toggleDrawer} sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="add">
                        <ShoppingCartIcon />
                    </Fab>
                </Box>


                <Drawer
                    anchor="right"
                    open={isOpen}
                    onClose={toggleDrawer}>
                    {list()}
                </Drawer>
            </div>
        </>
    );
}
