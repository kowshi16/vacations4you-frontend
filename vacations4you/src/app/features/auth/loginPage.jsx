import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import loginImg from '../../../images/login.jpg';
import Logo from "../../../images/landingPage/vacations4ULogo.png";
import { Image } from "../landingPage/landingPageComponents/customComponents/Image";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginAPI } from '../../../api/auth';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const initialValues = {
        email: "",
        password: "",
    };
    const [showAlert, setShowAlert] = useState({
        status: false,
        label: "",
        type: ""
    });
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal } = state;

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLogin = (values) => {
        loginAPI(values)
            .then((res) => {
                console.log("Login :", res);
                setShowAlert({ ...showAlert, status: true, label: "Log in successfull !", type: "success" });
                setTimeout(() => {
                    window.location.replace("/cruise");
                }, 3000);

            })
            .catch((error) => {
                console.log("Error >>>>>>>>>>>", error);
                setShowAlert({ ...showAlert, status: true, label: error?.response?.data?.message, type: "error" });
                setTimeout(() => {
                    typeof window !== undefined && window.location.reload()
                }, 3000);
            });
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            {showAlert.status === true && (
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={showAlert.status}
                    key={vertical + horizontal}
                >
                    <Alert variant="filled" severity={showAlert.type}>
                        {showAlert.label}
                    </Alert>
                </Snackbar>
            )}

            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image as="a" href="/" className="md:h-40 h-36" image={Logo} alt="Logo" />
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box sx={{ mt: 1, width: '90%' }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={yup.object({
                                email: yup
                                    .string()
                                    .matches(
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        'Invalid Email'
                                    )
                                    .required('Please enter Email'),
                                password: yup.string().required('Please enter Password'),
                            })}
                            onSubmit={(values) => {
                                handleLogin(values);
                                //console.log('Form Values:', values);
                                //window.location.replace("/cruise");
                            }}
                        >
                            {({ errors, touched, dirty }) => (
                                <Form>
                                    <div>
                                        <div>
                                            <div>
                                                <Field
                                                    as={TextField}
                                                    name="email"
                                                    label="Email Address"
                                                    id="email"
                                                    type="email"
                                                    size="small"
                                                    fullWidth
                                                    error={Boolean(errors.email) && touched.email}
                                                    helperText={touched.email && errors.email}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='mt-3'>
                                                <Field
                                                    as={TextField}
                                                    name="password"
                                                    id="password"
                                                    fullWidth
                                                    type={showPassword ? 'text' : 'password'}
                                                    size="small"
                                                    label="Password"
                                                    error={Boolean(errors.password) && touched.password}
                                                    helperText={touched.password && errors.password}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    edge="end"
                                                                    sx={{ color: '#0645A0' }}
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Button
                                                    disabled={!dirty}
                                                    sx={{
                                                        width: '100%',
                                                        backgroundColor: '#0645A0',
                                                        marginTop: 2,
                                                        fontWeight: 600,
                                                        borderRadius: '5px',
                                                        '&:hover': {
                                                            backgroundColor: '#F3F4F6',
                                                            color: 'black',
                                                        },
                                                    }}
                                                    variant="contained"
                                                    type="submit"
                                                >
                                                    Login
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                sx={{
                    backgroundImage: `url(${loginImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
};

export default LoginPage;
