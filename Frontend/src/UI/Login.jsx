import React, { useState } from 'react'
import Welcome from './Welcome'
import Navbar from './Navbar'
import Header from './Header'
import PageHeader from './PageHeader'
import Footer from './Footer'
import CopyRight from './CopyRight'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { UseProducts } from '../Contexts/ProductsProvider'

export default function Login({onLogin}) {
    const {fetchWishList, fetchCompareList,  setWishList, setCompareList} = UseProducts();
  return (
    <>
        <Welcome />
        <Header />
        <Navbar />
        <PageHeader title='Login' bCrumbItem1 ='Home' bCrumbActive = 'Signin'/>
        <LoginForm onLogin={onLogin} fetchWishList={fetchWishList} fetchCompareList={fetchCompareList}
            setCompareList={setCompareList} setWishList={setWishList}/>
        <Footer />
        <CopyRight />
    </>
  )
}


function LoginForm({onLogin, fetchWishList, fetchCompareList, setCompareList, setWishList}){
    const navigate = useNavigate();
    const[isLoading, setIsLoading] = useState(false);

    const {handleSubmit, register, formState: {errors}} = useForm();

    const onSubmit = async (data) =>{
        if(isLoading) return;
        try{
            setIsLoading(true);
            const response = await axios.post("http://127.0.0.1:3000/api/v1/users/login", {
                email: data.email,
                password: data.password
            })
        
            const token = response?.data?.token;
            localStorage.setItem('ProfileData', JSON.stringify(response?.data?.data?.user))

            toast.success(response?.data?.message);
            onLogin(token);

            const savedWishlist = localStorage.getItem("wishlist");
            if(savedWishlist){
                setWishList(JSON.parse(savedWishlist));
            }else{
                await fetchWishList();
            }

            const savedComparelist = localStorage.getItem("comparelist");
            if(savedComparelist){
                setCompareList(JSON.parse(savedComparelist));
            }else{
                await fetchCompareList();
            }

            setTimeout(() => {
                setIsLoading(false);
                navigate(-1); 
            }, 3000); 

            }catch(error){
                setIsLoading(false);
                if(error?.response?.data?.message){
                    toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
                }
            }
        }

return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className='container d-flex flex-column align-items-center justify-content-center my-5' style={{width: '100%',maxWidth: '580px',  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}} >
        <form style={{width: '95%'}} className='pt-5 pb-1' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Email*</label>
                <input type="email" className="form-control rounded-0 py-2" id="InputEmail"  
                    {...register('email', {required: 'Email is required'})}/>
                {errors.email && <span className="text-danger" style={{ fontSize: '14px' }}>
                    {errors.email.message}
                </span>
                }
            </div>
            <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Password*</label>
                <input type="password" className="form-control rounded-0 py-2" id="InputPassword" 
                    {...register('password', {required: 'Password is required', minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long'
                    }})}/>
                {errors.password && (
                    <span className="text-danger" style={{ fontSize: '14px' }}>
                        {errors.password.message}
                    </span>
                )}
            </div>
            <button type="submit" className={`btn btn-submit ${isLoading ? 'bg-secondary border-0' : ''}`} disabled={isLoading}>
                Signin {isLoading && (
                    <span className='spinner-border spinner-border-sm text-light ms-2' role='status'></span>
                )}
            </button>
        </form>
        <div className='d-flex flex-column flex-md-row align-items-center justify-content-between mb-4' style={{width: '95%'}}>
                <button className='btn btn-account mt-2 mt-md-0' onClick={()=>navigate('/signup')}>Create a Account</button>
                <button className='btn btn-forgot-password mt-2 mt-md-0' onClick={()=>navigate('/')}>Forgot Password?</button>
        </div>
    </div>
    </>
    )
}