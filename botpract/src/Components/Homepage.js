import React, { useState } from "react";
import {FaStar} from 'react-icons/fa'
import List from "../Homepage/List";
import "./Homepage.css";
import Map1 from "../Homepage/Map/Map1";
import { Places } from "../Homepage/Places";
import Rating from "../Homepage/Rating";
import Geolocation from "../Homepage/Map/Geolocation";
import Navbar from "../Homepage/Navbar";
const Homepage = () => {
  const[tochangedata,setToChangeData]=useState({})
  const[search,setSearch]=useState({})
  const[click,setClick]=useState(false)
  const[lat,setLat]=useState()
  const[lng,setLng]=useState()
  const location=Geolocation()
  const [selects, setSelects] = useState("");
  const [data, setData] = useState([]);
  const [rate, setRate] = useState("");
  const[error,setError]=useState(false)
  const [isShown, setIsShown] = useState(false)
  const[review,setReview]=useState(0)
  const star=Array(5).fill(0)
  const[hovervalue,setHovervalue]=useState(undefined)
  const showDiv = () => {
    setIsShown((prev) => !prev)
  }
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
  const handleClick=(value)=>{
    setReview(value)
  }
  const handleMouseOver=(value)=>{
    setReview(value)
    setHovervalue(value)
  }
  const handleMouseLeave=()=>{
    setHovervalue(undefined)
  }
  const handleOnchangereview=async(e)=>{
    e.preventDefault()
    if(review===0){
      setError(true)
    }
    else{
    let name=tochangedata.name
    console.log(name)
    let result=await fetch(`http://localhost:5000/addreviews`,{
      method:"put",
      body:JSON.stringify({name,review}),
      headers:{"Content-Type": "application/json" }
    })
    result=await result.json()
    setIsShown(false)
  }
}
  return (
    <main className="overflow-hidden">
      <div className="full container-fluid">
        <div className="row navb">
          <Navbar s={search} setS={setSearch} data={data}></Navbar>
        </div>
        <div className={`${isShown ? "blur-sm" : ""} transition ease-in delay-250`}>
        <div className={`row sel justify-content-lg-start `}>
          <div className="col-auto col-lg-auto">
            <Places x={data} p={search} setP={setSearch} setX={setData} y={selects} setY={setSelects} a={click} setA={setClick} />
          </div>
          <div className="col-2 col-lg-auto">
            <Rating z={rate} setZ={setRate} />
          </div>
        </div>
        <div className="row align-items-end listmap">
          <div className="col-lg-4 order-2 order-lg-1 list overflow-auto">
          {(Object.keys(search).length!==0)?(<>
            <List showdiv={showDiv}  p={click} setP={setClick} q={lat} setQ={setLat} r={lng} setR={setLng} data={search[0]} h={tochangedata} setH={setToChangeData}></List>
          </>):<>
          {fildata
              .sort((a, b) => (a.review < b.review ? 1 : -1))
              .map((data, i) => (
                <div key={i}>
                  <List showdiv={showDiv} p={click} setP={setClick} q={lat} setQ={setLat} r={lng} setR={setLng} h={tochangedata} setH={setToChangeData}  data={data}/>
                </div>
              ))}
          </>}
          </div>
          <div className="col-lg-8 order-1 order-lg-2  map">
            <Map1 fildata={fildata} click={click} lat={lat} lng={lng} selects={selects} search={search}>
            </Map1>
          </div>
        </div>
      </div>
      </div>
      <div className={`${isShown ? "" : "hidden"} border-2 border-black bg-white rounded-md h-[380px] w-[600px] absolute top-[30%] left-[600px] z-[999]`}>
          <div className='px-[18px] py-[10px]'>
          <h1 className='text-center font-bold text-[24px]'>Add Reviews</h1>
          <form className='' onSubmit={handleOnchangereview}>
            <div className='mb-[16px]'>
            <label className='flex font-semibold text-[18px] leading-[32px]'>Enter Rating
            {error===true&&review===0?<p className='text-danger'>*(Required)</p>:''}
            </label>
            <div className='flex'>
        {star.map((_,i)=>{
          return(
            <FaStar 
            key={i} 
            style={{marginRight:10,cursor:'pointer'}} 
            size={24}
            color={(hovervalue||review)>i?'gold':'gray'}
            onClick={()=>handleClick(i+1)}
              onMouseOver={()=>handleMouseOver(i+1)}
              onMouseLeave={()=>handleMouseLeave}
            ></FaStar>
          )
        })}
        </div>
            </div>
            <div className='flex flex-col'>
            <label className='font-semibold text-[18px] leading-[32px]'>Give your thoughts</label>
            <textarea placeholder='Enter your review'  className='resize-none h-[8rem] p-[8px]'/>
            </div>
            <button className='primary-btn mt-[16px]' onClick={(e)=>handleOnchangereview(e)}>Submit</button>
          </form>
          
          </div>
      </div>
    </main>
  );
};

export default Homepage;
