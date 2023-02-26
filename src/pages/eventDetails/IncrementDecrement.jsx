import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

class IncrementDecrement extends React.Component {
  state = { counter: 1 };

  handleIncrement = () => {
    this.setState((state) => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    this.setState((state) => ({ counter: state.counter - 1 }));
  };
  render() {
    const displayCounter = this.state.counter > 0;

    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
         {this.state.counter >= 0 && (
           <Button onClick={this.handleDecrement} sx = {{backgroundColor:"blue", color:'white'}}>-</Button>
         )}
        {this.state.counter >= 0 && (
          <Button disabled sx = {{backgroundColor:"white", color:'black',typography:'body1', fontWeight:1000}}>
          {this.state.counter}</Button>
        )}
        <Button onClick={this.handleIncrement} sx = {{backgroundColor:"blue", color:'white'}}>+</Button>


      </ButtonGroup>
    );
  }
}

export default IncrementDecrement;
