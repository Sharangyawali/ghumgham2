import React,{useState} from 'react'
import './Addplace.css'
import axios from "axios";
const AddPlace = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [maxprice, setMaxPrice] = useState("");
  const [review, setReview] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleImage(e) {
    setAvatar(e.target.files[0]);
  }
  const callapi = (e) => {
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
  };
  return (
    <main className='h-screen overflow-hidden'>
    <div className='w-[400px] min-h-[640px] border-2 mx-auto mt-[10px] p-[16px] rounded-md bg-white laptop:w-[600px]'>
        <div className=' text-[24px] font-bold text-center py-[10px] mb-[3px]'>
            <h1>Add new places</h1>
        </div>
        <form onSubmit={callapi}>
            <div className='flex gap-4 laptop:flex-[2_1_0%]'>
              <div>
                <label className='font-semibold'>Name of place</label>
                <input type="text" placeholder="Enter place" value={name}
          onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className='font-semibold'>Select category</label>
                <select className='laptop:w-[75%]' value={category}
          onChange={(e) => setCategory(e.target.value)}>
                    <option>Restaurants</option>
                    <option>Hotels</option>
                    <option>Attraction Sites</option>
                    <option>Local Eateries</option>
                </select>
              </div>
            </div>
            <label className='font-semibold'>Enter location</label>
            <input type="text" placeholder="Enter location"  value={location}
          onChange={(e) => setLocation(e.target.value)} />
            <h3 className='font-semibold'>Price</h3>
            <div className='flex gap-4'>
              <div>
              <label>Min</label>
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
        <label className="form-label">Rating</label>
        <input
          type="number"
          min="1"
          max="5"
          step="0.1"
          name="review"
          className="font-semibold"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
      </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Add your review</label>
              <textarea   value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }} placeholder='Enter your review' className='ta10em'/>
            </div>
            <div className="mb-3">
        <label className="form-label">Enter the image</label>
        <input
          className="form-control"
          type="file"
          name="avatar"
          onChange={handleImage}
        />
      </div>
        </form>
        <button className='primary-btn mt-[3px]' onClick={callapi}>Submit</button>
    </div>
    </main>
  )
}

export default AddPlace