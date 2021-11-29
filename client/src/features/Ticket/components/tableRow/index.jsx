import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function TableRows(props) {
    const { ticket } = props;
    const history = useHistory();

    const handleGetTicket = (ticketId) => {
        history.push(`/ticket/detail/${ticketId}`)
    };

    return (
        <TableBody>
            {ticket?.map((item) => (
                <TableRow key={item.id}>
                    <TableCell >{item.Coach.name}</TableCell>
                    <TableCell >{item.Coach.plates}</TableCell>
                    <TableCell >{item.Coach.Route.starting}</TableCell>
                    <TableCell >{item.Coach.Route.destination}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => handleGetTicket(item.id)}>
                            <ConfirmationNumberIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody >
    );
}

export default TableRows;