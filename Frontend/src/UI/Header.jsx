import { BiUser } from "react-icons/bi";
import { IoMenu, IoSearch, IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link, useNavigate} from "react-router-dom";
import { UseCart } from "../Contexts/CartProvider";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import Empty from "./Empty";

export default function Header() {
  const {cartItems, decreaseQuantity, increaseQuantity, removeFromCart, grandTotal} = UseCart();

  const[showSearch, setShowSearch] = useState(false);
  const[isOpenLink, setIsOpenLink] = useState(false);
  const[showSettings, setShowSettings] = useState(false);
  const[showNavbar, setShowNavbar] = useState(false);
  const[showCart, setShowCart] = useState(false);
  const[activeDropdown, setActiveDropdown] = useState(false);
  const[searchQuery, setSearchQuery] = useState("");
  const[selectedLanguage, setSelectedLanguage]= useState('English');
  const[selectedCurrency, setSelectedCurrency] = useState('$ - USD');
  
  const totalCartCount = cartItems.length;

  function toggleDropdown(dropdownId){
    setActiveDropdown((prev)=> prev === dropdownId? null : dropdownId);
  }

useEffect(()=> {
  document.body.style.overflow = showSettings? 'hidden' : 'auto'
}, [showSettings]);

useEffect(()=> {
  document.body.style.overflow = showCart? 'hidden' : 'auto'
}, [showCart]);

  return (
    <div className="d-flex mx-lg-5 align-items-center justify-content-between p-4 sticky-header">
        
          <Menubar toggleDropdown={toggleDropdown} activeDropdown={activeDropdown} 
            showNavbar={showNavbar} setShowNavbar ={setShowNavbar}/>

          <img src='/src/assets/logo.png' alt="Furns" className="logo-img" />
        
        <div className="d-flex">
            <Search showSearch={showSearch} setShowSearch={setShowSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

            {/*****Settings Icon */}
            <button className="btns-header px-3 d-lg-none position-relative" style={{borderLeft: '2px solid rgb(235, 235, 235)'}}
              onClick={()=>setShowSettings(!showSettings)}>
              <IoSettingsOutline className='icons-header'/>
            </button>
            <div className={` ${showSettings? 'show' : ''} custom-mobile-container d-block d-lg-none`}>
              <div className="d-flex align-items-center justify-content-between p-4 w-100" style={{borderBottom: '1px solid rgb(235, 235, 235)'}}>
                <img src='/src/assets/logo.png' alt="Furns" className="logo-img" />
                <button className="bg-transparent border-0" onClick={()=>setShowSettings(false)}><IoMdClose style={{fontSize: '24px', color: '#fd7e14'}} /></button>
              </div>
              <Dropdown
                  label="Language"
                  options={["English", "Italiano", "Francais", "Filipino"]}
                  selectedOption={selectedLanguage}
                  onOptionSelect={setSelectedLanguage}
              />
              <Dropdown
                  label="Currency"
                  options={["$ - USD", "€ - EUR", "£ - POUND", "₣ - FRANC"]}
                  selectedOption={selectedCurrency}
                  onOptionSelect={setSelectedCurrency}
              /> 
            </div>

            {/****User and Cart Icons */}
            <div className="d-none d-lg-flex">
            <button className="btns-header px-3 position-relative" onClick={()=>setIsOpenLink(!isOpenLink)} style={{borderLeft: '1px solid rgb(184, 184, 184)', borderRight:'1px solid rgb(184, 184, 184)'}}>
              <BiUser className="icons-header"/>
            </button>
            {isOpenLink && (
                <ul className="dropdown-welcome" style={{top: '124px', right: '60px'}}>
                  <li><Link to="/login">Signin</Link></li>
                  <li><Link to="/cart">Cart</Link></li>
                  <li><Link to="/wishlist">Wishlist</Link></li>
                  <li><Link to="/compare">Compare</Link></li>
                  <li><Link to="/dashboard">Admin</Link></li>
                </ul>
            )}
            <button className="btns-header position-relative ps-3" onClick={()=>setShowCart(!showCart)}>
                <RiShoppingBagLine className="icons-header"/>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle" style={{backgroundColor: '#fd7e14', fontSize: '10px'}}>{totalCartCount}</span>
            </button>
            <div className={`${showCart? 'show' : ''} cart-container`}>
              <div className="d-flex align-items-center justify-content-between p-4 w-100" style={{borderBottom: '1px solid rgb(235, 235, 235)'}}>
                <h4>Cart</h4>
                <button className="bg-transparent border-0" onClick={()=>setShowCart(false)}><IoMdClose style={{fontSize: '24px', color: '#fd7e14'}} /></button>
              </div>
              {!cartItems.length? (
                <Empty text="There are no products!" />
              ) : (
                <div className="cart-items">
                {cartItems.map((item)=>(
                  <div key={item.id} className="d-flex justify-content-between align-items-start" style={{borderBottom: '1px solid rgb(235, 235, 235)'}}>
                    <div className="d-flex m-4">
                    <img src={item.img} className="me-3"  alt={item.name} style={{height: '130px', width: '130px', objectFit: 'cover'}}/>
                    <div className="d-flex flex-column">
                      <span style={{fontSize: '14px'}}>{item.name}</span>
                      <span style={{fontSize: '12px', color: '#808080'}}>{item.selectedSize}/{item.selectedColor}</span>
                      <div className="my-2">
                        <span>{item.quantity}</span>*<span style={{color: '#fd7e14'}}>${item.salePrice || item.price}</span>
                      </div>
                      <div className='cart-quantity-container'>
                        <button className='cart-quantity-btn' onClick={()=>decreaseQuantity(item.id)}>-</button>
                        <span className='cart-quantity-text'>{item.quantity}</span>
                        <button className='cart-quantity-btn' onClick={()=>increaseQuantity(item.id)}>+</button>
                      </div>
                    </div>
                  </div>
                  <button className="btn-remove me-4 mt-4" onClick={() => removeFromCart(item.id)}>
                      <IoMdClose  style={{fontSize: '24px'}} />
                    </button>
                  </div>
                ))}
              </div>
              )}
              <div className="cart-total-container">
                <div className="cart-total">
                  <Link to="/cart" className="ms-3 text-decoration-none text-light fs-6">View Cart</Link>
                  <span className="me-3 total-value-container">${grandTotal}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

function Menubar({toggleDropdown, activeDropdown, showNavbar, setShowNavbar}){
  return (
    <>
    <button className="btns-header d-lg-none" onClick={()=>setShowNavbar(!showNavbar)}>
          <IoMenu className="icons-header" style={{fontSize: '30px'}}/>
        </button>
        <div className={` ${showNavbar? 'show' : ''} custom-mobile-container d-block d-lg-none`}>
              <div className="d-flex align-items-center justify-content-between p-4 w-100" style={{borderBottom: '1px solid rgb(235, 235, 235)'}}>
                <img src='/src/assets/logo.png' alt="Furns" className="logo-img" />
                <button className="bg-transparent border-0" onClick={()=>setShowNavbar(false)}><IoMdClose style={{fontSize: '24px', color: '#fd7e14'}} /></button>
              </div>
              <ul className="m-3 custom-mobile-navlinks">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li className="position-relative">
                    <Link to="/" onClick={(e)=>{
                      e.preventDefault();
                      toggleDropdown('home-furniture');
                      }} className="d-flex justify-content-between">
                        Home Furniture
                        {activeDropdown === "home-furniture"? <FiMinus /> : <GoPlus />}
                      </Link>
                    <ul className={`${activeDropdown === "home-furniture"? "" : 'd-none'}`}>
                        <li><Link to="/collection/bedroom">Bedroom</Link></li>
                        <li><Link to="/collection/dining">Dining</Link></li>
                        <li><Link to="/collection/living">Living</Link></li>
                    </ul>
                </li>
                <li className="position-relative">
                    <Link to="/" onClick={(e)=> {
                        e.preventDefault();
                        toggleDropdown('office-furniture');
                    }} className="d-flex justify-content-between">
                      Office Furniture
                      {activeDropdown === "office-furniture"? <FiMinus /> : <GoPlus />}
                    </Link>
                    <ul className={`${activeDropdown === "office-furniture"? "custom-mobile-dropdown" : 'd-none'}`}>
                        <li><Link to="/collection/lounge">Lounge</Link></li>
                        <li><Link to="/collection/office-chair">Office Chair</Link></li>
                        <li><Link to="/collection/office-table">Office Table</Link></li>
                    </ul>
                </li>
                <li className="position-relative">
                    <Link to="/" onClick={(e)=> {
                        e.preventDefault();
                        toggleDropdown('hospital-furniture');
                    }} className="d-flex justify-content-between">
                      Hospital Furniture
                      {activeDropdown === "hospital-furniture"? <FiMinus /> : <GoPlus />}
                    </Link>
                    <ul className={`${activeDropdown === "hospital-furniture"? "custom-mobile-dropdown" : 'd-none'}`}>
                        <li><Link to="/collection/hospital-bed">Hospital Bed</Link></li>
                        <li><Link to="/collection/hospital-utility">Hospital Utility</Link></li>
                    </ul>
                </li>
                <li><Link to="/contact-us">Contact</Link></li>
            </ul>
        </div>
      </>
  )
}

function Search({showSearch, setShowSearch, searchQuery, setSearchQuery}){
  const navigate = useNavigate();
  
  return(
    <>
      <button className="btns-header px-3 position-relative" onClick={()=>setShowSearch(true)}>
        <IoSearch className="icons-header"  />
      </button>
      {showSearch && <div className="modal-overlay" onClick={()=>setShowSearch(false)}>
        <div className={`search-container ${showSearch? 'show' : ''}`} onClick={(e)=>e.stopPropagation()}>
          <form className="input-container">
            <input className="w-100" type="text" placeholder="Enter your search keyword..." 
              value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
            <button type="submit" className="btn-search" disabled={!searchQuery.trim()}  style={{
              backgroundColor: !searchQuery.trim() ? "#fc9744" : "#fd7e14",}} onClick={()=>navigate(`/search/${searchQuery}`)}>
              <IoSearchOutline style={{fontSize: '24px', color: 'white'}} />
            </button>
          </form>
          <button className="bg-transparent border-0" onClick={()=>setShowSearch(false)}><IoMdClose style={{fontSize: '24px', color: '#fd7e14'}} /></button>
        </div>
      </div>
    }
    </>
  )
}

function Dropdown({label, options, selectedOption, onOptionSelect}){
  const[isOpen, setIsOpen] = useState(false);

  function handleSelect(option){
    onOptionSelect(option)
    setIsOpen(false);
  }

  return(
    <div className="d-flex flex-column m-4">
      <label className="mb-2">{label}</label>
      <div className='custom-select-container w-100'>
        <div className='custom-select' style={{border: '1px solid rgb(235, 235, 235 )'}} onClick={()=>setIsOpen(!isOpen)}>
          {selectedOption}
        </div>
        {isOpen && <div className='custom-options'>
          {options.map((option)=>(
            <div key={option} 
              className={`custom-option ${option === selectedOption? "selected" : ""}`}
              onClick={()=>handleSelect(option)}>{option}</div>
          ))}
          </div>
        }
    </div>
  </div>
  )
}
