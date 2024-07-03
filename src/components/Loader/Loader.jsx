import React from 'react'
import "../Loader/Loader.css";

export const Loader = () => {
  return (
    <div className='container'>
        <div className='spinner'></div>
        <div>Fetching Post..</div>
    </div>
  )
}
