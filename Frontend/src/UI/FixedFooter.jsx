import React from 'react'
import { IoHeartOutline } from "react-icons/io5";
import { IoIosSwap } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { UseCart } from '../Contexts/CartProvider';
import { Link } from 'react-router-dom';

export default function FixedFooter() {
    const {cartItems} = UseCart();

    const totalCartCount = cartItems.length;
    return (
        <div className="fixed-bottom-icons d-lg-none">
            <Link to="/wishlist" className="fixed-link">
                <IoHeartOutline style={{fontSize: '20px'}}/>
                <span style={{fontSize: '14px'}}>Wishlist</span>
            </Link>
            <Link to="/compare" className="fixed-link">
                <IoIosSwap style={{fontSize: '20px'}}/>
                <span style={{fontSize: '14px'}}>Compare</span>
            </Link>
            <Link to="/" className="fixed-link">
                <AiOutlineHome style={{fontSize: '20px'}}/>
                <span style={{fontSize: '14px'}}>Home</span>
            </Link>
            <Link to="/cart" className="position-relative fixed-link">
                <RiShoppingBagLine style={{fontSize: '20px'}}/>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle" style={{backgroundColor: '#fd7e14', fontSize: '10px'}}>{totalCartCount}</span>
                <span style={{fontSize: '14px'}}>Cart</span>
            </Link>
            <Link to="/login" className="fixed-link">
                <BiUser style={{fontSize: '20px'}}/>
                <span style={{fontSize: '14px'}}>Account</span>
            </Link>
        </div>
    )
}
