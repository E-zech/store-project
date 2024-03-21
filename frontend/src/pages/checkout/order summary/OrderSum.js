
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GeneralContext } from "../../../App";


export default function OrderSum() {
    const navigate = useNavigate();
    const { user, productsInCart, setProductsInCart, products, order, setOrder, snackbar, mode } = useContext(GeneralContext);
    console.log(order)
    console.log(order._id)
    return (
        <>
            <section
                style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>
                <h1 className='sec-title'>Thank you !</h1>

                <section style={{ width: '80vw', backgroundColor: '#80808040', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1>Your order has been placed </h1>
                    <h2>Your order number is: {order._id}  </h2>
                    <p>and some photo or icon</p>
                    <button onClick={() => { navigate('/') }}>Home Page</button>
                    <button onClick={() => { navigate('/my-orders') }}>My Orders</button>
                </section>
            </section>
        </>
    )
}


