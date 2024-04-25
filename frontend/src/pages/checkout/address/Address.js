import React from 'react';
import { TextField, Button, Grid, Container, Typography, Tooltip, Checkbox, FormControlLabel, useRadioGroup } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { GeneralContext } from "../../../App";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { initialFormDataNoPassword, handleChange, useInputsFormColors } from '../../../utils/utils'
import { ClientStructureNoPassword, SchemaNoPassword } from '../../../components/FormValidation';


export default function Address({ errors, setErrors, setCurrentStep, handleSubmit }) {
    const { user, setUser, mode } = useContext(GeneralContext);
    const [formData, setFormData] = useState(initialFormDataNoPassword);
    const [isFormValid, setIsFormValid] = useState(false);
    const [updateDetails, setUpdateDetails] = useState(false);
    const [showAddressConfirmation, setShowAddressConfirmation] = useState(true);
    const { sx } = useInputsFormColors();


    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                email: user.email || '',
                city: user.city || '',
                street: user.street || '',
                houseNumber: user.houseNumber || 0,
                zip: user.zip || '',
                imgSrc: user.imgSrc || '',
                imgAlt: user.imgAlt || ''
            });
        }
    }, [user]);

    const handleAddress = (ev) => {
        handleChange(ev, formData, setFormData, errors, setErrors, SchemaNoPassword, setIsFormValid);
    };

    const handleYes = () => {
        setIsFormValid(true);
        setShowAddressConfirmation(false);
    }

    const handleNo = () => {
        setFormData(initialFormDataNoPassword);
        setShowAddressConfirmation(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingBottom: '100px'
                }}>

                <Avatar sx={{ m: 1, width: '100px', height: '100px', backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white' }} src={user?.imgSrc}>
                    <AssignmentIndIcon sx={{ width: '40px', height: '40px' }} />
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
                                    onChange={handleAddress}
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
    );
}

