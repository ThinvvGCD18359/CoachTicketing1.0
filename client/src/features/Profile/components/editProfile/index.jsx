import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';

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
    paper: {
        position: 'absolute',
        width: "auto",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

function EditProfile(props) {
    const {user, handleClose, updateProfile} = props;
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const currentUserId = useSelector(state => state.user.current.id);

    const editUserProfile = async (formData) => {
        try {
            const response = await userApi.editUserProfile({...formData, currentUserId});
            handleClose();
            updateProfile(response);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    };

    const initialValues = {
        username: user.username || "",
        gender: user.gender || "",
        age: user.age || "",
        email: user.email || "",
        phonenumber: user.phonenumber || "",
    };

    const profilerSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Username is required'),
        gender: Yup.string().required('Gender is required'),
        age: Yup.string().required('Age is required'),
    });

    return (
        <div style={modalStyle} className={classes.paper}>
            <Container maxWidth="lg">
                <Typography component="h1" variant="h5">
                    Edit User Profile
                </Typography>
                <Container maxWidth="xs">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={profilerSchema}
                        onSubmit={editUserProfile}
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
                                            disabled={user.email ? true : false}
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
                                            disabled={user.phonenumber ? true : false}
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
            </Container>
        </div>
    );
}

export default EditProfile;