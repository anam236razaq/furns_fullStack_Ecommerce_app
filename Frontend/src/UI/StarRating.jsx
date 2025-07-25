import React, { useState } from 'react'
import { IoStar, IoStarOutline } from 'react-icons/io5';

export default function StarRating({rating, onRatingChange}) {
  return (
        <div className='d-flex' style={{gap: '4px'}}>
            {Array.from({length: 5}, (_, i)=> <Star key ={i} onRate = {()=>onRatingChange(i+1)}
                full={rating >= i+1} />)}
        </div>
  )
}

function Star({onRate, full}){
    return (
        <div style={{color: '#fd7e14'}} >
            <span onClick={onRate}>{full? <IoStar /> :<IoStarOutline /> }</span>
        </div>
    )
}
