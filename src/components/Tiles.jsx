import React from 'react'
import { useState } from 'react';
import { AiFillHeart } from "react-icons/ai";
import "./tiles.css"

const Tiles = ({movie,key,favourites}) => {
    const [visible,setVisible] = useState("none");
    const [color,setColor] = useState("white");
  return (
    
    <div className='tiles' onMouseEnter={()=>{setVisible("block")}} onMouseLeave={()=>{setVisible("none")}}>

    <img src={movie.Poster} alt="" />
    <div className='favourite' style={{display:visible}} onClick={()=>{
            favourites(movie)
            setColor("red")
        }}  >
        Add to favourites  <span ><AiFillHeart style={{color:color}}/></span>
    </div>
    </div>
  )
}

export default Tiles