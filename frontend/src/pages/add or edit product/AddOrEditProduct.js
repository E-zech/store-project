import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from "../../App.js";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import { inputsForProducts, schema } from '../../components/product component/ProductStructureValid.js.js';
import Joi from 'joi';
import { Tooltip } from '@mui/material';
import './AddOrEditProduct.css'
import { useInputsFormColors } from '../../utils/utils.js'



export default function AddOrEditProduct() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { filteredProducts, setFilteredProducts, snackbar, loader, setLoader, mode } = useContext(GeneralContext);
    const { sx } = useInputsFormColors();

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
                if (id) {
                    // If it's an edit, find the index of the edited product in filteredProducts array
                    const index = filteredProducts.findIndex(product => product._id === data._id);

                    if (index !== -1) {
                        // If the product exists in filteredProducts, replace it with the edited product
                        const updatedProducts = [...filteredProducts];
                        updatedProducts[index] = data;
                        setFilteredProducts(updatedProducts);
                    } else {
                        // If the product doesn't exist in filteredProducts, add it
                        setFilteredProducts([...filteredProducts, data]);
                    }
                } else {
                    // If it's an addition, add the new product to filteredProducts
                    setFilteredProducts([...filteredProducts, data]);
                }
                navigate('/product-management');
                snackbar(id ? 'Product changed successfully' : 'Product added');
            }).finally(() => setLoader(false))

    };

    return (
        <>
            <>
                {
                    id && <div className='edit-imgContainer'>
                        <img className="edit-img" src={formData.imgUrl} alt={formData.imgAlt} />
                    </div>
                }

                <section className='form-container' id='addCard'>
                    <Container component="main" maxWidth="sm"  >
                        <CssBaseline />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Typography component="h1" variant="h5">
                                {id ? `Edit Product` : `Add product`}
                            </Typography>

                            <>
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
                                                        sx={sx}
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
                                                        sx={sx}
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
                                                        type={i.type === 'number' ? 'number' : i.type}
                                                        InputProps={i.name === 'price' || i.name === 'discount' ? { inputProps: { min: 0 } } : undefined}
                                                        value={formData[i.name] || ''}
                                                        onChange={handleChange}
                                                        error={Boolean(errors[i.name])}
                                                        helperText={errors[i.name]}
                                                        autoComplete="off"
                                                        sx={sx}
                                                    />
                                                )}
                                            </Grid>))
                                        }
                                    </Grid>
                                    <Tooltip title="Save and Back to Product Management" arrow>
                                        <Button type="submit" fullWidth variant="contained" sx={{
                                            mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                            '&:hover': {
                                                backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                            }
                                        }}
                                            disabled={!isFormValid}>
                                            {id ? `Edit Product` : `Add product`}
                                        </Button>
                                    </Tooltip>



                                    <Tooltip title="Back to Product Management " arrow>
                                        <Button type="button" fullWidth variant="contained" sx={{
                                            mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                            '&:hover': {
                                                backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                            }
                                        }}
                                            onClick={() => navigate('/product-management')}
                                            disabled={isFormValid}
                                        >
                                            Back to management
                                        </Button>
                                    </Tooltip>


                                </Box>
                            </>

                        </Box>
                    </Container>

                </section>
            </>
        </>
    );
}

