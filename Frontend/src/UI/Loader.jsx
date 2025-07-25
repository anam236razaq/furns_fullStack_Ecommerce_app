import React from 'react'
import {PropagateLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='d-flex align-items-center justify-content-center min-vh-100'>
        <PropagateLoader color='#fd7e14' />
    </div>
  )
}
