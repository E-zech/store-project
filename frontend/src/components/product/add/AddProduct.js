import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from "../../../App.js";
import ProductComponent from '../ProductComponent.js';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Joi from 'joi';
import "./AddProduct.css";
import ResultNotFound from '../../../pages/ResultNotFound.js';
import MenuItem from '@mui/material/MenuItem';


const inputsForProducts = [
  { name: 'title', type: 'text', label: 'title', required: true },
  { name: 'description', type: 'textarea', label: 'description', required: true },
  { name: 'howToUse', type: 'textarea', label: 'how to use', required: true },
  { name: 'Ingredients', type: 'textarea', label: 'Ingredients', required: true },
  { name: 'price', type: 'number', label: 'price', required: true },
  { name: 'discount', type: 'number', label: 'discount', required: true },
  { name: 'imgUrl', type: 'text', label: 'Img Url', required: true },
  { name: 'imgAlt', type: 'text', label: 'Img Alt', required: true },
  { name: 'category', type: 'select', label: 'Category', required: true, options: ['Face', 'Eyes', 'Body', 'Hands', 'Feet'] },
];

export default function AddProduct() {
  const [allMyCards, setAllMyCards] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { filteredCards, setFilteredCards, snackbar, loader, setLoader } = useContext(GeneralContext);

  const schema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(10).max(900).required(),
    howToUse: Joi.string().min(10).max(900).required(),
    Ingredients: Joi.string().min(10).max(900).required(),
    price: Joi.number().required(),
    discount: Joi.number(),
    imgUrl: Joi.string().uri().allow(""),
    imgAlt: Joi.string().allow(""),
    category: Joi.string().valid('Face', 'Eyes', 'Body', 'Hands', 'Feet').required(),
  });

  useEffect(() => {
    setLoader(true);

    // maybe insert if theres localstorage.token and if not send alertt or somthing
    fetch(`http://localhost:5000/products`, {
      credentials: 'include',
      headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setAllMyCards(data);
      }).finally(() => setLoader(false))
  }, [filteredCards])

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setFormData({});
      setErrors({});
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

    const validate = schema.validate({ ...formData, [name]: value }, { abortEarly: false });
    const tempErrors = { ...errors };
    delete tempErrors[name];

    if (validate.error) {
      const item = validate.error.details.find(e => e.context.key == name);
      if (item) {
        tempErrors[name] = item.message;
      }
    };

    setIsFormValid(!validate.error);
    setErrors(tempErrors)
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

    fetch(`http://localhost:5000/products`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        setFormData(formData);
        setFilteredCards([...filteredCards, data]);
      }).finally(() => {
        toggleForm();
        snackbar('Product added');
      }).finally(() => setLoader(false))
  };

  const filteredMyCards = allMyCards.filter(card => {
    return filteredCards.some(filteredCard => filteredCard.id === card.id);
  });

  return (
    <>
      <header>
        <h1 className='main-title leftFix'>Products </h1> <br />
      </header>
      <section className="container-cards">
        {loader ? (
          <h1>Loading...</h1>
        ) : (
          <div className="grid-cards">
            {filteredMyCards.length > 0 ? (
              filteredMyCards.map(card => (
                <ProductComponent key={card.id} card={card} setAllCard={setFilteredCards} />))
            ) : (
              <ResultNotFound />
            )}
          </div>)}
      </section>
      <a href="#addCard" className='addCardBtn'>  <Button
        variant="contained"
        color={isFormVisible ? 'secondary' : 'primary'}
        onClick={toggleForm}
        sx={{ backgroundColor: 'indigo', '&:hover': { backgroundColor: '#7e30b7' } }}>
        {isFormVisible ? 'Close' : 'Add Product'}
      </Button>
      </a> <br />
      <>
        <section className='form-container' id='addCard'>
          {isFormVisible && (
            <Container component="main" maxWidth="xs"  >
              <CssBaseline />

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography component="h1" variant="h5">
                  Add Product
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
                    Add Product
                  </Button>

                </Box>
              </Box>
            </Container>
          )}
        </section>
      </>
    </>
  );
}
