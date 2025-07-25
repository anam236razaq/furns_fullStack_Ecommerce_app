import React from 'react'
import { RiShoppingBag4Line } from 'react-icons/ri'

export default function Empty({text}) {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center my-5 py-5'>
        <RiShoppingBag4Line style={{fontSize: '110px', color: '#fd7e14'}}/>
        <h6 className='fs-5 mt-3'>{text}</h6>
    </div>
  )
}
