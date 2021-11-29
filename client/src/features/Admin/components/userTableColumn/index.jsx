import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function UserTableColumns(props) {
    return (
        <TableHead>
            <TableRow>
                <TableCell >User Name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Phone Number</TableCell>
                <TableCell >Role</TableCell>
                <TableCell/>
            </TableRow>
        </TableHead>
    );
}

export default UserTableColumns;