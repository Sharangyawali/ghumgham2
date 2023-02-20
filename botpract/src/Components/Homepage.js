import React, { useState } from "react";
import List from "../Homepage/List";
import "./Homepage.css";
import Map1 from "../Homepage/Map/Map1";
import { Places } from "../Homepage/Places";
import Rating from "../Homepage/Rating";
import Geolocation from "../Homepage/Map/Geolocation";
import Navbar from "../Homepage/Navbar";
const Homepage = () => {
  const[search,setSearch]=useState({})
  const[click,setClick]=useState(false)
  const[lat,setLat]=useState()
  const[lng,setLng]=useState()
  const location=Geolocation()
  const [selects, setSelects] = useState("");
  const [data, setData] = useState([]);
  const [rate, setRate] = useState("");
  const fildata = data.filter((a) => {
    if (location.loaded && !location.error){
     const d=(Math.sqrt (Math.pow((location.coordinates.lat-a.latitude),2)+Math.pow((location.coordinates.lng-a.longitude),2))*111.2) 
    if (rate === "All") {
      return a.category === selects && a.isVerified === true && d<=5;
    }
    if (rate === "Above 3.0") {
      return a.category === selects && a.isVerified === true&& d<=5 && a.review >= 3.0;
    }
    if (rate === "Above 4.0") {
      return a.category === selects && a.isVerified === true&& d<=5 && a.review >= 4.0;
    } else {
      return a.category === selects && a.isVerified === true&& d<=5 && a.review >= 4.5;
    }}
    else{
      return(err=>console.log(err))
    }
  });
  return (
    <main>
      <div className="full container-fluid">
        <div className="row navb">
          <Navbar s={search} setS={setSearch} data={data}></Navbar>
        </div>
        <div className="row sel justify-content-lg-start ">
          <div className="col-auto col-lg-auto">
            <Places x={data} p={search} setP={setSearch} setX={setData} y={selects} setY={setSelects} />
          </div>
          <div className="col-2 col-lg-auto">
            <Rating z={rate} setZ={setRate} />
          </div>
        </div>
        <div className="row align-items-end listmap">
          <div className="col-lg-4 order-2 order-lg-1  list overflow-auto">
          {(Object.keys(search).length!==0)?(<>
            <List  p={click} setP={setClick} q={lat} setQ={setLat} r={lng} setR={setLng} data={search[0]}></List>
          </>):<>
          {fildata
              .sort((a, b) => (a.review < b.review ? 1 : -1))
              .map((data, i) => (
                <div key={i}>
                  <List  p={click} setP={setClick} q={lat} setQ={setLat} r={lng} setR={setLng}  data={data}/>
                </div>
              ))}
          </>}
          </div>
          <div className="col-lg-8 order-1 order-lg-2  map">
            <Map1 fildata={fildata} click={click} lat={lat} lng={lng} search={search}>
            </Map1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
