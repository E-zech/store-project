import { useEffect, useState, useContext } from 'react';
import { GeneralContext } from "../../App";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { checkoutSturcture, schemaCheckout } from './checkoutStructure'
import { useInputsFormColors } from '../../utils/utils'


export default function Checkout() {
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader, mode } = useContext(GeneralContext);

    const { sx } = useInputsFormColors();
    const [formData, setFormData] = useState(user || {});
    const [currentStep, setCurrentStep] = useState(1);



    const handleChange = (ev) => {
        const { name, value } = ev.target;
        const obj = { ...formData, [name]: value };
        setFormData(obj);

        const validate = schemaCheckout.validate(obj, { abortEarly: false });
        const tempErrors = { ...errors };
        delete tempErrors[name];

        if (validate.error) {
            const item = validate.error.details.find((e) => e.context.key === name);
            if (item) {
                tempErrors[name] = item.message;
            }
        }
        if (name in tempErrors && value === "") {
            delete tempErrors[name];
        }

        setErrors(tempErrors);

        const formIsValid = Object.keys(tempErrors).length === 0 &&
            Object.values(obj).every((value) => {
                return value !== "";
            });
        setIsFormValid(formIsValid);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault(); // Prevent the default form submission behavior

        setCurrentStep(currentStep => currentStep + 1);

        // const obj = {};
        // const elements = ev.target.elements;

        // checkoutSturcture.forEach((s) => {
        //     if (s.type === 'boolean') {
        //         obj[s.name] = elements[s.name].checked;
        //     } else {
        //         obj[s.name] = elements[s.name].value;
        //     }
        // });
        // fetch(`http://localhost:5000/users/${user._id}1`, {
        //     credentials: 'include',
        //     method: 'PUT',
        //     headers: { 'Content-type': 'application/json', 'Authorization': localStorage.token },
        //     body: JSON.stringify(obj),
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         console.error('There was a problem with the fetch operation:', error);
        //     });
    };

    return (
        <>
            <h1 className='main-title'>CHEKOUT</h1>
            {
                currentStep === 1 && <Container component="main" maxWidth="xs">
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

                        <Typography component="h1" variant="h5">Address</Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                            <Grid container spacing={2}>
                                {checkoutSturcture.map(s =>
                                    <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                                        {s.type === 'boolean' ?
                                            <FormControlLabel
                                                control={<Switch color="primary" name={s.name} />}
                                                label={s.label}
                                                labelPlacement="start"
                                            /> :
                                            <TextField
                                                margin="normal"
                                                required={s.required}
                                                fullWidth
                                                id={s.name}
                                                label={s.label}
                                                name={s.name}
                                                type={s.type}
                                                // autoComplete={s.name}
                                                // error={Boolean(errors[s.name])}
                                                // helperText={errors[s.name]}
                                                // onChange={handleChange}
                                                // value={formData[s.name]}
                                                sx={sx} />}
                                    </Grid>)}
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    // disabled={!isFormValid}
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

            {
                currentStep === 2 && <Container component="main" maxWidth="xs">
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

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        label="Name On Card"
                                        sx={sx} />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        label="Card Number"
                                        sx={sx} />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        label="Expiry Date"
                                        sx={sx} />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        label="CVV"
                                        sx={sx} />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    // disabled={!isFormValid}
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
                                    // disabled={!isFormValid}
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

            {
                currentStep === 3 && <section style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>
                    <h1 className='sec-title'>review</h1>
                    {productsInCart.map((p) => (
                        <Box
                            onClick={(e) => e.stopPropagation()}
                            key={p._id}
                            sx={{
                                width: '80vw',
                                display: 'flex',
                                justifyContent: 'sapce-between',
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


                    <Grid item xs={12} sm={12}>
                        <Button
                            type="submit"
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
                            // disabled={!isFormValid}\
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


                </section>
            }

        </>
    )
}