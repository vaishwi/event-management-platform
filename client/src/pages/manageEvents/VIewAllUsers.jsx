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
import axios from 'axios';
import login from "../Login.jsx";

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
    const { eventID } = location; // Read values passed on state
    const [userList, setUserList] = useState([]);
    const [eventId, setEventId] = useState('');
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
                    x.firstName > y.firstName ? 1 : y.firstName > x.firstName ? -1 : 0
                );
            case "desc":
                return arr.sort((x, y) =>
                    x.firstName < y.firstName ? 1 : y.firstName < x.firstName ? -1 : 0
                );
        }
    };

    const handleSortRequest = () => {
        setUserList(sortArray(userList, orderDirection));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };

    useEffect(()=>{
        console.log(location.state.eventID,"ioioioioioio>>>>")
        console.log(eventID,"eventID>>>>>>>>>>")
        setEventId(location.state.eventID)
        let myList = []
        const fetchUsers = async () => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getEventRegisterUsers/${location.state.eventID}`)
                if(response.status === 200) {
                    console.log(response,"response>>>>>>>>")
                    response.data.map(x => {
                        if(!myList.includes(x)){
                            myList.push(x)
                        }
                    })
                    setUserList(myList)
                }
            } catch (e) {
                console.log(e)
                setUserList([])
            }
        };
        fetchUsers();
    },[])
    let totalUsers = 0;

    // Finding the Total Cost

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
                                    Type
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((row) => (
                                <TableRow key={row.id} hover  className={classes.tableRow}>
                                    {console.log(row,"row>>>>>>")}
                                    <TableCell align="center" component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.firstName}</TableCell>
                                    <TableCell align="center">{row.lastName}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                </TableRow>
                            )

                        )}
                        <TableRow className={classes.finalRow}>
                            <TableCell align="right" colSpan={12}>
                                <b>Total Users:</b> {userList.length}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ViewAllUsers;
