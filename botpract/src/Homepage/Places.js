import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Places.css";
const Places = (props) => {
  const [selects, setSelects] = useState("Local Eateries");
  useEffect(() => {
    axios
      .get("http://localhost:5000/place")
      .then((res) => {
        props.setX(res.data);
        props.setY(selects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selects]);
 const handleOnChange=(e)=>{
    setSelects(e.target.value)
    props.setP({})
    props.setA(false)
  }
  return (
    <div>
      <select value={selects} onChange={(e)=>handleOnChange(e)}>
        <option>Restaurants</option>
        <option>Hotels</option>
        <option>Local Eateries</option>
        <option>Attraction Sites</option>
      </select>
    </div>
  );
};

export { Places };
