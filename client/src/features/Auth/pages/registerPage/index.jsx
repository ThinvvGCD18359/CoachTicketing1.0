import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import userApi from '../../../../api/userApi';
import { useSelector } from 'react-redux';
import Header from '../../../../layouts/Header';
import Banner from '../../../../layouts/Banner';
import Footer from '../../../../layouts/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "100%",
            display: 'flex',
        },
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        width: 150,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Register() {
    const currentUserId = useSelector(state => state.user.current.id);
    const classes = useStyles();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const addUser = async (user) => {
        try {
            const response = await userApi.addNewUser({ ...user, currentUserId: currentUserId });
            console.log(response);
            window.location = "/coach"
        } catch (error) {
            console.log(error)
        }
    };

    const initialValues = {
        username: '',
        gender: '',
        age: '',
        email: currentUser.email || "",
        phonenumber: currentUser.phoneNumber || "",
    };

    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Username is required'),
        gender: Yup.string().required('Gender is required'),
        age: Yup.string().required('Age is required'),
        email: Yup.string().email().required("email is required"),
        phonenumber: Yup.string().required('Phonenumber is required')
    });
    return (
        <div>
            <Container maxWidth="lg">
                <Header />
                <Banner />
                <Typography component="h1" variant="h5">
                    Input User Information
                </Typography>
                <Container maxWidth="xs">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={registerSchema}
                        onSubmit={addUser}
                    >
                        {({ errors, touched, values, handleChange, handleSubmit, handleBlur }) => (
                            <Form className={classes.root}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={(errors.username && touched.username) ? true : false}
                                            id="username"
                                            label="Username"
                                            name="username"
                                            value={values.username}
                                            helpertext={errors.username}
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="gender">Gender</InputLabel>
                                            <Select
                                                labelId="gender"
                                                id="gender"
                                                error={(errors.gender && touched.gender) ? true : false}
                                                value={values.gender}
                                                helpertext={errors.gender}
                                                onChange={handleChange("gender")}
                                                label="Gender"
                                            >
                                                <MenuItem value={"Male"}>Male</MenuItem>
                                                <MenuItem value={"Female"}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={(errors.age && touched.age) ? true : false}
                                            id="age"
                                            label="Age"
                                            name="age"
                                            value={values.age}
                                            helpertext={errors.age}
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={(errors.email && touched.email) ? true : false}
                                            id="email"
                                            label="Email"
                                            name="email"
                                            disabled={currentUser.email ? true : false}
                                            value={values.email}
                                            helpertext={errors.email}
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={(errors.phonenumber && touched.phonenumber) ? true : false}
                                            id="phonenumber"
                                            label="Phonenumber"
                                            name="phonenumber"
                                            disabled={currentUser.phoneNumber ? true : false}
                                            value={values.phonenumber}
                                            helpertext={errors.phonenumber}
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
                <Footer />
            </Container>
        </div>
    );
}

export default Register;