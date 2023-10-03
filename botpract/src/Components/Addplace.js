import React,{useState} from 'react'
import {FaStar} from 'react-icons/fa'
import './Addplace.css'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddPlace = () => {
  const[error,setError]=useState(false)
  const [category, setCategory] = useState("Restaurants");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [maxprice, setMaxPrice] = useState("");
  const [review, setReview] = useState(0);
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(undefined);
  const star=Array(5).fill(0)
  const[hovervalue,setHovervalue]=useState(undefined)
  function handleImage(e) {
    setAvatar(e.target.files[0]);
  }
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
  console.log(review)
  const callapi = (e) => {
    e.preventDefault();
    if(name.length===0||location.length===0||price.length===0||description.length===0||avatar===undefined||review===0){
      setError(true)
    }
    else{
    const userobj = new FormData();
    userobj.append("category", category);
    userobj.append("name", name);
    userobj.append("review", review);
    userobj.append("price", price);
    userobj.append("maxprice", maxprice);
    userobj.append("location", location);
    userobj.append("description", description);
    userobj.append("avatar", avatar);
    axios
      .post("http://localhost:5000/addplace", userobj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      // window.location.reload(false);
      toast.success("Successfully added")
    }
  };
  return (
    <main className='h-screen overflow-hidden'>
    <div className='w-[400px] min-h-[640px] border-2 mx-auto mt-[10px] p-[16px] rounded-md bg-white laptop:w-[480px]'>
        <div className=' text-[24px] font-bold text-center py-[10px] mb-[3px]'>
            <h1>Add new places</h1>
        </div>
        <form onSubmit={callapi}>
            <div className='flex gap-4 laptop:flex-[2_1_0%]'>
              <div>
                <label className='flex font-semibold'>Name of place
                {error===true&&name.length===0?<p className='text-danger'>*(Required)</p>:''}
                 
                </label>
                <input required type="text" placeholder="Enter place" value={name}
          onChange={(e) => setName(e.target.value)} />
              </div>
              <div className=''>
                <label className='font-semibold'>Select category</label>
                <select className='laptop:w-[93%] shadow-none mt-0' value={category}
          onChange={(e) => setCategory(e.target.value)}>
                    <option className='option'>Restaurants</option>
                    <option className='option'>Hotels</option>
                    <option className='option'>Attraction Sites</option>
                    <option className='option'>Local Eateries</option>
                </select>
              </div>
            </div>
            <label className='flex font-semibold'>Enter location
            {error===true&&location.length===0?<p className='text-danger'>*(Required)</p>:''}</label>
            <input type="text" placeholder="Enter location"  value={location}
          onChange={(e) => setLocation(e.target.value)} />
            <h3 className='font-semibold'>Price</h3>
            <div className='flex gap-4'>
              <div>
              <label className='flex'>Min
              {error===true&&price.length===0?<p className='text-danger'>*(Required)</p>:''}
              </label>
              <input type="number"  value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }} />
              </div>
              <div>
              <label>Max</label>
              <input type="number" value={maxprice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }} />
              </div>
            </div>
            <div className="mb-3">
        <label className="flex form-label">Rating
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
              <label className='flex font-semibold'>Add your review
              {error===true&&description.length===0?<p className='text-danger'>*(Required)</p>:''}
              </label>
              <textarea   value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }} placeholder='Enter your review' className='ta10em'/>
            </div>
            <div className="mb-3">
        <label className="form-label">Enter the image
        {error===true&&avatar===undefined?<p className='text-danger'>*(Required)</p>:''}
        </label>
        <input
        required
          className="form-control"
          type="file"
          name="avatar"
          onChange={handleImage}
        />
      </div>
        </form>
        <button className='primary-btn mt-[3px]' type='submit' onClick={callapi}>Submit</button>
    </div>
    <ToastContainer position='top-center' theme='colored'></ToastContainer>
    </main>
  )
}

export default AddPlace