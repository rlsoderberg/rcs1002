import React, { useState } from "react";
import IncrementDecrementBtn from "./IncrementDecrementBtn";

const IncrementDecrementBtn = ({ count }) => {
    const [userCount, setUserCount] = count();

    const handleClick = () => {
        setUserCount((prevState) => prevState + 10);
      };

    return (
        <button type="button" class = "lrgbutton" onClick={this.check.bind(this)}>Submit</button>
    );
  };

  export default SubmitBtn;
