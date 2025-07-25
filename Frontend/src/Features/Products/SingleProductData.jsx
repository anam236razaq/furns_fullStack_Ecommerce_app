import React, { useEffect, useState } from 'react'
import StarRating from '../../UI/StarRating';
import ProductQuickView from './ProductQuickView';
import { FaUserTie } from 'react-icons/fa';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import ProductCard from './ProductCard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SingleProductData({product, marginTop}) {

    return (
        <>
            <ProductQuickView product={product} marginTop={marginTop} />
            <ProductsTab product={product}/>
            <RelatedProducts productId ={product._id}/>
        </>
    )
}

function ProductsTab({product}){
    const[activeTab, setActiveTab] = useState(0);
    const paragraphs = product.longDescription.split('. ').filter(paragraph=>paragraph.trim() !== '');
    const[reviews, setReviews] = useState(product.reviews);
    const[formData, setFormData] = useState({name: '', email: '', message: '', rating: 0});
    const[faqs, setFaqs] = useState(product.faqs);
    const [inputQuestion, setInputQuestion] = useState('');


    const handleInputChange =(e)=> {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleRatingChange= (rating) => {
        setFormData(prevState => ({
            ...prevState,
            rating
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {name: formData.name, review: formData.message, rating: formData.rating};
        setReviews(prevReviews=>[...prevReviews, newReview]);
        setFormData({name: '', email: '', message: '', rating: 0});
    }

    const handleFaqSubmit = (e) => {
        e.preventDefault();
        if(inputQuestion.trim() !== ''){
            const newFaq = {
                question: inputQuestion,
                customerName: "Anonymous",
                answer: 'No answer Yet',
                questionTime: new Date().toLocaleString(),
                sellerName: 'Seller',
                answerTime: new Date().toLocaleString(),
            };

            setFaqs(prevFaqs => [newFaq, ...prevFaqs]);
            setInputQuestion('');
        }
    }

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='mb-2'>
                <ul className="nav">
                    <Tab num={0} activeTab={activeTab} onClick={setActiveTab} tabName= "Description" />
                    <Tab num={1} activeTab={activeTab} onClick={setActiveTab} tabName="Reviews" />
                    <Tab num={2} activeTab ={activeTab} onClick={setActiveTab} tabName="FAQS" />
                </ul>
            </div>
            <div className='tab-content container mb-5 rounded' style={{border: '1px solid rgb(209, 209, 209)'}}>
                {activeTab===0 && <div className='m-4'>{paragraphs.map((paragraph, index)=><p key={index}>{paragraph}.</p>)}</div> }
                {activeTab===1 && <div className='row my-4'>
                    <div className='col-12 col-lg-6'>                           
                        <div className='mb-3'>
                            {reviews.map((item)=>(
                                <div key={item.name} className='d-flex flex-column align-items-lg-center flex-lg-row w-100'>
                                    <div className=' mb-3 d-flex align-items-center justify-content-center review-img'>
                                        <FaUserTie  style={{fontSize: '60px'}}/>
                                    </div> 
                                    <div className='w-75 ms-0 ms-lg-3 '>
                                        <h6>{item.name}</h6>
                                        <div style={{color: '#fd7e14'}}>{Array.from({length: 5}, (_, i)=>(
                                            <span key={i}>{i<item.rating ? <IoStar /> :<IoStarOutline />}</span>
                                        ))}
                                        </div>
                                        <p>{item.review}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <h3 className='mb-3'>Add Your Review</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex align-items-center mb-2'>
                                <h6 className='mb-0'>Your Rating:</h6>&nbsp; 
                                <StarRating rating={formData.rating} onRatingChange={handleRatingChange}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="InputMessage" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Message</label>
                                <textarea className="form-control rounded-0 py-2" id="InputMessage" rows="5"
                                    name="message" value={formData.message} onChange={handleInputChange}></textarea>
                            </div>
                            <div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
                                <div className="mb-3 signup-input-width">
                                    <label htmlFor="InputName" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Name</label>
                                    <input type="text" className="form-control rounded-0 py-2" id="InputName" 
                                        name='name' value={formData.name} onChange={handleInputChange}/>
                                </div>
                                <div className="mb-3 signup-input-width">
                                    <label htmlFor="InputEmail" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Email</label>
                                    <input type="email" className="form-control rounded-0 py-2" id="InputEmail" 
                                        name='email' value={formData.email} onChange={handleInputChange}/>                                </div>
                            </div>
                            <button type="submit" className="btn-form-submit">Send Message</button>
                        </form>
                    </div>
                </div>
                }
                {activeTab===2 && <div className='my-4'>
                    <h6 className='p-2' style={{backgroundColor: 'rgb(235,235,235)'}}>Questions About this product</h6>
                    <form className='d-flex' onSubmit={handleFaqSubmit}>
                        <input className='faq-input' type="text" placeholder='Enter your question here' style={{width: '100%', maxWidth: '1181px'}} 
                            value={inputQuestion} onChange={(e)=>setInputQuestion(e.target.value)}/>
                        <button type='submit' className='btn-faq'>Ask Questions</button>
                    </form>
                    <div className='mt-3'>
                        <h5>Questions</h5>
                        {faqs.map((faq)=>(
                            <div className='faq-container py-2' key={faq.question}>
                                <div className='d-flex align-items-center'>
                                    <div className='faq-question-icon'><span>Q</span></div>
                                    <div className='ms-3'>
                                        <h6 style={{fontSize: '14px'}}>{faq.question}</h6>
                                        <div style={{fontSize: '12px'}}>
                                            <span>{faq.customerName}</span> - <span>{faq.questionTime}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mt-3'>
                                    <div className='faq-answer-icon'><span>A</span></div>
                                    <div className='ms-3'>
                                        {faq.answer === 'No answer Yet' ? (
                                            <h6 className='mt-2' style={{fontSize: '14px'}}>{faq.answer}</h6>  
                                        ) : (
                                            <>
                                                <h6 style={{fontSize: '14px'}}>{faq.answer}</h6>
                                                <div style={{fontSize: '12px'}}>
                                                    <span>{faq.sellerName}</span> - <span>{faq.answerTime}</span>
                                                </div>
                                            </>
                                        )}
                                      
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                }
            </div>  
        </div>
    )
}

function Tab({num, activeTab, onClick, tabName}){
    return(
        <li className='nav-item'>
            <button className={`nav-links-btns ${activeTab === num? "active" : ""}`} style={{color: 'black'}}
                onClick={()=>onClick(num)}>{tabName}</button>
        </li>
    ) 
}


function RelatedProducts({productId}){
    const[relatedProduct, setRelatedProduct] = useState([]);

    useEffect(() => {
        const fetchRelatedProduct = async () => {
            try{
            const response = await axios.get(`http://127.0.0.1:3000/api/v1/products/${productId}/related`);
            setRelatedProduct(response?.data?.data?.relatedProducts);
            }catch(error){
                console.log(error);
            }
        }
        fetchRelatedProduct();
    }, [productId]);

    return(
        <div className='container px-0'>
            <h2 className='fw-bold'>Related Products</h2>
            <div className='row gy-4 mt-2'>
                {relatedProduct?.length && relatedProduct.map((relatedProduct) => (
                    <div key={relatedProduct._id} className='d-flex justify-content-center justify-content-md-between 
                        col-12 col-sm-6 col-md-4 col-lg-3'>
                            <ProductCard product={relatedProduct} />
                    </div>
                ))}
            </div>
        </div>
    )
}