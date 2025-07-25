import React from 'react'
import Error from '../../UI/Error';
import Loader from '../../UI/Loader';
import ProductSorting from './ProductSorting';
import { UseProducts } from '../../Contexts/ProductsProvider';
import ProductCard from './ProductCard';

export default function Products() {
    const { products, status, selectedOption, setProducts, setStatus, setSelectedOption } = UseProducts();
    const filteredProducts = products.filter((product)=> !product.category);
    
    return (
    <div className=' d-flex align-items-center justify-content-center'>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
            <div className='container mt-5'>

            {/*Sorting Functionality */}
           <ProductSorting selectedOption={selectedOption} 
                setSelectedOption = {setSelectedOption} 
                setStatus={setStatus} setProducts={setProducts} 
                productsLength={filteredProducts.length}/> 

            <div className='row gy-4 mt-2'>
                {filteredProducts.map((product) => (
                    <div key={product._id} className='d-flex justify-content-center justify-content-md-between col-12 col-sm-6 col-md-4 col-lg-3'>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
        )}
    </div>
    )
}
