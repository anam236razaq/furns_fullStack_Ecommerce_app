import axios from 'axios';
import React, { useState } from 'react'

export default function ProductSorting({ setProducts, selectedOption, setSelectedOption, setStatus, productsLength}) {
    const[isopen, setIsOpen]=useState(false);
    const options=["Relevance", "Name (A-Z)", "Name (Z-A)", "Price (Low-high)", "Price (high-low)"];

    const toggleDropdown = ()=> setIsOpen(!isopen);

    const handleSort = async (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setStatus('loading');

        let sortParam ="";
        if(option === "Name (A-Z)") sortParam ="name";
        else if(option ===  "Name (Z-A)") sortParam ="-name";
        else if(option === "Price (Low-high)") sortParam ="price";
        else if(option ===  "Price (high-low)") sortParam ="-price";
    
        try{
            const response = await axios.get(`http://127.0.0.1:3000/api/v1/products?sort=${sortParam}`);

            let sortedProducts = response.data.data.products;

            sortedProducts.sort((a, b) => {
                const priceA = a.salePrice ?? a.price;
                const priceB = b.salePrice ?? b.price;

                if(option === "Price (Low-high)") return priceA-priceB;
                if(option ===  "Price (high-low)") return priceB-priceA;
                return 0;
            });

            setProducts(sortedProducts);
            setStatus('ready');

            localStorage.setItem('sortedProducts', JSON.stringify(sortedProducts));
            localStorage.setItem('selectedOption', option);
            
        }catch(error){
            setStatus('ready');
            console.log(error);
        }
    }

  return (
    <div className='sort-container'>
        <p className='ms-md-4 ms-0 mb-md-0 mb-2'>Showing {productsLength} Products</p>
        <div className='d-flex align-items-center me-3'>
            <h6 className='mb-0 me-2'>Sort By</h6>
            <div className='custom-select-container' style={{width: '220px'}}>
                <div className='custom-select' onClick={toggleDropdown}>
                    {selectedOption}
                </div>
                {isopen && (
                    <div className='custom-options'>
                        {options.map((option)=>(
                            <div key={option} 
                                className={`custom-option ${option === selectedOption? "selected" : ""}`}
                                onClick={()=>handleSort(option)}>{option}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
