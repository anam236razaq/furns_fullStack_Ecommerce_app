import React, { useState } from 'react'
import Welcome from './Welcome'
import Header from './Header'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import Footer from './Footer'
import CopyRight from './CopyRight'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

export default function SignUp({onLogin}) {
  return (
    <>
        <Welcome />
        <Header />
        <Navbar />
        <PageHeader title='Create Account' bCrumbItem1 ='Home' bCrumbActive = 'Signup'/>
        <SignUpForm onLogin={onLogin} />
        <Footer />
        <CopyRight />
    </>
  )
}

function SignUpForm({onLogin}){
    const navigate = useNavigate();
    const[isLoading, setIsLoading]= useState(false);
    const[isChecked, setIsChecked] = useState(false);
    const {handleSubmit, register, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        try{
            setIsLoading(true);
            const response = await axios.post("http://127.0.0.1:3000/api/v1/users/signup", {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
                password: data.password,
                passwordConfirm: data.confirmPassword,
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const token = response?.data?.token
            localStorage.setItem('ProfileData', JSON.stringify(response?.data?.data?.user));
            toast.success(response?.data?.message);
            onLogin(token);

            setTimeout(()=> {
                    setIsLoading(false);
                    navigate('/');
                }, 3000);

        }catch(error){
            toast.error(error?.response?.data?.message)
            setIsLoading(false);
        }
    }

    return (
        <>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='container d-flex align-items-center justify-content-center my-5' style={{width: '100%',maxWidth: '580px',  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}} >
        <form style={{width: '95%'}} className='py-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
                <div className="mb-3 signup-input-width">
                    <label htmlFor="InputFirstName" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>First Name*</label>
                    <input type="text" className="form-control rounded-0 py-2" id="InputFirstName" 
                        {...register('firstName', {required: 'First Name is required', 
                        minLength: {value: 4, message: 'Minimum 4 characters required'}})} />
                        {errors.firstName &&  <span className="text-danger" style={{ fontSize: '14px' }}>
                            {errors.firstName.message}
                        </span>
                    }
                </div>
                <div className="mb-3 signup-input-width">
                    <label htmlFor="InputLastName" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Last Name*</label>
                    <input type="text" className="form-control rounded-0 py-2" id="InputLastName" 
                        {...register('lastName', {required: 'Last Name is required',
                        minLength: {value: 4, message: 'Minimum 4 characters required'}})} />
                        {errors.lastName && <span className='text-danger' style={{fontSize: '14px'}}>
                            {errors.lastName.message}
                        </span>
                    }
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Email*</label>
                <input type="email" className="form-control rounded-0 py-2" id="InputEmail" 
                    {...register('email', {required: 'Email is required'})}/>
                    {errors.email && <span className='text-danger' style={{fontSize: '14px'}}>
                        {errors.email.message}
                    </span>
                }
            </div>
            <div className="mb-3">
                <label htmlFor="InputPhone" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Phone*</label>
                <input type="tel" className="form-control rounded-0 py-2" id="InputPhone" 
                    {...register('phone', {required: 'Phone Number is required', 
                        pattern: {value: /^[0-9]{11}$/, message: 'Phone number must be 11 digits'}})}/>
                    {errors.phone && <span className='text-danger' style={{fontSize: '14px'}}>
                        {errors.phone.message}
                    </span>}
            </div>
            <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Password*</label>
                <input type="password" className="form-control rounded-0 py-2" id="InputPassword" 
                    {...register('password', {required: 'Password is required', 
                        minLength: {value: 8, message: 'Password must be at least 8 characters long'}})}/>
                    {errors.password && <span className='text-danger' style={{fontSize: '14px'}}>
                        {errors.password.message}
                    </span>}
            </div>
            <div className="mb-3">
                <label htmlFor="InputConfirmPassword" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Confirm Password*</label>
                <input type="password" className="form-control rounded-0 py-2" id="InputConfirmPassword" 
                    {...register('confirmPassword', {required:'Confirm Password is required', 
                        validate: (value) => value === document.getElementById('InputPassword').value || 'Passwords do not match'})}/>
                    {errors.confirmPassword && <span className='text-danger' style={{fontSize: '14px'}}>
                        {errors.confirmPassword.message}
                    </span>}
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input custom-checkbox" style={{borderColor: '#fd7e14'}} id="Check" 
                    {...register('terms', {required: true})} onChange={(e)=>setIsChecked(e.target.checked)}/> 
                <label className="form-check-label" htmlFor="Check" style={{fontWeight: '500'}}>I've read and accept the Privacy Policy</label>
            </div>
            <p>By signing up, you agree to our Terms of Service. Learn how we collect and use your data in our Privacy Policy.</p>
            <button type="submit" className={`btn btn-signup ${isLoading ? 'bg-secondary border-0' : ''}`} 
                disabled={!isChecked || isLoading}  style={{backgroundColor: !isChecked || isLoading ? '#fc9744' : '', 
                border: !isChecked || isLoading ? '0' : '', color: !isChecked || isLoading? 'white' : ''}}>
                Signup {isLoading && <span className="spinner-border spinner-border-sm text-light ms-2"role="status"></span>}
            </button>
            <div className='w-100'>
                <button className='btn btn-already-account'  onClick={()=>navigate('/login')}>Already Have a account?</button>
            </div>
        </form>
    </div>
    </>
    )
}
