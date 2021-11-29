import React, { useEffect, useState } from 'react';
import accountApi from '../../../api/accountApi';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import { Container } from '@material-ui/core';
import Header from '../../../layouts/Header';
import Banner from '../../../layouts/Banner';
import Footer from '../../../layouts/Footer';
import UserTableColumns from '../components/userTableColumn';
import UserTableRows from '../components/userTableRow';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function AdminPage(props) {
    const classes = useStyles();
    const [account, setAccount] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    useEffect(() => {
        const getAllUserAccount = async () => {
            const response = await accountApi.getAllUsers();
            setAccount(response);
        }
        getAllUserAccount();
    }, []);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleAddUserRole = async (formData) => {
        try {
            const response = await accountApi.addRole(formData);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <UserTableColumns />
                        <UserTableRows
                            account={account}
                            handleAddUserRole={handleAddUserRole}
                        />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={account.length}
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

export default AdminPage;