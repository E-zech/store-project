import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { GeneralContext } from '../../App';
import { checkoutSturcture, schemaCheckout } from './checkoutStructure';

export default function AddressForm() {
    const { user } = useContext(GeneralContext);
    const [formData, setFormData] = useState(user);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);

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

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                {checkoutSturcture.map((field) => (
                    <Grid item xs={12} sm={6} key={field.name}>
                        <TextField
                            required={field.required}
                            id={field.name}
                            name={field.name}
                            label={field.label}
                            fullWidth
                            autoComplete={field.name}
                            variant="standard"
                            value={formData[field.name]}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            error={errors[field.name] ? true : false}
                            helperText={errors[field.name]}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
