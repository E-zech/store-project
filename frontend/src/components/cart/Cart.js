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
import { useEffect, useState } from 'react';

export default function Cart({ add2Cart }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetch("http://localhost:5000/cart", {
            credentials: 'include',
            headers: { "Content-Type": "application/json", 'Authorization': localStorage.token }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                const tempStore = {};

                // Iterate over each item in the fetched data
                data.forEach(currentItem => {
                    // Check if the item with the current ID already exists in tempStore
                    if (tempStore[currentItem._id]) {
                        // If it exists, increment the quantity of the existing item
                        tempStore[currentItem._id].quantity += currentItem.quantity;
                    } else {
                        // If it doesn't exist, add the current item to tempStore
                        tempStore[currentItem._id] = { ...currentItem };
                    }
                });

                // Convert the tempStore object back to an array of cart items
                // This ensures that each item appears only once, with its quantity updated if necessary
                const organizedCartItems = Object.values(tempStore);

                // Update the state with the organized cart items
                setCartItems(organizedCartItems);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, [add2Cart]);

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
                            <ListItemButton>
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
