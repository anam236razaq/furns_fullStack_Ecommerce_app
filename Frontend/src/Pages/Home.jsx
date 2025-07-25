import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CopyRight from "../UI/CopyRight";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import Hero from "../UI/Hero";
import Navbar from "../UI/Navbar";
import Welcome from "../UI/Welcome";
import ProductCard from "../Features/Products/ProductCard";
import { useState } from "react";
import Empty from "../UI/Empty";
import Slider from "react-slick";
import { UseProducts } from "../Contexts/ProductsProvider";


export default function Home() {
  const { products }= UseProducts();
  return (
    <>
        <Welcome />
        <Header />
        <Navbar />
        <Hero />
        <ProductsCategories />
        <ProductTypes products = {products}/>
        <Footer />
        <CopyRight />
    </>
  )
}

function ProductsCategories(){
  const productsCtg = [
    {
      "id": "1",
      "name": "Bedroom",
      "img": "/src/assets/ProductsCtg/bedrooms.jfif",
      "link": "/collection/bedroom"
    },
    {
      "id": "2",
      "name": "Living",
      "img": "/src/assets/ProductsCtg/living.png",
      "link": "/collection/living"
    },
    {
      "id": "3",
      "name": "Dining",
      "img": "/src/assets/ProductsCtg/dining.jfif",
      "link": "/collection/dining"
    },
    {
      "id": "4",
      "name": "Lounge",
      "img": "/src/assets/ProductsCtg/lounge.jfif",
      "link": "/collection/lounge"
    },
    {
      "id": "5",
      "name": "Office Chair",
      "img": "/src/assets/ProductsCtg/office chair.jfif",
      "link": "/collection/office-chair"
    }
  ]

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 992, // Below 992px
            settings: {
              slidesToShow: 3, // Show 3 slides
            },
          },
          {
            breakpoint: 786, // Below 786px
            settings: {
              slidesToShow: 2, // Show 2 slides
            },
          },
          {
            breakpoint: 576, // Below 576px
            settings: {
              slidesToShow: 1, // Show 1 slide
            },
          },
        ],
    };


  return (
      <Slider {...settings} className="container d-flex align-items-center justify-content-center" style={{marginTop: '5rem', marginBottom: '5rem'}}>
        {productsCtg.map((category)=> (
         <Link to={category.link} key={category.id} className="ctg-box">
                <img className="mb-3 ctg-box-img" src={category.img} alt={category.name} style={{width: '80px', height: '80px'}}/>
                <h6 className="ctg-box-name">{category.name}</h6>
          </Link>
        ))}
      </Slider>
  )
}


function ProductTypes({products}){
  const [activeType, setActiveType] = useState('New Arrival');

  const filteredProducts = products.filter(product =>product.type && product.type.includes(activeType));

  return (
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center'>
      <div className="d-flex align-items-center justify-content-center flex-column">
          <h1>Our Products</h1>
          <p className='text-center mt-2 w-75'>Lorem ipsum dolor sit amet, consectetur adipisicing 
            elitsed do eiusmo tempor incididunt ut labore</p>
          <div className="mt-3 d-flex justify-content-center flex-wrap">
            {["New Arrival", "Featured", "On Sale", "Trending"].map((type)=>(
              <button className={`me-4 ${activeType === type? 'btn-primary' : 'btn-secondary'}`} key={type} onClick={()=>setActiveType(type)}>{type}</button>
            ))}
          </div>
      </div>

        {filteredProducts.length > 0 ? (
          <div className='d-flex align-items-center justify-content-center flex-wrap mb-5 mt-2'>
              {filteredProducts.map((product) => (
                <ProductCard  key={product._id} product={product}/>
              ))}
        </div>
        ) : (
          <Empty text="There are no Products!" />
        )}
  </div>
  )
}
