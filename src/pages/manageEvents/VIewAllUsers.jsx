import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../index.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import 'react-toastify/dist/ReactToastify.css';
import {TableContainer} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    finalRow: {
        backgroundColor: "#3498db"
    },
    tableRow: {
        "&:hover": {
            backgroundColor: "#e0e0e0 !important"
        }
    }
});
const ViewAllUsers = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [userList, setUserList] = useState([]);
    const [orderDirection, setOrderDirection] = useState("asc");

    const classes = useStyles();
    function createData(number, firstName, lastName, email, eventName, eventAddress, organizerName, registerDate) {
        return {number, firstName, lastName, email, eventName, eventAddress, organizerName, registerDate};
    }

    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.sort((x, y) =>
                    x.number > y.number ? 1 : y.number > x.number ? -1 : 0
                );
            case "desc":
                return arr.sort((x, y) =>
                    x.number < y.number ? 1 : y.number < x.number ? -1 : 0
                );
        }
    };

    const handleSortRequest = () => {
        setUserList(sortArray(userList, orderDirection));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };

    const users = [
        createData(1, "Arpit", "Patel", "arpit@gmail.com", "Night Party", "1234 West st, Halifax", "Dalhousie University", "3rd March 2023"),
        createData(2, "Deep", "Dave", "deep@gmail.com", "Night Party", "1234 West st, Halifax", "Dalhousie University", "10th Feb 2023"),
        createData(3, "Khushi", "Shah", "khushi@gmail.com", "Night Party", "1234 West st, Halifax", "Dalhousie University", "15rd March 2023"),
        createData(4, "Purvesh", "Rathod", "purvesh@gmail.com", "Night Party", "1234 West st, Halifax", "Dalhousie University", "23rd March 2023"),
        createData(5, "Vaishwi", "Patel", "vaishwi@gmail.com", "Night Party", "1234 West st, Halifax", "Dalhousie University", "11rd Feb 2023"),
    ];

    useEffect(()=>{
        setUserList(users)
    },[])
    let totalUsers = 0;

    // Finding the Total Cost
    users.forEach((row) => (totalUsers += row.email));

    return (
        <>
            <TableContainer component={Paper}>
                <h1 style={{textAlign : "center", marginTop : "20px"}}>Register Users</h1>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow hover  className={classes.tableRow}>
                            <TableCell align="center" onClick={handleSortRequest}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    User Id
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" onClick={handleSortRequest}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    First Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" onClick={handleSortRequest}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    Last Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" onClick={handleSortRequest}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" onClick={handleSortRequest}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    Event
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" onClick={handleSortRequest}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    Place
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" onClick={handleSortRequest}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    Organizer
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" onClick={handleSortRequest}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    Register Date
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((row) => (
                            <TableRow key={row.number} hover  className={classes.tableRow}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.number}
                                </TableCell>
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.eventName}</TableCell>
                                <TableCell align="center">{row.eventAddress}</TableCell>
                                <TableCell align="center">{row.organizerName}</TableCell>
                                <TableCell align="center">{row.registerDate}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow className={classes.finalRow}>
                            <TableCell align="right" colSpan={12}>
                                <b>Total Users:</b> 5
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ViewAllUsers;
