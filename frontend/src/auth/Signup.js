import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { GeneralContext } from '../App';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { schema, clientStructure } from '../components/FormValidation';
import { useInputsFormColors } from '../utils/utils'

export const defaultTheme = createTheme();

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { setLoader, snackbar, mode } = useContext(GeneralContext);
  const { sx } = useInputsFormColors();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);

    const validate = schema.validate(obj, { abortEarly: false });
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
    ev.preventDefault();

    const obj = {};
    const elements = ev.target.elements;

    clientStructure.forEach((s) => {
      if (s.type === 'boolean') {
        obj[s.name] = elements[s.name].checked;
      } else {
        obj[s.name] = elements[s.name].value;
      }
    });

    setLoader(true);

    fetch(`http://localhost:5000/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            snackbar(x);
            throw new Error(x);
          });
        }
      })
      .then(() => {
        navigate('/login');
        snackbar("Sign-up successful");
      })
      .catch((err) => snackbar(err.message))
      .finally(() => setLoader(false));
  };

  return (
    <>
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

          <Typography component="h1" variant="h5">Sign Up</Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <Grid container spacing={2}>
              {clientStructure.map(s =>
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
                      autoComplete={s.name}
                      error={Boolean(errors[s.name])}
                      helperText={errors[s.name]}
                      onChange={handleChange}
                      value={formData[s.name]}
                      sx={sx} />}
                </Grid>)}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid}
              sx={{
                mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                }
              }}>
              Signup
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  sx={{ color: mode === 'dark' ? 'white' : 'black' }}
                  onClick={() => navigate('/login')}>
                  Already have an account? Sign In
                </Button>

              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </>
  );
}

