import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from "../../../App";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import { inputsForProducts, schema } from '../ProductStructureValid.js';
import Joi from 'joi';


export default function AddOrEditProduct() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { filteredProducts, setFilteredProducts, snackbar, loader, setLoader } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/products/${id}`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const filterData = {};
                inputsForProducts.forEach(({ name }) => {
                    filterData[name] = data[name];
                })
                setFormData(filterData);

            }).finally(() => {
                setLoader(false);
            })
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        const validate = schema.validate({ ...formData, [name]: value }, { abortEarly: false });
        const tempErrors = { ...errors };
        delete tempErrors[name];

        if (validate.error) {
            const item = validate.error.details.find(e => e.context.key === name);
            if (item) {
                tempErrors[name] = item.message;
            }
        }

        setIsFormValid(!validate.error);
        setErrors(tempErrors);

    };


    const handleSubmit = (ev) => {
        ev.preventDefault();
        setLoader(true);
        const obj = {};
        const elements = ev.target.elements;

        inputsForProducts.forEach((s) => {
            if (s.type === 'boolean') {
                obj[s.name] = elements[s.name].checked;
            } else {
                obj[s.name] = elements[s.name].value;
            }
        });

        const url = id ? `http://localhost:5000/products/${id}` : `http://localhost:5000/products`;
        const methood = id ? 'PUT' : 'POST';

        fetch(url, {
            credentials: 'include',
            method: methood,
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                setFormData(formData);
                setFilteredProducts([...filteredProducts, data]);

            }).finally(() => {
                navigate('/product-management');
                snackbar(id ? 'product change sucssefuly' : 'product added');
            }).finally(() => setLoader(false))
    };

    return (
        <>
            <>
                <section className='form-container' id='addCard'>
                    <Container component="main" maxWidth="xs"  >
                        <CssBaseline />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Typography component="h1" variant="h5">
                                {id ? `Edit Product` : `Add product`}
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <Grid container spacing={2}>
                                    {inputsForProducts.map((i) => (
                                        <Grid key={i.name} item xs={12}>
                                            {i.type === 'textarea' ? (
                                                <TextField
                                                    margin="normal"
                                                    required={i.required}
                                                    fullWidth
                                                    id={i.name}
                                                    label={i.label}
                                                    name={i.name}
                                                    multiline
                                                    rows={4} // Adjust the number of rows as needed
                                                    value={formData[i.name] || ''}
                                                    onChange={handleChange}
                                                    error={Boolean(errors[i.name])}
                                                    helperText={errors[i.name]}
                                                    autoComplete="off"
                                                />
                                            ) : i.type === 'select' ? (
                                                <TextField
                                                    select
                                                    margin="normal"
                                                    required={i.required}
                                                    fullWidth
                                                    id={i.name}
                                                    label={i.label}
                                                    name={i.name}
                                                    value={formData[i.name] || ''}
                                                    onChange={handleChange}
                                                    error={Boolean(errors[i.name])}
                                                    helperText={errors[i.name]}
                                                >
                                                    {i.options.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            ) : (
                                                <TextField
                                                    margin="normal"
                                                    required={i.required}
                                                    fullWidth
                                                    id={i.name}
                                                    label={i.label}
                                                    name={i.name}
                                                    type={i.type}
                                                    value={formData[i.name] || ''}
                                                    onChange={handleChange}
                                                    error={Boolean(errors[i.name])}
                                                    helperText={errors[i.name]}
                                                    autoComplete="off"
                                                />
                                            )}
                                        </Grid>))
                                    }
                                </Grid>

                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'indigo', '&:hover': { backgroundColor: '#7e30b7' } }}
                                    disabled={!isFormValid}>
                                    {id ? `Edit Product` : `Add product`}
                                </Button>

                            </Box>
                        </Box>
                    </Container>

                </section>
            </>
        </>
    );
}


