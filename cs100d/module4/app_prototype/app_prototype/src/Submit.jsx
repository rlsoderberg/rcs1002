import React, { useState } from "react";

const SubmitBtn = ({ count }) => {
    const [userCount, setUserCount] = count();

    const check = () => {
      if (count < maxValue) {
        setUserCount((prevState) => userCount);
      }
    };

    return (
      <SubmitBtn userCount = {count} onClick={check}/>
    );
  };

  export default SubmitBtn;
