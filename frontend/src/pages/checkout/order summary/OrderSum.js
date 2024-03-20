
import { useNavigate } from 'react-router-dom';

export default function OrderSum() {
    const navigate = useNavigate();

    return (
        <>
            <section
                style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>
                <h1 className='sec-title'>Thank you !</h1>

                <section style={{ width: '80vw', backgroundColor: '#80808040', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1>Your order has been placed </h1>
                    <h2>Your order number is X. </h2>
                    <p>and some photo or icon</p>
                    <button onClick={() => navigate('/')}>Home Page</button>
                </section>
            </section>
        </>
    )
}


