import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import coachApi from '../../../../api/coachApi';
import { useParams, useHistory } from 'react-router-dom';
import Footer from '../../../../layouts/Footer';
import Header from '../../../../layouts/Header';
import Banner from '../../../../layouts/Banner';

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

function CreateRoute(props) {
    const history = useHistory()
    const { coachId } = useParams();
    const addRoute = async (values) => {
        try {
            const response = await coachApi.createRoute({ ...values, coachId: parseInt(coachId) });
            console.log(response);
        } catch (error) {
            console.log(error)
        }
        history.push("/coach")
    };

    const classes = useStyles();

    const initialValues = {
        starting: '',
        destination: '',
        departure: '',
        price: '',
    };

    const routeSchema = Yup.object().shape({
        starting: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Staring is required'),
        destination: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Destination is required'),
        departure: Yup.string().required('Departure is required'),
        price: Yup.number().integer().required("Price is required"),
    });
    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <Typography component="h1" variant="h5">
                Create Route
            </Typography>
            <Container maxWidth="xs">
                <Formik
                    initialValues={initialValues}
                    validationSchema={routeSchema}
                    onSubmit={(values) => addRoute(values)}
                >
                    {({ errors, touched, values, handleChange, handleSubmit, handleBlur }) => (
                        <Form className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={(errors.starting && touched.starting) ? true : false}
                                        id="starting"
                                        label="Starting"
                                        name="starting"
                                        value={values.starting}
                                        helpertext={errors.starting}
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={(errors.destination && touched.destination) ? true : false}
                                        id="destination"
                                        label="Destination"
                                        name="destination"
                                        value={values.destination}
                                        helpertext={errors.destination}
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={(errors.departure && touched.departure) ? true : false}
                                        id="departure"
                                        label="Departure"
                                        name="departure"
                                        type="datetime-local"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={values.departure}
                                        helpertext={errors.departure}
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={(errors.price && touched.price) ? true : false}
                                        id="price"
                                        label="Price"
                                        name="price"
                                        value={values.price}
                                        helpertext={errors.price}
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

export default CreateRoute;