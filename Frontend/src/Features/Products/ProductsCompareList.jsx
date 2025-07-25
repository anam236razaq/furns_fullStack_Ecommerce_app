import React from 'react'
import Welcome from '../../UI/Welcome'
import Header from '../../UI/Header'
import Navbar from '../../UI/Navbar'
import PageHeader from '../../UI/PageHeader'
import Footer from '../../UI/Footer'
import CopyRight from '../../UI/CopyRight'
import { UseProducts } from '../../Contexts/ProductsProvider'
import { UseCart } from '../../Contexts/CartProvider'
import Empty from '../../UI/Empty'
import { MdDeleteOutline } from 'react-icons/md'
import Swal from 'sweetalert2'


export default function ProductsCompareList() {
  return (
    <>
        <Welcome />
        <Header />
        <Navbar />
        <PageHeader title='compare' bCrumbItem1 ='Home' bCrumbActive = 'compare'/>
        <CompareList />
        <Footer />
        <CopyRight />
    </>
  )
}

function CompareList(){
    const { compareList, removeToCompareList} = UseProducts();
    const {addToCart, cartItems} = UseCart();  

    const handleAddToCart = (product)=>{
        if(product.stock > 0){
            addToCart({...product, quantity: 1});

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer,
                  toast.onmouseleave = Swal.resumeTimer
                }
              })
      
              Toast.fire({
                icon: 'success',
                title: 'Successfully Add!',
                text: `${product.name} is added to cart`,
              });
        }
    }
  
    return !compareList.length ? (
        <Empty text="There are no products in your compare list!"/>
    ) : (
        <div className="container my-5 custom-scroll-container">
            <div className='scroll-content'>
                <div className='row'>
                    <ul className='col-12 mb-0 d-flex justify-content-between align-items-center list-unstyled text-uppercase fw-bold p-4' style={{backgroundColor: 'rgb(197, 197, 197)'}}>
                        <li className='list-image'>Image</li>
                        <li className='list-name'>Product name</li>
                        <li className='list-price'>Until Price</li>
                        <li className='list-quantity'>Add to cart</li>
                        <li className='list-action'>action</li>
                    </ul>
                    {compareList.map((item) => (
                        <div key={item.id} className='d-flex justify-content-between align-items-center p-3 pe-4' style={{borderBottom: '1px solid rgb(235, 235, 235) '}}>
                            <div style={{width: '20%'}}>
                                <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            </div>
                            <h6 style={{width: '22%'}}>{item.name}</h6>
                            <p style= {{width: '17%'}} className='mb-0'>{item.salePrice || item.price}</p>
                            <div style={{width: '18%'}}>
                                {item.stock[0] === 'Out of Stock' ? (
                                    <button className='btn-cart-wishlist' disabled style={{backgroundColor: ' #fc9744'}}>Out Of Stock</button> 
                                ) : (
                                    <button className='btn-cart-wishlist' onClick={()=>handleAddToCart(item)} disabled={cartItems.some((cartItem)=> cartItem.id === item.id)}>
                                        {cartItems.some((cartItem)=> cartItem.id === item.id)? 'Already Added' : 'Add to cart'}
                                    </button>
                                )}
                               
                            </div>
                            <button className="btn-remove me-5" onClick={() => removeToCompareList(item)}>
                                <MdDeleteOutline className='cart-remove-icon' />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
