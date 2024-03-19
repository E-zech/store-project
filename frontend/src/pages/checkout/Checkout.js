import { useEffect, useState, useContext } from 'react';
import { GeneralContext } from "../../App";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Checkbox, Divider, Tooltip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { ClientStructureNoPassword, PaymentStructure, SchemaNoPassword, SchemaPayment } from '../../components/FormValidation';
import { initialFormDataNoPassword, initialPayment, handleChange, useInputsFormColors } from '../../utils/utils'
import { gray, selectColor } from '../../css/Main.style';



export default function Checkout() {
    const [formData, setFormData] = useState(initialFormDataNoPassword);
    const [formPayment, setFormPayment] = useState(initialPayment);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormPaymentValid, setIsFormPaymentValid] = useState(false);
    const navigate = useNavigate();
    const { sx } = useInputsFormColors();
    const { user, setUser, productsInCart, snackbar, setLoader, mode } = useContext(GeneralContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [showAddressConfirmation, setShowAddressConfirmation] = useState(true);

    const [isCheck, setIsCheck] = useState(false);
    const fullAddress = `${user?.houseNumber} ${user?.street}, ${user?.city}, ${user?.zip}`;

    console.log(productsInCart)

    useEffect(() => {
        // Check if the user object exists and has data
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                email: user.email || '',
                city: user.city || '',
                street: user.street || '',
                houseNumber: user.houseNumber || 0,
                zip: user.zip || ''
            });
        }
    }, [user]);// fix !! if no user then no page ! but also takes time for user to accumalte in the app.js

    const handleCheckoutChange = (ev) => {
        handleChange(ev, formData, setFormData, errors, setErrors, SchemaNoPassword, setIsFormValid);
    };

    const handlePayment = (ev) => {
        handleChange(ev, formPayment, setFormPayment, errors, setErrors, SchemaPayment, setIsFormPaymentValid);
    };

    const placeOrder = () => {
        // navigate('/');
        setCurrentStep(currentStep => currentStep + 1);
        snackbar("Thank you for your purchase");
    }
    const handleSubmit = ev => {
        ev.preventDefault();


        const obj = {};
        const elements = ev.target.elements;

        ClientStructureNoPassword.forEach((s) => {
            obj[s.name] = elements[s.name].value;
        });
        setLoader(true);

        fetch(`http://localhost:5000/users/${user._id}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'Authorization': localStorage.token },
            body: JSON.stringify(obj),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update user data in the context
                setUser(data);
                setLoader(false);
                snackbar("Update successful");
            })
            .catch(error => {
                console.error('Error updating user:', error);
                setLoader(false);
                // Handle error
            });
    }

    const handleYes = () => {
        setIsFormValid(true);
        console.log("yes")
        setShowAddressConfirmation(false);

    }

    const handleNo = () => {
        setFormData(initialFormDataNoPassword);
        console.log("no")
        setShowAddressConfirmation(false);
    }


    return (
        <>
            <h1 className='main-title'>CHEKOUT</h1>
            {// Address
                currentStep === 1 &&
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>

                        <Avatar sx={{ m: 1, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white' }}>
                            <AssignmentIndIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">Address</Typography>
                        {showAddressConfirmation && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '5px',
                                margin: "0 auto"
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <p style={{ marginBottom: '10px' }}>Is this your current details?</p>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>

                                        <Tooltip title="Keep details" arrow >
                                            <Button onClick={handleYes} sx={{ color: 'black' }}>Yes</Button>
                                        </Tooltip>

                                        <Tooltip title="Clear details" arrow >
                                            <Button onClick={handleNo} sx={{ color: 'black' }} >No</Button>
                                        </Tooltip>
                                    </div>

                                </div>

                            </div>
                        )}
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                            <Grid container spacing={2}>
                                {ClientStructureNoPassword.map(s =>
                                    <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                                        <TextField
                                            margin="normal"
                                            required={s.required}
                                            fullWidth
                                            id={s.name}
                                            label={s.label}
                                            name={s.name}
                                            type={s.type}
                                            autoComplete={s.name}
                                            error={Boolean(errors[s.name])}
                                            helperText={errors[s.name]}
                                            onChange={handleCheckoutChange}
                                            value={formData[s.name]}
                                            InputLabelProps={{ shrink: true }}
                                            inputProps={{ min: 0 }}
                                            sx={sx}
                                        />
                                    </Grid>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!isFormValid}
                                    onClick={() => setCurrentStep(currentStep => currentStep + 1)}
                                    sx={{
                                        mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                        }
                                    }}>
                                    Next
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            }

            {// Payment
                currentStep === 2 &&
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>

                        <Avatar sx={{ m: 1, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white' }}>
                            <AssignmentIndIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">Payment</Typography>

                        <Box component="form" noValidate sx={{ mt: 1 }}>

                            <Grid container spacing={2}>

                                {PaymentStructure.map(s =>
                                    <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                                        <TextField
                                            margin="normal"
                                            required={s.required}
                                            fullWidth
                                            id={s.name}
                                            label={s.label}
                                            name={s.name}
                                            type={s.type}
                                            autoComplete="off"
                                            error={Boolean(errors[s.name])}
                                            helperText={errors[s.name]}
                                            onChange={handlePayment}
                                            value={formPayment[s.name]}
                                            InputLabelProps={{ shrink: true }}
                                            sx={sx}
                                        />
                                    </Grid>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!isFormPaymentValid}
                                    onClick={() => setCurrentStep(currentStep => currentStep + 1)}
                                    sx={{
                                        mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                        }
                                    }}>
                                    Next
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={() => setCurrentStep(currentStep => Math.max(currentStep - 1, 1))}
                                    sx={{
                                        mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                        '&:hover': {
                                            backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                        }
                                    }}>
                                    Back
                                </Button>

                            </Grid>

                        </Box>
                    </Box>
                </Container>
            }
            {console.log(formPayment)}
            {// Review
                currentStep === 3 &&
                <section
                    style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>
                    <h1 className='sec-title'>review</h1>

                    <section style={{ width: '80vw', backgroundColor: '#80808040', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {productsInCart.map((p) => ( // products part
                            <Box
                                onClick={(e) => e.stopPropagation()}
                                key={p._id}
                                sx={{
                                    width: '80vw',
                                    display: 'flex',
                                    justifyContent: 'sapce-between',
                                    alignItems: 'center',

                                }}
                            >
                                <ListItem>
                                    <ListItemText primary={p.title} />
                                    <ListItemText primary={p.quantity} />
                                    <ListItemText primary={`Total Price: ${p.price * p.quantity}`} /> {/* Calculate total price */}
                                    <ListItemIcon>
                                        <img src={p.imgUrl} alt={p.imgAlt} style={{ width: '50px', height: '50px' }} />
                                    </ListItemIcon>
                                </ListItem>
                            </Box>
                        ))}

                        <hr className='hr' />

                        <Box //address part
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '1rem', color: 'black', }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Address Details: </Typography>
                            <Box >
                                <Typography > {user.firstName + ' ' + user.lastName} </Typography>
                                <Typography>{fullAddress}</Typography>
                            </Box>
                        </Box>

                        <hr className='hr' />
                        <Box //payment part
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '1rem', color: 'black', }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Payment Details: </Typography>
                            <Box >
                                <Typography>Name On Card: {formPayment.nameOnCard}</Typography>
                                <Typography>Card Number:XXXX-XXXX-XXXX-{formPayment.cardNumber.slice(-4)}</Typography>
                                <Typography>
                                    Expiry Date: {formPayment.expiryDate}
                                </Typography>
                            </Box>
                        </Box>
                    </section>


                    <Grid item xs={12} sm={12}>
                        <Button
                            onClick={placeOrder}
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                '&:hover': {
                                    backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                }
                            }}>
                            Place Order
                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => setCurrentStep(currentStep => Math.max(currentStep - 1, 1))}
                            sx={{
                                mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                '&:hover': {
                                    backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                }
                            }}>
                            Back
                        </Button>
                    </Grid>


                </section >
            }
            {
                currentStep === 4 &&
                <>
                    <section
                        style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>
                        <h1 className='sec-title'>Thank you !</h1>

                        <section style={{ width: '80vw', backgroundColor: '#80808040', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <h1>Your order has been placed </h1>
                            <h2>Your order number is (maybe order._id). </h2>
                            <p>and some photo or icon</p>
                            <button onClick={() => navigate('/')}>Home Page</button>
                        </section>
                    </section>
                </>
            }
        </>
    )
}