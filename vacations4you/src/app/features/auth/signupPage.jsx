import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import signupImg from '../../../images/signup.jpg';
import { useNavigate } from 'react-router-dom';
import Logo from "../../../images/landingPage/vacations4ULogo.png";
import { Image } from "../landingPage/landingPageComponents/customComponents/Image";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const roleList = [
    { value: "Backoffice Staff", label: "Backoffice Staff" },
    { value: "Admin", label: "Admin" },
];

const SignupPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const initialValues = {
        name: "",
        email: "",
        userRole: { value: "", label: "" },
        password: "",
        confirmPassword: "",
    };

    const formValidation = yup.object({
        name: yup
            .string()
            .trim()
            .matches(
                /^.{5,20}$/,
                "Name must contain between 5 to 20 characters"
            )
            .required("Please enter the Full Name"),
        email: yup
            .string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Invalid Email"
            ),
        userRole: yup.object().shape({
            value: yup.string().required("Role is required"),
            label: yup.string().required("Role is required"),
        }),
        password: yup
            .string()
            .required("Please enter the Password")
            .min(8, "Password must contain at least 8 characters.")
            .matches(passwordRules, { message: "Please create a strong password" }),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), ""], "Passwords do not match")
            .required("Please enter the Confirm Password"),
    });

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>

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
                        Sign Up
                    </Typography>
                    <Box sx={{ mt: 1, width: '90%' }}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, formikHelpers) => {
                                console.log("values >>>>>>>>", values);
                                window.location.replace("/login");
                                //formikHelpers.resetForm();
                            }}
                            validationSchema={formValidation}
                        >
                            {({
                                errors,
                                isValid,
                                touched,
                                dirty,
                                values,
                                setFieldValue,
                                setFieldTouched,

                            }) => (
                                <Form className="w-full mt-4">
                                    <div>
                                        <div>
                                            <Field
                                                as={TextField}
                                                id="name"
                                                name="name"
                                                size="small"
                                                fullWidth
                                                label="Name"
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "between",
                                                    marginTop: 1,
                                                }}
                                                variant="outlined"
                                                error={
                                                    Boolean(errors.name) &&
                                                    Boolean(touched.name)
                                                }
                                                helperText={
                                                    Boolean(touched.name) &&
                                                    errors.name
                                                }
                                            />
                                        </div>
                                        <div className='mt-[1rem]'>
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
                                        <div className='mt-[1rem]'>
                                            <Autocomplete
                                                id="userRole"
                                                options={roleList}
                                                getOptionLabel={(option) => option.label}
                                                sx={{ marginTop: 1 }}
                                                size="small"
                                                onChange={(e, value) => {
                                                    setFieldValue("userRole", value);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        name="userRole"
                                                        variant="outlined"
                                                        fullWidth
                                                        placeholder="Select Role"
                                                        label="Select Role"
                                                        error={Boolean(errors.userRole) && Boolean(touched.userRole)}
                                                    />
                                                )}
                                            />
                                            {(touched.userRole && errors.userRole) || !!!values.userRole ? (
                                                <Typography
                                                    sx={{
                                                        color: "#e46a76",
                                                        fontSize: "0.7rem",
                                                        fontWeight: 400,
                                                        marginRight: "2rem",
                                                        marginTop: "4px",
                                                    }}
                                                >
                                                    {"Please select the Role"}
                                                </Typography>
                                            ) : null}
                                        </div>
                                        <div className='mt-[1rem]'>
                                            <Field
                                                as={TextField}
                                                name="password"
                                                id="password"
                                                fullWidth
                                                type={showPassword ? "text" : "password"}
                                                size="small"
                                                label="Password"
                                                error={
                                                    Boolean(errors.password) &&
                                                    Boolean(touched.password)
                                                }
                                                helperText={
                                                    Boolean(touched.password) && errors.password
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                                sx={{ color: "#0645A0" }}
                                                            >
                                                                {showPassword ? (
                                                                    <VisibilityOff />
                                                                ) : (
                                                                    <Visibility />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className='mt-[1rem]'>
                                            <Field
                                                as={TextField}
                                                name="confirmPassword"
                                                fullWidth
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                size="small"
                                                label="Confirm Password"
                                                error={
                                                    Boolean(errors.confirmPassword) &&
                                                    Boolean(touched.confirmPassword)
                                                }
                                                helperText={
                                                    Boolean(touched.confirmPassword) &&
                                                    errors.confirmPassword
                                                }
                                                InputProps={{
                                                    autoComplete: "off",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowConfirmPassword}
                                                                edge="end"
                                                                sx={{ color: "#0645A0" }}
                                                            >
                                                                {showConfirmPassword ? (
                                                                    <VisibilityOff />
                                                                ) : (
                                                                    <Visibility />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                disabled={!dirty || !isValid}
                                                sx={{
                                                    width: "100%",
                                                    backgroundColor: "#0645A0",
                                                    marginTop: 2,
                                                    fontWeight: 600,
                                                    borderRadius: "5px",
                                                    "&:hover": {
                                                        backgroundColor: "#F3F4F6",
                                                        color: "black",
                                                    },
                                                }}
                                                variant="contained"
                                                type="submit"
                                            >
                                                Sign Up
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Have an account? Login"}
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
                    backgroundImage: `url(${signupImg})`,
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

export default SignupPage;
