import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ticketApi from '../../../../api/ticketApi';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRows from '../../components/tableRow';
import TableColumns from '../../components/tableColumn';
import { Container } from '@material-ui/core';
import Header from '../../../../layouts/Header';
import Banner from '../../../../layouts/Banner';
import Footer from '../../../../layouts/Footer';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function UserTicket(props) {
    const classes = useStyles();
    const [ticket, setTicket] = useState([]);
    const currentUserId = useSelector(state => state.user.current.id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const getUserTicket = async () => {
            const response = await ticketApi.getUserTicket({ currentUserId })
            setTicket(response);
        };
        getUserTicket()
    }, [currentUserId]);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableColumns />
                        <TableRows ticket={ticket} />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={ticket.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Footer />
        </Container>
    );
}

export default UserTicket;