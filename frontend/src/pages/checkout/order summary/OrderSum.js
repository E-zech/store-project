
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GeneralContext } from "../../../App";
import { mainColor } from '../../../css/Main.style';
import { Button, Grid } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';


export default function OrderSum() {
    const navigate = useNavigate();
    const { user, productsInCart, setProductsInCart, products, order, setOrder, snackbar, mode } = useContext(GeneralContext);
    console.log(order)
    console.log(order._id)
    return (
        <>
            <section
                style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>


                <section style={{ width: '80vw', backgroundColor: 'white', display: 'grid', gridTemplateColumns: '1fr', gap: '15px', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>


                    <div style={{ backgroundColor: mainColor, gap: '5px', fontSize: '1.3rem', padding: '10px', borderRadius: '17px ', textAlign: 'center' }}>
                        <h2 >Your order has been placed </h2>
                        <br />
                        <div > <span style={{ fontWeight: 'bold' }}>Your order number is:</span>  {order._id}</div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            Thank you for your purchase
                            <SentimentSatisfiedAltIcon style={{ marginLeft: '5px' }} />
                        </div>
                    </div>


                    <Grid item xs={6} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={() => { navigate('/') }} variant="contained" sx={{ width: "45%", mt: 3, mb: 1, p: 1, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white', '&:hover': { backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2' } }}> Home Page</Button>

                        <Button type="submit" variant="contained" onClick={() => { navigate('/my-orders') }} sx={{ width: "45%", mt: 3, mb: 1, p: 1, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white', '&:hover': { backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2' } }}>My Orders</Button>
                    </Grid>

                </section>
            </section>
        </>
    )
}


