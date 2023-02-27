import React, {useEffect, useState} from "react";
import {useQuery} from "urql";
import {GET_EVENTS, SEARCH_EVENTS} from "../utils/Queries.jsx";
import EventCard from "../components/SearchEventCards";
import Grid from "@mui/material/Grid";
import "../styles/searchPage.css";
import {AiOutlineSearch} from "react-icons/ai";
import Button from "@mui/material/Button";
import TrendingEvents from "../components/TrendingEvents.jsx";
import {Chip, Paper, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {EventsData} from "../utils/EventsData.jsx";
import {Box} from "@mui/system";
import {MdOutlineErrorOutline} from "react-icons/md"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,
        },
    },
};

const eventTypes = ['Paid', 'Free']
let cities = [];
EventsData.data.events.data.forEach((event) => {
    if (!cities.includes(event.attributes.city)) {
        cities.push(event.attributes.city);
    }
})

const Search = () => {
    const [events, setEvents] = useState(EventsData.data.events.data);
    const [searchValue, setSearchValue] = useState("");
    const [selectedCity, setSelectedCity] = useState([]);
    const [eventType, setEventType] = useState([]);

    // const [result, getEvent] = useQuery({
    //     query: SEARCH_EVENTS, variables: {queryString: searchValue, city: 'halifax'}, pause: true,
    // });
    // const [trendingEvents] = useQuery({
    //     query: GET_EVENTS,
    // });
    // const {data, fetching, error} = trendingEvents;
    // if (fetching) return <p>Loading...</p>;
    // if (error) return <p>Error...{error.message}</p>;
    // let trendingEventsData = data.events.data;

    useEffect(() => {
        if (searchValue === '') {
            setEvents(EventsData.data.events.data);
        }
    }, [searchValue]);


    const applyFilter = (searchVal, selectedCityVal, eventTypeValue) => {
        if (searchVal !== '' && selectedCityVal.length !== 0 && eventTypeValue !== '') {
            const results = EventsData.data.events.data.filter(eventValue => {
                return ((eventValue.attributes.title.toLowerCase().includes(searchVal.toLowerCase()) || eventValue.attributes.description.toLowerCase().includes(searchVal.toLowerCase())) && (selectedCityVal.includes(eventValue.attributes.city)) && (eventValue.attributes.type === eventTypeValue))
            })
            setEvents(results)
        } else if (searchVal !== '' && eventTypeValue !== '') {
            const results = EventsData.data.events.data.filter(eventValue => {
                return ((eventValue.attributes.title.toLowerCase().includes(searchVal.toLowerCase()) || eventValue.attributes.description.toLowerCase().includes(searchVal.toLowerCase())) && (eventValue.attributes.type === eventTypeValue))
            })
            setEvents(results)
        } else if (searchVal !== '' && selectedCityVal.length !== 0) {
            const results = EventsData.data.events.data.filter(eventValue => {
                return ((eventValue.attributes.title.toLowerCase().includes(searchVal.toLowerCase()) || eventValue.attributes.description.toLowerCase().includes(searchVal.toLowerCase())) && (selectedCityVal.includes(eventValue.attributes.city)))
            })
            setEvents(results)
        } else if (selectedCityVal.length !== 0 && eventTypeValue !== '') {
            const results = EventsData.data.events.data.filter(eventValue => {
                return ((selectedCityVal.includes(eventValue.attributes.city)) && (eventValue.attributes.type === eventTypeValue))
            })
            setEvents(results)
        } else if (selectedCityVal.length !== 0) {
            const results = EventsData.data.events.data.filter(eventValue => {
                return selectedCityVal.includes(eventValue.attributes.city)
            })
            setEvents(results)
        } else if (searchVal !== '') {
            const results = EventsData.data.events.data.filter(eventValue => {
                return (eventValue.attributes.title.toLowerCase().includes(searchVal.toLowerCase()) || eventValue.attributes.description.toLowerCase().includes(searchVal.toLowerCase()))
            })
            setEvents(results)
        } else if (eventTypeValue !== "") {
            const results = EventsData.data.events.data.filter(eventValue => {
                return (eventValue.attributes.type === eventTypeValue)
            })
            setEvents(results)
        } else {
            setEvents(EventsData.data.events.data)
        }
    }

    const handleCityChange = (event) => {
        const {
            target: {value},
        } = event;
        console.log(value)
        const selectedValues = typeof value === 'string' ? value.split(',') : value;
        setSelectedCity(selectedValues);
        if (value.length === 0) {
            applyFilter(searchValue, value, '');
        } else {
            const results = events.filter(eventVal => {
                return value.includes(eventVal.attributes.city)
            })
            setEvents(results)
        }
    }

    const handleEventTypeChange = (event) => {
        const {
            target: {value},
        } = event;
        const eventValue = typeof value === 'string' ? value.split(',') : value;
        setEventType(eventValue);

        if (value.length === 0 || value.length === 2) {
            applyFilter(searchValue, selectedCity, '');
        } else if (value.length === 1 && value.includes('Free')) {
            applyFilter(searchValue, selectedCity, "Free")
            // const results = events.filter(eventVal => {
            //     return eventVal.attributes.type === 'Free';
            // })
            // setEvents(results);
        } else if (value.length === 1 && value.includes('Paid')) {
            applyFilter(searchValue, selectedCity, "Paid")
            // const results = events.filter(eventVal => {
            //     return eventVal.attributes.type === 'Paid';
            // })
            // setEvents(results);
        }
    };

    const handleSearchChange = (event) => {
        const {
            target: {value},
        } = event;
        setSearchValue(value);
        if (value === '') return setEvents(events)
    }

    const handleSearchSubmit = () => {
        setEvents(EventsData.data.events.data);
        applyFilter(searchValue, selectedCity, '');
    };

    return (<div>
        <Grid container>
            {/********************************************** SIDEBAR **********************************************/}
            <Grid item xs={12} md={2}>
                <Stack
                    sx={{paddingTop: '1rem'}}
                    spacing={2}
                    justifyContent="center"
                    alignContent="center"
                    divider={<Divider flexItem/>}
                    alignItems="center">
                    <Typography variant="h5">
                        Filters
                    </Typography>

                    {/********************************************** City filter **********************************************/}
                    <div>
                        <FormControl sx={{width: '14rem'}}>
                            <InputLabel id="filter-cities-label">Filter cities</InputLabel>
                            <Select
                                labelId="filter-cities-label"
                                id="filter-city"
                                multiple
                                value={selectedCity}
                                onChange={handleCityChange}
                                input={<OutlinedInput label="Filter city"/>}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {cities.map((name) => (<MenuItem key={name} value={name}>
                                    <Checkbox checked={selectedCity.indexOf(name) > -1}/>
                                    <ListItemText primary={name}/>
                                </MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>

                    {/********************************************** Event Type filter **********************************************/}
                    <div>
                        <FormControl sx={{width: '14rem'}}>
                            <InputLabel id="filter-type-label">Event type</InputLabel>
                            <Select
                                labelId="filter-type-label"
                                id="filter-type"
                                multiple
                                value={eventType}
                                onChange={handleEventTypeChange}
                                input={<OutlinedInput label="Event type"/>}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {eventTypes.map((name) => (<MenuItem key={name} value={name}>
                                    <Checkbox checked={eventType.indexOf(name) > -1}/>
                                    <ListItemText primary={name}/>
                                </MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                </Stack>
            </Grid>

            {/********************************************** SearchBar *********************************************/}
            <Grid item sm={12} md={8}>
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
                        <AiOutlineSearch size={20}/>
                    </Button>
                </div>

                {/******************************************* Events *********************************************/}
                <div>
                    {events.length !== 0 ? (events.map((event) => {
                        return (<EventCard key={event.id} event={event}/>);
                    })) : (<div>
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
                                <MdOutlineErrorOutline size={100} color={'#1976d2'}/> No events found
                            </Typography>
                        </Box>
                    </div>)}
                </div>
            </Grid>
        </Grid>
    </div>);
};

export default Search;
