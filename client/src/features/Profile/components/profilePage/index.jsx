import React, { useState } from 'react';
import { Container, Modal, Toolbar, Typography } from '@material-ui/core';
import Footer from '../../../../layouts/Footer';
import Header from '../../../../layouts/Header';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import EditProfile from '../editProfile';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "auto",
        display: "flex",
        flexDirection: "row",
    },
    media: {
        height: 200,
    },
    content: {
        marginTop: 30,
        marginLeft: 20,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    detail: {
        margin: theme.spacing(2),
    },
}));

function ProfilePage(props) {
    const { user, updateProfile } = props;
    const [open, setOpen] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Header />
            <Card className={classes.root}>
                <img
                    className={classes.media}
                    src={currentUser.photoUrl}
                    title="Profile"
                    alt="avatar"
                />
                <CardContent className={classes.content}>
                    <Typography variant="h2" component="h2">
                        {user.username}
                    </Typography>
                    <Button size="small" color="primary" onClick={handleOpen}>
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>
            <Toolbar style={{ marginTop: 20 }}>
                <Typography className={classes.title} variant="h4" gutterBottom>
                    Basic Info
                </Typography>
            </Toolbar>
            <Container >
                <Typography className={classes.detail}>Gender: {user.gender}</Typography>
                <Typography className={classes.detail}>Age: {user.age}</Typography>
                <Typography className={classes.detail}>Email: {user.email}</Typography>
                <Typography className={classes.detail}>Phone number: {user.phonenumber}</Typography>
            </Container>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <EditProfile user={user} handleClose={handleClose} updateProfile={updateProfile}/>
            </Modal>
            <Footer />
        </Container>
    )
}

export default ProfilePage;