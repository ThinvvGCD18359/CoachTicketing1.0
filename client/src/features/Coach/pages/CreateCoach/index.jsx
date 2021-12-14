import React from 'react';
import PropTypes from 'prop-types';
import coachApi from '../../../../api/coachApi';
import { Formik, Form } from 'formik';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../../../../layouts/Footer';
import Header from '../../../../layouts/Header';
import Banner from '../../../../layouts/Banner';

CreateCoach.propTypes = {
    coaches: PropTypes.array,
};

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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function CreateCoach(props) {
    const history = useHistory();
    const currentUserId = useSelector(state => state.user.current.id)
    const addCoach = async (values) => {
        try {
            const response = await coachApi.createCoach({ ...values, currentUserId: currentUserId });
            console.log(response);
            history.push(`/coach/create/route/${response.id}`)
        } catch (error) {
            console.log(error)
        }
    };

    const classes = useStyles();

    const initialValues = {
        name: '',
        phonenumber: '',
        plates: '',
    };

    const coachSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name is required'),
        phonenumber: Yup.string()
            .required('Phone is required'),
        plates: Yup.string().required('Plates is required'),
    });

    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <Typography component="h1" variant="h5">
                Create Coach
            </Typography>
            <Container maxWidth="xs">
                <Formik
                    initialValues={initialValues}
                    validationSchema={coachSchema}
                    onSubmit={(values) => addCoach(values)}
                >
                    {({ errors, touched, values, handleChange, handleSubmit, handleBlur }) => (
                        <Form className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={(errors.name && touched.name) ? true : false}
                                        id="name"
                                        label="Name"
                                        name="name"
                                        value={values.name}
                                        helperText={errors.name}
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={(errors.phonenumber && touched.phonenumber) ? true : false}
                                        id="phonenumber"
                                        label="Phone Number"
                                        name="phonenumber"
                                        value={values.phonenumber}
                                        helperText={errors.phonenumber}
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={(errors.plates && touched.plates) ? true : false}
                                        id="plates"
                                        label="Plates"
                                        name="plates"
                                        value={values.plates}
                                        helperText={errors.plates}
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
    );
}

export default CreateCoach;