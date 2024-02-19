import { useEffect, useState, useContext } from 'react';
import { GeneralContext } from "../../App";
import { useNavigate } from 'react-router-dom';
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from "@mui/material/IconButton";
import { CartContext } from '../../pages/AllProducts';
import { Button, Typography } from '@mui/material';


export default function Checkout() {
    const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader } = useContext(GeneralContext);

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    return (
        <>
            <section>
                {productsInCart.map((p) => (
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
                            <ListItemText primary={`Total Price: ${p.price * p.quantity}`} /> {/* Calculate total price */}
                            <ListItemIcon>
                                <img src={p.imgUrl} alt={p.imgAlt} style={{ width: '50px', height: '50px' }} />
                            </ListItemIcon>
                        </ListItem>
                    </Box>
                ))}
            </section>
        </>
    )
}


