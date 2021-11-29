import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function UserTableRows(props) {
    const { account, handleAddUserRole } = props;

    const handleChangeRole = (event, userId) => {

        const formData = {
            userId: userId,
            role: event.target.value,
        };
        handleAddUserRole(formData)
    };

    return (
        <TableBody>
            {account?.map((item) => {
            // eslint-disable-next-line
                if (item.role === "admin") return
                return (
                    <TableRow key={item.id}>
                        <TableCell >{item.username}</TableCell>
                        <TableCell >{item.email}</TableCell>
                        <TableCell >{item.phonenumber}</TableCell>
                        <TableCell >
                            <RadioGroup defaultValue={item.role} row onChange={(e) => handleChangeRole(e, item.id)}>
                                <FormControlLabel value="user" control={<Radio />} label="User" />
                                <FormControlLabel value="coachOwner" control={<Radio />} label="Coach Owner" />
                            </RadioGroup>
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody >
    );
}

export default UserTableRows;