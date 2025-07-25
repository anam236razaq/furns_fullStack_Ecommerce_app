import React, { useEffect, useState } from 'react'
import Welcome from './Welcome'
import Header from './Header'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import Footer from './Footer'
import CopyRight from './CopyRight'
import { useParams } from 'react-router-dom'
import { UseProducts } from '../Contexts/ProductsProvider'
import Loader from './Loader'
import Error from './Error'
import ProductSorting from '../Features/Products/ProductSorting'
import ProductCard from '../Features/Products/ProductCard'
import Empty from './Empty'

export default function Search() {
    const {originalProducts, status, products, selectedOption, setProducts, setSelectedOption, setStatus} = UseProducts();
    const[filteredProducts, setFilteredProducts] = useState([]);
    const {query} = useParams();

    useEffect(()=>{
        if(query){
            const filtered = products.filter((product)=>
                product.name.toLowerCase().includes(query.toLowerCase()));
            setFilteredProducts(filtered);
        }else{
            setFilteredProducts([]);
        }
    }, [query, products, selectedOption]);

  return (
    <>
        <Welcome />
        <Header />
        <Navbar />
        <PageHeader title='Search' bCrumbItem1 ='Home' bCrumbItem2="search" bCrumbActive = {query}/>
            {filteredProducts.length === 0 ? (
                <Empty text= "There are no products related to this query!"/>
            ) : (
                <div className='d-flex align-items-center justify-content-center'>
                    {status === 'loading' && <Loader />}
                    {status === 'error' && <Error />}
                    {status === 'ready' && (
                    <div className='container mt-5'>

                        {/*Sorting Functionality */}
                        <ProductSorting products={products} selectedOption={selectedOption} 
                        setSelectedOption = {setSelectedOption} originalProducts={originalProducts} 
                        setStatus={setStatus} setProducts={setProducts} productsLength={filteredProducts.length}/>

                    <div className='row gy-4 mt-2'>
                        {filteredProducts.map((product) => (
                            <div key={product.id} className='d-flex justify-content-center justify-content-md-between col-12 col-sm-6 col-md-4 col-lg-3'>
                                <ProductCard product={product}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
        )}
        <Footer />
        <CopyRight />
    </>
  )
}
