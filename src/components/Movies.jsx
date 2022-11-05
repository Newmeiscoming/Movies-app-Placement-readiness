import { useState } from "react";
import { useEffect } from "react";
import Tiles from "./Tiles";
import {AiOutlineArrowLeft,AiOutlineArrowRight} from "react-icons/ai";

import "./tiles.css"
import Tiles2 from "./Tiles2";

function Movies() {
  const [data,setData] = useState([]);
  const [input,setInput] = useState("");
  const [sliderValue,setSliderValue] = useState(0);
  const [sliderValue2,setSliderValue2] = useState(0);
  const [favourites,setFavourites] = useState(new Array());
  const [refresh,setRefresh] = useState(false);
  useEffect(()=>{
      fetch("http://www.omdbapi.com/?i=tt3896198&apikey=de599a81&s=marvel&page=1")
      .then((res)=>res.json())
      .then((res)=>setData(res.Search));
      },[refresh])
      function search(e){
          setInput(e.target.value);
          console.log(input)
          
        
      }
      function slider(direction){
        if (direction === "left") {
          if (sliderValue > 0) {
            setSliderValue(sliderValue - 1);
          }
        } else {
          if (sliderValue < 2) {
            setSliderValue(sliderValue + 1);
          }
        }
      }
      function slider2(direction){
        if (direction === "left") {
          if (sliderValue2 > 0) {
            setSliderValue2(sliderValue2 - 1);
          }
        } else {
          if (sliderValue2 < 2) {
            setSliderValue2(sliderValue2+ 1);
          }
        }
      }
      const filterData = data.filter((data) => {
        if (input === "") {
            return data
        }
        else {
            if (data.Title.toLowerCase().includes(input)) {
                return data
            }

        }
    })
    function select(movie){
     
      if(favourites.includes(movie)){
        return;
      }
      favourites.push(movie);
      if(refresh){
        setRefresh(false);
      }
      else{
        setRefresh(true)
      }
        
    }
  
  return (
    <div className="movies">
      <section>

      <nav className="nav">
        <h1>Movies</h1>
        <input type="search" onChange={e=>search(e)} placeholder="Search by name" />
      </nav>
      <div style={{transform:`translateX(${sliderValue*-100}vw)`,transition: "all 1.5s ease"}} className="table">
        {filterData.map((e,i)=>{
          return <Tiles movie = {e} key={i} favourites = {select}/>
        })}
      </div>
      <div>

      <button onClick={()=>slider("left")}><AiOutlineArrowLeft/></button>
      <button onClick={()=>slider("right")}><AiOutlineArrowRight/></button>
      </div>
        </section>
        <section>
          <nav><h1>Favourites </h1> </nav>
          <div style={{transform:`translateX(${sliderValue2*-100}vw)`,transition: "all 1.5s ease"}} className="table">
        {favourites.map((e,i)=>{
          return <Tiles2 movie = {e} />
        })}
      </div>
      <div>

      <button onClick={()=>slider2("left")}><AiOutlineArrowLeft/></button>
      <button onClick={()=>slider2("right")}><AiOutlineArrowRight/></button>
      </div>

        </section>
      
    </div>
  );
}

export default Movies;
