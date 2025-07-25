import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";


export default function Hero() {

    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

return (
    <Slider {...settings} style={{backgroundColor: 'rgb(224, 224, 224)'}}>
        <Slide title='New Products' subTitle='Flexible Chair' 
            description='Experience comfort with our flexible chair, designed to support your body’s natural movements.'
            imgSrc='/src/assets/slider-1.png' />
        <Slide title='Best Sellers' subTitle='Creative Sofa' 
            description='Experience comfort redefined with a sofa that blends elegance and coziness in every curve.'
            imgSrc='/src/assets/slider-2.png' />
    </Slider>
);
}

function Slide({title, subTitle, imgSrc, description}){
    return (
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between my-5 py-5">
            <div className="hero-text-container order-2 order-sm-1">
                <h5 className="slide-up slide-up-delay-1 hero-title">{title}</h5>
                <h1 className="slide-up slide-up-delay-2 hero-subtitle">{subTitle}</h1>
                <p className="w-75 slide-up slide-up-delay-3">{description}</p>
                <button className="btn-hero slide-up slide-up-delay-4"><Link to="/shop">Shop Now</Link></button>
            </div>
            <div className="mx-4 mx-sm-5 order-1 order-sm-2">
                <img className="slide-up slide-up-delay-1 w-100" src={imgSrc} alt={subTitle} />
            </div>
        </div>
    )
}

