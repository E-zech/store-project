
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../../App';
import { Box } from '@mui/material';


const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
    const { user, productsInCart } = useContext(GeneralContext);
    const totalPrice = productsInCart.reduce((acc, product) => acc + product.price, 0);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding >
                {productsInCart.map((product) => (
                    <><Box sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <ListItem>
                            <img src={product.imgUrl} alt={product.imgAlt} style={{ width: '60px', height: '60px', borderRadius: '15px' }} />
                        </ListItem>
                        <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={product.title} secondary={product.desc} />
                            <Typography variant="body2">{product.price}</Typography>
                        </ListItem>
                    </Box>

                    </>

                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {totalPrice}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}