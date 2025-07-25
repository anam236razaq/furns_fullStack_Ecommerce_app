import React from 'react'
import { FaFacebook, FaLinkedin, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IoIosSend } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function Footer() {
    
    function handleSubmit(e){
        e.preventDefault();
    }
    
  return (
    <div className='container-fluid px-5 d-flex' 
        style={{backgroundColor: 'rgb(39, 42, 64)', color: 'white', padding: '4rem 0'}}>
        <div className='row'>
            <div className='col-12 col-sm-12 col-md-6 col-lg-3 mb-4'>
                <div>
                    <h6 className='mb-3' style={{fontSize: '18px', textTransform: 'uppercase', fontWeight: '400'}}>About Us</h6>
                    <p>Lorem ipsum dolor sit amet cons adipisicing elit sed do eiusm 
                        tempor incididunt ut labor et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
                </div>
                <div className='d-flex align-items-center justify-lg-between' style={{width: '70%'}}>
                    <Link className='footer-social-links' to="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></Link>
                    <Link className='footer-social-links' to="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></Link>
                    <Link className='footer-social-links' to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></Link>
                    <Link className='footer-social-links' to="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></Link>
                    <Link className='footer-social-links' to="https://www.pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterest /></Link>
                </div>
            </div>
            <div className='col-12 col-sm-6 col-lg-2 d-flex flex-column footer-info-account mb-4'>
                <h6 className='mb-3' style={{fontSize: '18px', textTransform: 'uppercase', fontWeight: '400'}}>Information</h6>
                <div className='d-flex flex-column'>
                    <Link className='footer-links' to="/">About Us</Link>
                    <Link className='footer-links' to="/">Manufactures</Link>
                    <Link className='footer-links' to="/">Tracking Order</Link>
                    <Link className='footer-links' to="/">Privacy & Policy</Link>
                    <Link className='footer-links' to="/">Terms & Conditions</Link>
                </div>
            </div>
            <div className='col-12 col-sm-6 col-lg-2 d-flex flex-column footer-info-account mb-4'>
                <h6 className='mb-3' style={{fontSize: '18px', textTransform: 'uppercase', fontWeight: '400'}}>My Account</h6>
                <div className='d-flex flex-column align-items-start'>
                    <Link className='footer-links' to="/login">Login</Link>
                    <Link className='footer-links' to="/cart">Cart</Link>
                    <Link className='footer-links' to="/wishlist">Wishlist</Link>
                    <Link className='footer-links' to="/compare">Compare</Link>
                    <Link className='footer-links' to="/login">My Account</Link>
                </div>
            </div>
            <div className='col-12 col-sm-6 col-lg-3'>
                <h6 className='mb-3' style={{fontSize: '18px', textTransform: 'uppercase', fontWeight: '400'}}>NewsLetter</h6>
                <form className='d-flex flex-column' onCanPlay={handleSubmit}>
                    <input className='newsletter-input' type='email' placeholder='Enter Email Address' required />
                    <button type='submit' className='w-50 newsletter-btn'><IoIosSend />Subscribe</button>
                </form>
            </div>
        </div>
    </div>
  )
}
