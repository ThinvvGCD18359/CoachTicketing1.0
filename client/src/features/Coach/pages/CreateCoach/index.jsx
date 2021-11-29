import React from 'react';
import PropTypes from 'prop-types';
import coachApi from '../../../../api/coachApi';
import { Formik, Form } from 'formik';
import { Button, Container, TextField } from '@material-ui/core';
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
            width: 200,
            display: 'flex',
        },
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
            <Formik
                initialValues={initialValues}
                validationSchema={coachSchema}
                onSubmit={(values) => addCoach(values)}
            >
                {({ errors, touched, values, handleChange, handleSubmit, handleBlur }) => (
                    <Form className={classes.root}>
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
                        <TextField
                            fullWidth={true}
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
                        <TextField
                            error={(errors.plates && touched.plates) ? true : false}
                            id="plates"
                            label="plates"
                            name="plates"
                            value={values.plates}
                            helperText={errors.plates}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
            <Footer />
        </Container>
    );
}

export default CreateCoach;