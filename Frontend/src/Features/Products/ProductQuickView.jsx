import React, { useState } from 'react'
import { UseCart } from '../../Contexts/CartProvider';
import { UseProducts } from '../../Contexts/ProductsProvider';
import Swal from 'sweetalert2';
import { IoHeartOutline } from 'react-icons/io5';
import { IoIosSwap } from 'react-icons/io';
import { FaFacebookSquare, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ProductQuickView({product, marginTop, isLoggedIn}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("Gold");
  const {addToCart} = UseCart();
  const {addToWishList, wishList, removeToWishList,compareList, addToCompareList, removeToCompareList } = UseProducts();

  const isInWishlist = wishList.some((item)=>item._id === product._id);
  const isInCompareList =compareList.some((item)=> item._id === product._id);

  const handleAddToCart=()=>{
      if(product.stock > 0){
          addToCart({...product, quantity, selectedSize, selectedColor});

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

  function increaseQuantity(){
      if(quantity < product.stock){
          setQuantity(prevQuantity => prevQuantity+1);
      }
  }

  function decreaseQuantity(){
      if(quantity > 1){
          setQuantity(prevQuantity => prevQuantity-1);
      }
  }

return (

      <div className={`container d-flex flex-column flex-md-row ${marginTop}`}>
          <div className='col-12 col-md-6 mb-4 me-lg-5 me-md-4 mb-lg-0 product-image-container flex-fill'>
              <img src={product.img} alt={product.name} className='product-image'/>
          </div>
          <div className='col-12 col-md-6 flex-fill'>
              <h6>SKU: {product.sku}</h6>
              <div className='d-flex'>
                  <h6>Availability:</h6>
                  {product.stock === 'Out of Stock' ? (
                      <span className='ms-1' style={{ marginTop: '-2px' }}>Out of Stock</span>
                  ): (
                      <span className='ms-1' style={{ marginTop: '-2px' }}>{product.stock} in Stock</span>
                  )}
              </div>
              <h3>{product.name}</h3>
              {product.salePrice ? (
                  <div className=' mt-2'>
                      <span style={{textDecoration: 'line-through', marginRight: '8px', fontSize: '24px'}}>${product.price}</span>
                      <span style={{fontSize: '24px'}}>${product.salePrice}</span>
                  </div>
              ) : (
                  <span>${product.price}</span>
              )}
              <p className='mt-2 product-desc'>{product.description}</p>

              <CustomSelect label="Size" options={product.size} selectedOption={selectedSize}
                  onOptionSelect={setSelectedSize} />

              <CustomSelect label="Color" options={product.color} selectedOption={selectedColor}
                  onOptionSelect={setSelectedColor} />

              <div className='my-4 d-flex'>
                  <div className='me-3 quantity-container'>
                      <button className='btn-quantity' onClick={decreaseQuantity}>-</button>
                      <span className='text-quantity'>{quantity}</span>
                      <button className= 'btn-quantity' onClick={increaseQuantity}>+</button>
                  </div>
                  {product.stock === 'Out of Stock' ? (
                      <button className='btn-stock' disabled>Out Of Stock</button> 
                  ) : (
                      <button className='btn-cart' onClick={handleAddToCart}>Add to Cart</button>
                  )}
                  
              </div>
              <div className='mb-3'>
                  {isInWishlist ? (
                      <button className='me-3 btn-wishlist-compare' onClick={()=>removeToWishList(product)}>
                          <IoHeartOutline className='me-1' style={{marginTop: '-3px', fontSize: '18px'}}/>
                          <span>Remove From wishlist</span>
                      </button>
                  ) : (
                      <button className='me-3 btn-wishlist-compare' onClick={()=> isLoggedIn? addToWishList(product) : navigate('/login')}>
                          <IoHeartOutline className='me-1' style={{marginTop: '-3px', fontSize: '18px'}}/>
                          <span>Add to wishlist</span>
                      </button>
                  )}
                  {isInCompareList? (
                      <button className='btn-wishlist-compare' onClick={()=>removeToCompareList(product.id)}>
                          <IoIosSwap className='me-1' style={{marginTop: '-3px', fontSize: '18px'}}/>
                          <span>Remove from Compare</span>
                      </button>
                  ) : (
                      <button className='btn-wishlist-compare' onClick={()=>isLoggedIn? addToCompareList(product) : navigate('/login')}>
                          <IoIosSwap className='me-1' style={{marginTop: '-3px', fontSize: '18px'}}/>
                          <span>Add to Compare</span>
                      </button>
                  )}
              </div>
              <div className='d-flex'>
                  <h6 className='me-3'>Share:</h6>
                  <div style={{ marginTop: '-4px', display: 'flex', gap: '14px'}}>
                      <Link to ="https://www.facebook.com"><FaFacebookSquare className='social-icons' /></Link>
                      <Link to ="https://www.twitter.com"><FaTwitter className='social-icons' /></Link>
                      <Link to ="https://www.linkedin.com"><FaLinkedin className='social-icons'/></Link>
                  </div>
              </div>
              
          </div>
    </div>
  )
}

function CustomSelect({label, options, selectedOption, onOptionSelect}){
  const[isOpen, setIsOpen] = useState(false);

  const toggleDropdown =()=>setIsOpen(!isOpen);

  const handleOptionSelect =(option)=>{
      onOptionSelect(option);
      setIsOpen(false);
  }

  return(
      <div className='custom-select-container' style={{marginBottom: '2rem', maxWidth: '310px'}}>
          <h6>{label}</h6>
          <div className='custom-select' onClick={toggleDropdown} style={{border: '1px solid rgb(235, 235, 235)'}}>
              {selectedOption}
          </div>
          {isOpen && (
              <div className='custom-options'>
                  {options.map((option)=>(
                      <div key={option} className={`custom-option ${option === selectedOption? "selected" : ""}`} 
                          onClick={()=>handleOptionSelect(option)}>{option}</div>
                  ))}
              </div>
          )}
      </div>
  )
}