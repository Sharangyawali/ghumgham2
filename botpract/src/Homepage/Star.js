import React from 'react'
import {BsStar,BsStarFill,BsStarHalf} from "react-icons/bs"
import "./Star.css"
export default function Star(props) {
    const rating=Array.from({length:5},(_,index)=>{
        return (
            <span key={index}>
              {
                props.review >index+0.7
                ?<BsStarFill/>
                :(props.review>index+0.2&&props.review<=index+0.7)
                ?<BsStarHalf/>
                :<BsStar/>
              }
            </span>
          )
    })
    return(
        <div  className='icon'>
            {rating}
        </div>
    )

}
