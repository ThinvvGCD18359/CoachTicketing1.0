import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function TableColumns(props) {
    return (
        <TableHead>
            <TableRow>
                <TableCell >Coach</TableCell>
                <TableCell >Plates</TableCell>
                <TableCell >From</TableCell>
                <TableCell >To</TableCell>
                <TableCell/>
            </TableRow>
        </TableHead>
    );
}

export default TableColumns;