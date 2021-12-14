import { Input } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import React, { useState } from "react";
import coachApi from "../../../../api/coachApi";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const CustomTableCell = ({ rowdes, name, editOnChange }) => {
    return (
        <TableCell >
            <Input
                value={rowdes[name]}
                name={name}
                onChange={e => editOnChange(name, e.target.value)}
            />
        </TableCell>
    );
};

export default function Coach(props) {
    const { row, removeItem, handleUpdateRowInCoach } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    const [rowdes, setRowdes] = useState({
        name: row.name,
        plates: row.plates,
        phonenumber: row.phonenumber,
        starting: row.Route.starting,
        destination: row.Route.destination,
        departure: row.Route.departure,
        price: row.Route.price,
    });

    const editOnChange = (keyLabel, value) => {
        setRowdes(prev => {
            return { ...prev, [keyLabel]: value }
        });
    };

    const deleteCoachById = async () => {
        try {
            const response = await coachApi.deleteCoach({ id: row.id });
            removeItem(response.id);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnSubmitEdit = async () => {
        console.log(rowdes)
        try {
            const response = await coachApi.editCoachDetail({ ...rowdes, id: row.id })
            handleUpdateRowInCoach(response)
            setIsEditMode(!isEditMode);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.Route?.starting}</TableCell>
                <TableCell >{row.Route?.destination}</TableCell>
                <TableCell >{row.Route?.price}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detail
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Plates</TableCell>
                                        <TableCell align="right">Phone Number</TableCell>
                                        <TableCell align="right">From</TableCell>
                                        <TableCell align="right">To</TableCell>
                                        <TableCell align="right">Departure</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.id}>
                                        {isEditMode ? (
                                            <>
                                                <CustomTableCell {...{ rowdes, name: "name", editOnChange }} />
                                                <CustomTableCell {...{ rowdes, name: "plates", editOnChange }} />
                                                <CustomTableCell {...{ rowdes, name: "phonenumber", editOnChange }} />
                                                <CustomTableCell {...{ rowdes, name: "starting", editOnChange }} />
                                                <CustomTableCell {...{ rowdes, name: "destination", editOnChange }} />
                                                <CustomTableCell {...{ rowdes, name: "departure", editOnChange }} />
                                                <CustomTableCell {...{ rowdes, name: "price", editOnChange }} />
                                            </>
                                        ) : (
                                            <>
                                                <TableCell align="right">{row.name}</TableCell>
                                                <TableCell align="right">{row.plates}</TableCell>
                                                <TableCell align="right">{row.phonenumber}</TableCell>
                                                <TableCell align="right">{row.Route?.starting}</TableCell>
                                                <TableCell align="right">{row.Route?.destination}</TableCell>
                                                <TableCell align="right">{row.Route?.departure}</TableCell>
                                                <TableCell align="right">{row.Route?.price}</TableCell>
                                            </>
                                        )}
                                        <TableCell>
                                            {isEditMode ? (
                                                <>
                                                    <IconButton
                                                        aria-label="done"
                                                        onClick={() => handleOnSubmitEdit()}
                                                    >
                                                        <DoneIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="revert"
                                                        onClick={() => setIsEditMode(!isEditMode)}
                                                    >
                                                        <RevertIcon />
                                                    </IconButton>
                                                </>
                                            ) : (
                                                <>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => setIsEditMode(!isEditMode)}
                                                    >
                                                        <CreateIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => deleteCoachById()}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}