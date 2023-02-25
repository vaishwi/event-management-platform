import React from 'react';
import {useQuery} from "urql";
import {EVENTS_QUERY} from "../utils/Queries.jsx";

// const Event = ({event}) => {
//     console.log("==>", event)
//     return (<div>
//         <p>{event.attributes.title}</p>
//     </div>);
// };

const Search = () => {

    const [result] = useQuery({
        query: EVENTS_QUERY
    })

    const {data, fetching, error} = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Error...{error.message}</p>;
    const events = data.events.data;
    console.log(events)
    return (<div>
        <p>Events</p>
        <hr/>
        <div>
            {events.map((event) => {
                return (<div key={event.id}>
                    <div>
                        <img src={event.attributes.image.data[0].attributes.url} height={"50%"} width={"80%"} alt=""/>
                    </div>
                    <p>Title: {event.attributes.title}</p>
                    <p>Price: {event.attributes.price}</p>
                    <p>Date: {event.attributes.start_date}</p>
                    <p>Address: {event.attributes.address}</p>
                    <p>City: {event.attributes.city}</p>
                    <p>Country: {event.attributes.country}</p>
                    <hr/>
                </div>)
            })}
        </div>
    </div>);
};

export default Search;
