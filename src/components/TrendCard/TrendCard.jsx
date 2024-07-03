import React, { useEffect, useState } from 'react'
import './TrendCard.css'
import { getAdData } from '../../api/AdDataRequests.js';
import toast from "react-hot-toast";
import { Ad } from '../Ad/Ad';
const TrendCard = () => {
    const [id,setId] = useState(-1);
    const [data,setData] = useState({});
    const max = 10;
    const min = 1;
    useEffect(async(req,res)=>{
        const id = Math.floor(Math.random() * (max - min + 1)) + min;
        setId(id);
        try{
            const data = await getAdData(id);
            setData(data.data);
        }
        catch(error){
            console.log(error);
        }
    },[])
  return (
   <div className="TrendCard">
       <h3>Sponsored</h3>

       <Ad data= {data}/>

       
   </div>
  )
}

export default TrendCard