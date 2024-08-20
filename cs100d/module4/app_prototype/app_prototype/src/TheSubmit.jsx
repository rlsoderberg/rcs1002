import React, { useState } from "react";

const SubmitBtn = () => {
    const {count, decade, result} = this.state

    const handleClick = () => {
      if (count === decade) {
        result = 'win'
      }
      result = 'lose'
    };

    return (
      <button className="submit-btn" onClick={handleClick}>
        <span class="submit-text">Submit</span>
      </button>
    );
  };

  export default SubmitBtn;
