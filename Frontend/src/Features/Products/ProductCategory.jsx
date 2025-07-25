import React from 'react'
import { useParams } from 'react-router-dom';
import { UseProducts } from '../../Contexts/ProductsProvider';
import Welcome from '../../UI/Welcome';
import Header from '../../UI/Header';
import Navbar from '../../UI/Navbar';
import PageHeader from '../../UI/PageHeader';
import Footer from '../../UI/Footer';
import CopyRight from '../../UI/CopyRight';
import Loader from '../../UI/Loader';
import Error from '../../UI/Error';
import ProductSorting from './ProductSorting';
import ProductCard from './ProductCard';


export default function ProductCategory() {
    const {category} = useParams();
    const {products, status,  selectedOption, setProducts, setStatus, setSelectedOption}=UseProducts();

    const title = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
      <>
          <Welcome />
          <Header />
          <Navbar />
          <PageHeader title={title} bCrumbItem1 ='Home' bCrumbItem2 ='Collection' bCrumbActive = {title} />
          <CategoryProducts status={status} products={products} selectedOption={selectedOption}
            setProducts={setProducts} setStatus={setStatus} setSelectedOption={setSelectedOption} category={category}/>
          <Footer />
          <CopyRight />
      </>
    )
}

function CategoryProducts({status, products, selectedOption, setProducts, setSelectedOption, setStatus, category}){
    const filteredProducts = products.filter((product)=>product.category=== category);

    return (
        <div className='d-flex align-items-center justify-content-center'>
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
  
