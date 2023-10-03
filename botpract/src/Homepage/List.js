import React from 'react'
import { GoLocation } from 'react-icons/go'
import "./List.css"
import Star from './Star'

const List = ( props ) => {
    const handleonclick=()=>{
        props.setP(true)
        props.setQ(props.data.latitude)
        props.setR(props.data.longitude)
        }
        const handleonCLick2=()=>{
          props.showdiv()
          props.setH(props.data)
        }
  return (
    <div className=''>
      <div className='shadow-md border-2 border-slate-300 bg-white  mb-4 w-[450px] cursor-pointer'>
        <div className='ml-6'>
        <img src={"http://localhost:5000/" + props.data.avatar} className="h-[300px] w-[400px]" />
        </div>
        <div className='p-2'>
          <h1 className='font-bold mb-1'>{props.data.name}</h1>
          <div className='flex justify-between py-1'>
            <p>{props.data.review}</p>
            
            <p>Out of {props.data.num_reviews} reviews</p>
          </div>
          <Star review={props.data.review}/>
          <div className='flex justify-between py-1'>
            <p>Price</p>
            <p>{props.data.price}{props.data.maxprice?`-${props.data.maxprice}`:""}</p>
          </div>
          <div className='flex justify-between mb-2 py-1'>
            <p>{props.data.description}</p>
          </div>
              <div className=' flex justify-between mt-4 mb-3'>
                <GoLocation className='hover:scale-110' type="submit" onClick={handleonclick} size={"1.5rem"} color={"blue"}/>
                <p className='col-span-2 text-[12px]'>{props.data.location}</p>
              </div>
              <button className='bg-secondary-color px-2 py-1 rounded-lg text-[12px] mb-1' onClick={handleonCLick2}>Add reviews</button>
        </div>
      </div>
    </div>
  )
}

export default List