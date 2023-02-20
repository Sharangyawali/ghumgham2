import React, { useEffect, useState } from "react";
import "./Rating.css";

const Rating = (props) => {
  const [rate, setRate] = useState("All");
  useEffect(()=>{
    props.setZ(rate);
  },[rate])
  
  return (
    <div>
      <select
        value={rate}
        onChange={(e) => {
          setRate(e.target.value);
        }}
      >
        <option>All</option>
        <option>Above 3.0</option>
        <option>Above 4.0</option>
        <option>Above 4.5</option>
      </select>
    </div>
  );
};

export default Rating;
