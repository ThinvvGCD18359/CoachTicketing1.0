import React, { useEffect, useState } from 'react';
import coachApi from '../../../api/coachApi';
import CoachCard from '../../Coach/components/CoachCard';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Container } from '@mui/material';
import Banner from '../../../layouts/Banner';
import Footer from '../../../layouts/Footer';
import Header from '../../../layouts/Header';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Button, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        border: 'solid 1px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function HomePage(props) {
    const classes = useStyles();
    const [popular, setPopular] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchFilter, setSearchFilter] = useState("name");

    useEffect(() => {
        async function getPopular() {
            const response = await coachApi.getPopularCoaches();
            setPopular(response);
        }
        getPopular();
    }, []);

    const handleInputChange = event => {
        setSearchInput(event.target.value);
    };

    const handleFilterChange = event => {
        setSearchFilter(event.target.value);
    };

    const searchCoach = async () => {
        try {
            const response = await coachApi.searchCoaches({ searchInput, searchFilter });
            console.log(response)
            setPopular(response)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <div className={classes.root}>
                <Toolbar>
                    <Typography className={classes.title} variant="h4" gutterBottom>
                        Most Popular
                    </Typography>
                    <Select
                        label="Search"
                        id="select"
                        value={searchFilter}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="starting">Starting</MenuItem>
                    </Select>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Button variant="outlined" onClick={searchCoach}>Search</Button>
                </Toolbar>
            </div>
            <CoachCard coaches={popular} />
            <Footer />
        </Container>
    );
}

export default HomePage;