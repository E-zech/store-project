import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GeneralContext } from '../App';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { clientStructure } from '../components/FormValidation';
import { useInputsFormColors } from '../utils/utils'


export default function Account() {
    const navigate = useNavigate();
    const { user, setUser, setLoader, snackbar, mode } = useContext(GeneralContext);
    const { sx } = useInputsFormColors();


    const handleSubmit = ev => {
        ev.preventDefault();
        const obj = {};
        const elements = ev.target.elements;

        clientStructure.filter(s => !s.initialOnly).forEach(s => {
            if (s.type === 'boolean') {
                obj[s.name] = elements[s.name].checked;
            } else {
                obj[s.name] = elements[s.name].value;
            }
        });

        setLoader(true);

        fetch(`http://localhost:5000/users/${user._id}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'Authorization': localStorage.token },
            body: JSON.stringify(obj),
        })
            .then(() => {
                setLoader(false);
                snackbar("Update successful");
            }).finally(() => {
                navigate('/');
            })
    };
    return (
        <>
            {user ?
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white' }} src={user.imgUrl} alt="User Avatar" />
                        <Typography component="h1" variant="h5">Edit Details</Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                {
                                    clientStructure.filter(s => !s.initialOnly).map(s =>
                                        <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                                            {
                                                s.type === 'boolean' ?
                                                    <FormControlLabel
                                                        control={<Switch color="primary" name={s.name} checked={user[s.name]} />}
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
                                                        value={user[s.name]}
                                                        onChange={ev => setUser({ ...user, [s.name]: ev.target.value })}
                                                        sx={sx}
                                                    />
                                            }
                                        </Grid>
                                    )
                                }
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3, mb: 2, backgroundColor: mode === 'dark' ? 'black' : '#99c8c2', color: 'white',
                                    '&:hover': {
                                        backgroundColor: mode === 'dark' ? 'gray' : '#99c8c2',
                                    }
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Container> : ''
            }
        </>
    );
}