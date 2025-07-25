import React from 'react'
import { Link } from 'react-router-dom'

export default function CopyRight() {
  return (
    <div className='container-fluid copyright-container px-5 d-flex flex-column flex-md-row' >
        <p className='mb-0 order-2 order-md-1 text-center'>&copy;2024, Furns.Made With ❤️ by <Link className='copyright-link' to= "https://hasthemes.com/">HasThemes</Link></p>
        <div className='order-1 order-md-2 mb-2 mb-md-0'>
            <img src='/src/assets/payment_imgs.png' alt='Payment Images' />
        </div>
    </div>
  )
}
