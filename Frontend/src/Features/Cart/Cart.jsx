import React from 'react'
import Welcome from '../../UI/Welcome'
import Header from '../../UI/Header'
import Navbar from '../../UI/Navbar'
import PageHeader from '../../UI/PageHeader'
import Footer from '../../UI/Footer'
import CopyRight from '../../UI/CopyRight'
import { UseCart } from '../../Contexts/CartProvider'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Empty from '../../UI/Empty'

export default function Cart() {
    const {cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, grandTotal} = UseCart();

  return (
    <>
        <Welcome />
        <Header />
        <Navbar />
        <PageHeader title='cart' bCrumbItem1 ='Home' bCrumbActive = 'cart'/>
        <CartData cartItems={cartItems} removeFromCart={removeFromCart} 
            increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart} grandTotal={grandTotal}/>
        <Footer />
        <CopyRight/>
    </>
  )
}


function CartData({cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, grandTotal}){

    return !cartItems.length ? (
            <Empty text="There are no products in your cart!"/>
        ) : (
            <>
            <div className="container my-5 custom-scroll-container">
                <div className='scroll-content'>
                    <div className='row'>
                        <ul className='col-12 mb-0 d-flex justify-content-between align-items-center list-unstyled text-uppercase fw-bold p-4' style={{backgroundColor: 'rgb(197, 197, 197)'}}>
                            <li className='list-image'>Image</li>
                            <li className='list-name'>Product name</li>
                            <li className='list-price'>Until Price</li>
                            <li className='list-quantity'>Qty</li>
                            <li className='list-total'>Subtotal</li>
                            <li className='list-action'>action</li>
                        </ul>
                        {cartItems.map((item) => (
                            <div key={item.id} className='d-flex justify-content-between align-items-center p-3 pe-4' style={{borderBottom: '1px solid rgb(235, 235, 235) '}}>
                                <div style={{width: '20%'}}>
                                    <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                </div>
                                <div style={{width: '24%'}} className='ms-5'>
                                    <h6 >{item.name}</h6>
                                    <p>{item.selectedSize}/{item.selectedColor}</p>
                                </div>
                                <p style= {{width: '20%'}} className='mb-0'>{item.salePrice || item.price}</p>
                                <div style={{width: '21%'}}>
                                    <div className='cart-quantity-container'>
                                        <button className='cart-quantity-btn' onClick={()=>decreaseQuantity(item.id)}>-</button>
                                        <span className='cart-quantity-text'>{item.quantity}</span>
                                        <button className='cart-quantity-btn' onClick={()=>increaseQuantity(item.id)}>+</button>
                                    </div>
                                </div>
                                <p className='mb-0' style={{width: '11%'}}>{(item.salePrice || item.price) * item.quantity}.00</p>
                                <button className="btn-remove me-5" onClick={() => removeFromCart(item.id)}>
                                    <MdDeleteOutline className='cart-remove-icon' />
                                </button>
                            </div>
                        ))}
                        <div className='d-flex align-items-center justify-content-end p-3'>
                            <h6 className='me-3' style={{color: '#fd7e14'}}>Grand Total:</h6>
                            <h6 className=' me-5'>${grandTotal}.00</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container d-flex flex-lg-row flex-column justify-content-between my-4 p-4' style={{backgroundColor: 'rgb(235, 235, 235)'}}>
                <form className='col-12 col-md-6 d-flex flex-column flex-md-row coupon-form'>
                    <input className='form-control mb-3 mb-md-0 input-coupon' type='text' placeholder='Enter your coupon code if you have one' />
                    <button className='btn-coupon' type='submit'>Apply Coupon</button>
                </form>
                <div className='col-12 col-md-6 d-flex justify-content-between justify-content-lg-end  mt-3 mt-lg-0' style={{gap: '30px'}}>
                    <button className='btn-clear-cart' onClick={()=>clearCart()}>Clear Cart</button>
                    <Link to="/login" className='btn-checkout'>Proceed to checkout</Link>
                </div>
            </div>
        </>
        )
}