import React from 'react'
import "../Ad/Ad.css";

export const Ad = ({data}) => {
  return (
    <div className='overall'>
        <img src= {data.image} alt='image' className='image' width="250px" height="250px"/>
        <div className='name'>{data.name}</div>
        <div className='des'>{data.description}</div>
        <div className='desc'>Price <span className='price'>${data.price}</span></div>
    </div>
  )
}
