// IncrementDecrementBtn.jsx

import React, { useState } from "react";
import "./index.css";

export const IncrementDecrementBtn = ({ minValue = 0, maxValue = 100 }) => {
  const [count, setCount] = useState(minValue);

  const handleIncrementCounter = () => {
    if (count < maxValue) {
      //i saw someone doing it like this, and that way, there's no prevState, which is confusing
      //this.setCount.bind(this + 10);
      //possibly
      ////this.setCount = this.setCount.bind(this + 10);
      this.setCount((prevState) => prevState + 10);
    }
  };

  const handleDecrementCounter = () => {
    if (count > minValue) {
      //this.setCount.bind(this - 10);
      setCount((prevState) => prevState - 10);
    }
  };

  return (
    <div className="btn-group">
      <button className="increment-btn" onClick={handleIncrementCounter}>
        <span class="material-symbols-outlined">+</span>
      </button>
      <p>{count}</p>
      <button className="decrement-btn" onClick={handleDecrementCounter}>
        <span class="material-symbols-outlined">-</span>
      </button>
    </div>
  );
};

export default IncrementDecrementBtn;
