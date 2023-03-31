import React, {useState} from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const IncrementDecrement = (props) => {

    const { counter, handleIncrement, handleDecrement } = props;


    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
         {counter >= 0 && (
           <Button onClick={handleDecrement} sx = {{backgroundColor:"blue", color:'white'}}>-</Button>
         )}
        {counter >= 0 && (
          <Button disabled sx = {{backgroundColor:"white", color:'black',typography:'body1', fontWeight:1000}}>
            {counter}
          </Button>
        )}
        <Button onClick={handleIncrement} sx = {{backgroundColor:"blue", color:'white'}}>+</Button>
        </ButtonGroup>
        )
    }

export default IncrementDecrement;