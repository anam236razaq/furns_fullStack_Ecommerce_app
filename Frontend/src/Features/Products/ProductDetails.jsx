import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../UI/Loader';
import Welcome from '../../UI/Welcome';
import Header from '../../UI/Header';
import Navbar from '../../UI/Navbar';
import PageHeader from '../../UI/PageHeader';
import Footer from '../../UI/Footer';
import CopyRight from '../../UI/CopyRight';
import SingleProductData from './SingleProductData';
import axios from 'axios';
import { debounce } from "lodash";

export default function ProductDetails() {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
   
        const fetchProduct = useCallback(debounce(async () => {
            try{
                const response = await axios.get(`http://127.0.0.1:3000/api/v1/products/${productId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setProduct(response?.data?.data?.product);
            }catch(error){
                console.error(error);
            }
        }, 500), []);
        

        useEffect(()=> {
            fetchProduct();
        }, [productId]);
  
  
    if (!product) return <Loader />
  
    return (
        <>
            <Welcome />
            <Header />
            <Navbar />
            <PageHeader title={product.name} bCrumbItem1="Home" bCrumbItem2="Shop" bCrumbActive={product.name}/>
            <SingleProductData product={product} marginTop='my-5'/>
            <Footer />
            <CopyRight />
        </>
  )
}

