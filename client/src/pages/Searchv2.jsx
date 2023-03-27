import React, { useEffect, useState } from "react";
import EventCard from "../components/SearchEventCards";
import Grid from "@mui/material/Grid";
import "../styles/searchPage.css";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Box } from "@mui/system";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineErrorOutline } from "react-icons/md"
import Pagination from '@mui/material/Pagination';
import { MdClear } from "react-icons/md";

import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,
        },
    },
};

const eventTypes = ['Free','Paid']


const Search = () => {
    const [events, setEvents] = useState({ "data": [] });
    const [filteredEvents, setFilteredEvents] = useState(events);
    // const cities = [];
    const [cities, setCities] = useState([]);
    console.log(cities.length);
    const [searchValue, setSearchValue] = useState("");
    const [submitQuery, setSubmitQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState([]);
    const [eventType, setEventType] = useState([]);


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(5);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    let currentCards, pageCount;
    if (events.length && events.length >= indexOfLastCard){
        currentCards = events.slice(indexOfFirstCard, indexOfLastCard);
        pageCount = events.length / cardsPerPage > 0 ? Math.floor(events.length / cardsPerPage) : 1;
    } else if (events.length > 0){
        currentCards = events;
        pageCount = 1;
    }
    


    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        let data = [];
        let url = `http://localhost:5000/events?`
        
        if (searchValue !== '') {
            console.log(searchValue);
            url = url + `query=${searchValue}`
        }

        if (eventType.length !== 0) {
            url = url + `&type=${eventType[0]}`
        }

        axios.get(url)
            .then(res => {
                const events_data = res.data.data;
                // setEvents(events_data);
                let local_cities = []; 
                events_data.forEach(element => {
                    if (!local_cities.includes(element.city)) {
                        local_cities.push(element.city);
                    }
                });
                setCities(local_cities.sort());
                applyFilter(searchValue, selectedCity, eventType, events_data);
            });
    }, [currentPage, submitQuery, selectedCity, eventType]);


    const applyFilter = (searchVal, selectedCityVal, eventTypeValue, events_data) => {
        let results = events_data;
        if (searchVal !== '' && selectedCityVal.length !== 0 && eventTypeValue.length !== 0) {
            results = events_data.filter(eventValue => {
                return ((eventValue.title.toLowerCase().includes(searchVal.toLowerCase()) || eventValue.description.toLowerCase().includes(searchVal.toLowerCase())) && (selectedCityVal.includes(eventValue.city)) && (eventValue.type === eventTypeValue[0]))
            })
        } else if (searchVal !== '' && eventTypeValue.length !== 0) {
            results = events_data.filter(eventValue => {
                return ((eventValue.title.toLowerCase().includes(searchVal.toLowerCase()) || eventValue.description.toLowerCase().includes(searchVal.toLowerCase())) && eventValue.type === eventTypeValue[0])
            })
        } else if (searchVal !== '' && selectedCityVal.length !== 0) {
            results = events_data.filter(eventValue => {
                return ((eventValue.title.toLowerCase().includes(searchVal.toLowerCase()) || eventValue.description.toLowerCase().includes(searchVal.toLowerCase())) && (selectedCityVal.includes(eventValue.city)))
            })
        } else if (selectedCityVal.length !== 0 && eventTypeValue.length !== 0) {
            results = events_data.filter(eventValue => {
                return ((selectedCityVal.includes(eventValue.city)) && (eventValue.type === eventTypeValue[0]))
            })
        } else if (selectedCityVal.length !== 0) {
            results = events_data.filter(eventValue => {
                return selectedCityVal.includes(eventValue.city)
            })
        } else if (searchVal !== '') {
            results = events_data.filter(eventValue => {
                return (eventValue.title.toLowerCase().includes(searchVal.toLowerCase()) || eventValue.description.toLowerCase().includes(searchVal.toLowerCase()))
            })
        } else if (eventTypeValue.length !== 0) {
            results = events_data.filter(eventValue => {
                return (eventValue.type === eventTypeValue[0])
            })
        } 
        setEvents(results)
    }

    const handleCityChange = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value)
        const selectedValues = typeof value === 'string' ? value.split(',') : value;
        setSelectedCity(selectedValues);
    }

    const handleEventTypeChange = (event) => {
        const {
            target: { value },
        } = event;
        const eventValue = typeof value === 'string' ? value.split(',') : value;
        if (eventValue.length == 2) {
            setEventType([]);    
        } else {
            setEventType(eventValue);
        }
        
    };

    const handleSearchChange = (event) => {
        const {
            target: { value },
        } = event;
        setSearchValue(value);
        if (value === '') return setEvents(events)
    }
    
    const handleClearBtn = () => {
        setSearchValue("");
        setSubmitQuery("");
        setCities([]);
        setEventType([]);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSubmitQuery(searchValue);
        // applyFilter(searchValue, selectedCity, '', '');
    };

    return (<div>
        <Grid container spacing={2}>
            {/********************************************** SIDEBAR **********************************************/}
            <Grid item xs={12} md={3}
                sx={{ mt: 3 }}
            >
                <Typography variant="h5" align="center">
                    Filters
                </Typography>
                <Stack
                    sx={{ paddingTop: '2rem' }}
                    spacing={2}
                    justifyContent="center"
                    alignContent="center"
                    alignItems="center">


                    {/********************************************** City filter **********************************************/}
                    <div>
                        <FormControl sx={{ minWidth: '20rem' }}>
                            <InputLabel id="filter-cities-label">Filter cities</InputLabel>
                            <Select
                                labelId="filter-cities-label"
                                id="filter-city"
                                multiple
                                value={selectedCity}
                                onChange={handleCityChange}
                                input={<OutlinedInput label="Filter city" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {cities.map((name) => (<MenuItem key={name} value={name}>
                                    <Checkbox checked={selectedCity.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>

                    {/********************************************** Event Type filter **********************************************/}
                    <div>
                        <FormControl sx={{ minWidth: '20rem' }}>
                            <InputLabel id="filter-type-label">Event type</InputLabel>
                            <Select
                                labelId="filter-type-label"
                                id="filter-type"
                                multiple
                                value={eventType}
                                onChange={handleEventTypeChange}
                                input={<OutlinedInput label="Event type" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {eventTypes.map((name) => (<MenuItem key={name} value={name}>
                                    <Checkbox checked={eventType.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                </Stack>
            </Grid>

            {/********************************************** SearchBar *********************************************/}
            <Grid item xs={12} md={8}>
                <div className="search">
                    <input
                        value={searchValue}
                        type="text"
                        className="searchTerm"
                        placeholder="Search anything"
                        onChange={handleSearchChange}
                    />
                    <Button
                        className="searchButton"
                        variant="contained"
                        onClick={handleSearchSubmit}
                        size="small">
                        <AiOutlineSearch size={20} />
                    </Button>
                    <Box sx={{
                        display: "flex", alignItems: "center",
                        padding: 1
                    }}>
                        <MdClear onClick={handleClearBtn} size={25} />
                    </Box>
                </div>

                {/******************************************* Events *********************************************/}
                <div>
                    {/* events. !== undefined && events..length !== 0 */}
                    {currentCards !== undefined && currentCards.length !== 0 ? (
                        currentCards.map((event) => {
                            return (<EventCard key={event.id} event={event} />);
                        })
                    ) : (<div>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '70vh',
                                backgroundColor: 'while'
                            }}
                        >
                            <Typography variant="h2" style={{
                                color: '#1976d2', display: 'flex', alignItems: 'center', padding: '0rem 2rem'
                            }}>
                                <MdOutlineErrorOutline size={100} color={'#1976d2'} /> No events found
                            </Typography>
                        </Box>
                    </div>)}
                </div>
                <Box sx={{
                    margin: "auto",
                    width: "fit-content",
                    alignItems: "center",
                    py: 2
                }}>
                    <Pagination count={pageCount} page={currentPage} onChange={handleChange} />
                </Box>


            </Grid>
        </Grid>
    </div>);
};

export default Search;
