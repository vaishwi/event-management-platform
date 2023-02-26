import React, { useState } from "react";
import { useQuery } from "urql";
import { SEARCH_EVENTS } from "../utils/Queries.jsx";
import EventCard from "../components/SearchEventCards";
import Grid from "@mui/material/Grid";
import "../styles/searchPage.css";

import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";
import TrendingEvents from "../components/TrendingEvents.jsx";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [events, setEvents] = useState(null);
  const [result, getEvent] = useQuery({
    query: SEARCH_EVENTS,
    variables: { queryString: searchValue },
    pause: true,
  });

  const handleSearch = () => {
    getEvent();
    if (result.data !== undefined) {
      console.log("data fetchedd");
      setEvents(result.data.events.data);
    }
  };

  return (
    <div>
      <Grid container>
        {/********************************************** SIDEBAR **********************************************/}

        <Grid item sm={12} md={2}>
          <p>Side bar</p>
        </Grid>

        {/********************************************** SearchBar *********************************************/}
        <Grid item sm={12} md={8}>
          <div className="search">
            <input
              value={searchValue}
              type="text"
              className="searchTerm"
              placeholder="Search anything"
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
            <Button
              className="searchButton"
              variant="contained"
              onClick={handleSearch}
              size="small">
              <AiOutlineSearch size={20} />
            </Button>
          </div>

          {/******************************************* Events *********************************************/}
          <div>
            {events ? (
              events.map((event) => {
                return <EventCard key={event.id} event={event} />;
              })
            ) : (
              <TrendingEvents />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Search;
