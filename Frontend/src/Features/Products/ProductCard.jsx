import React, { useState } from 'react'
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { HiArrowsPointingOut } from 'react-icons/hi2';
import { IoIosSwap } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { UseProducts } from '../../Contexts/ProductsProvider';
import { MdOutlineDelete } from 'react-icons/md';
import ProductQuickView from './ProductQuickView';

export default function ProductCard({product}) {
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const {addToWishList, wishList, removeToWishList,  compareList, addToCompareList, removeToCompareList} = UseProducts();

  const token = localStorage.getItem('authToken');
  const isLoggedIn = !!token;

  const isInWishlist = wishList.some((item)=>item._id === product._id);
  const isInCompareList =compareList.some((item)=> item._id === product._id);

  return (
    <div className="my-3 p-2" style={{width: '20rem'}}>
      <div className='card border-0 hover-card'>
        <div className='position-relative'>

            {/*Wishlist icon */}
            <div className='position-absolute wishlist-button' style={{top: '15px', right: '14px'}}>
              {isInWishlist? (
                <button className='action-button' title="Remove from Wishlist"
                  onClick={()=>removeToWishList(product)}>
                      <MdOutlineDelete className='btn-delete'/>
              </button>
              ) : (
                <button className='action-button' title="Add to Wishlist"
                onClick={()=> isLoggedIn? addToWishList(product) : navigate('/login')}>
                      <IoHeartOutline style={{fontSize: '24px'}} />
                </button>
              )}
            </div>

              {/*Quick View and Add To Compare Icon */}
              <div className='position-absolute d-flex flex-column hover-buttons' style={{ top: '70px', right: '14px', gap: '14px'}}>
                  <button className='action-button' title='Quick View' onClick={()=>setIsModal(true)}>
                      <HiArrowsPointingOut style={{fontSize: '24px'}}/>
                  </button>
                  {isInCompareList ? (
                      <button className='action-button' title='Remove from Compare'
                        onClick={()=>removeToCompareList(product)}>
                        <MdOutlineDelete className='btn-delete'/>
                      </button>
                  ) : (
                    <button className='action-button' title='Add to Compare' 
                        onClick={()=> isLoggedIn? addToCompareList(product) : navigate('/login')}>
                      <IoIosSwap style={{fontSize: '24px'}}/>
                    </button>
                  )}
              </div>

              {/*Discount Functionality */}
              {product.discount && (
                <div className='position-absolute px-2 py-1 bg-danger text-white rounded-2'
                  style={{zIndex: '1', fontSize: '13px', top: '20px', left: '20px'}}>
                  {product.discount}
                </div>
              )}

              {product.stock[0] === 'Out of Stock' && (
                <div className='position-absolute px-2 py-1 text-white rounded-2'
                  style={{zIndex: '1', fontSize: '13px', top: '60px', left: '20px', backgroundColor: '#fd7e14'}}>
                  Stock Out
                </div>
              )}

                <div className='position-absolute d-flex align-items-center justify-content-center hover-buttons w-100' style={{ bottom: '16px',}}>
                  {product.stock[0] !== 'Out of Stock' ? (
                    <button className='btn-action-cart' onClick={()=>navigate(`/product/${product._id}`)}>
                      <IoCartOutline style={{fontSize: '24px'}}/>
                      <span>Select Options</span>
                    </button>
                  ) : (
                    <button className='btn-action-stock'>
                      <IoCartOutline style={{fontSize: '24px'}}/>
                      <span>Out Of Stock</span>
                    </button>
                  )}
                  </div>
                  
                  <img src ={product.img} alt={product.name} className="img-fluid product-card-img"
                          onClick={()=>navigate(`/product/${product._id}`)}/>
                  </div>
                  <div className="card-body d-flex align-items-center justify-content-center flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <h6 className="card-subtitle my-2 text-body-secondary">

                      {/*SalePrice and Price Functionality */}
                      {product.salePrice ? (
                        <>
                          <span style={{textDecoration: 'line-through', marginRight: '8px'}}>${product.price}</span>
                          <span>${product.salePrice}</span>
                        </>
                        ) : (
                            <span>${product.price}</span>
                        )}

                        </h6>
                    </div>
                  </div>
                  
                  <div className={`modal fade ${isModal ? 'show' : ''}`} style={{ display: isModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
                  tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden={!isModal} onClick={() => setIsModal(false)}>
                    <div className="modal-dialog modal-xl" style={{display: 'flex', alignItems: 'center', justifyContent: 'center',width: '98%', maxWidth: '1000px' }} >
                      <div className="modal-content w-100">
                        <div className="modal-header" style={{borderBottom: 'none'}}>
                          <button type="button" className="btn-close"  onClick={() => setIsModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <ProductQuickView product={product} isLoggedIn={isLoggedIn} marginTop="my-2" />
                        </div>
                      </div>
                  </div>
                </div>
            </div>
  )
}
