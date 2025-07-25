import { useForm } from "react-hook-form";
import CopyRight from "../UI/CopyRight";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import Navbar from "../UI/Navbar";
import PageHeader from "../UI/PageHeader";
import Welcome from "../UI/Welcome";

export default function Contact() {
  const {handleSubmit, register, formState: {errors}} = useForm();

  const onSubmit = (data) => {
    console.log("Form has been Submitted")
  }
  return (
    <>
      <Welcome />
      <Header />
      <Navbar />
      <PageHeader title='Contact' bCrumbItem1 ='Home' bCrumbActive = 'Contact'/>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex align-items-center justify-content-center">
          <iframe width="95%" height="400" src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_URL"
            frameBorder="0" style={{ border: '0' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
          </div>
        </div>
        <div className="row d-flex align-items-center justify-content-center" style={{gap: '30px'}}>
          <div className="col-12 col-lg-4 contact-section-1">
              <h3 className="mt-4 ms-4">Contact Info</h3>
              <div className="mt-4 ms-4 d-flex align-items-start">
                <h6 className="mb-0 w-25" style={{marginTop: '6px'}}>Phone:</h6>
                <div className="d-flex flex-column lh-lg">
                  <span>+012 345 678 102</span>
                  <span>+012 345 678 203</span>
                </div>
              </div>
              <div className="mt-4 ms-4 d-flex align-items-start">
                <h6 className="mb-0 w-25" style={{marginTop: '6px'}}>Email:</h6>
                <div className="d-flex flex-column lh-lg">
                  <span>email@here.com</span>
                  <span>your@email.here</span>
                </div>
              </div>
              <div className="mt-4 ms-4 d-flex align-items-start">
                <h6 className="mb-0 w-25" style={{marginTop: '6px'}}>Address:</h6>
                <p className="lh-lg w-50">Address goes here, street, Crossroad 123.</p>
              </div>

          </div>
          <div className="col-12 col-lg-7 contact-section-2">
              <h3 className="mt-4 ms-4">Get In Touch</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="ms-4">
              <div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
                <div className="mb-4 mt-2 signup-input-width">
                    <label htmlFor="InputFirstName" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>First Name*</label>
                    <input type="text" className="form-control rounded-0 py-2" id="InputFirstName" 
                        {...register('firstName', {required: 'First Name is required', 
                        minLength: {value: 4, message: 'Minimum 4 characters required'}})} />
                        {errors.firstName &&  <span className="text-danger" style={{ fontSize: '14px' }}>
                            {errors.firstName.message}
                        </span>
                    }
                </div>
                <div className="mb-4 mt-2 signup-input-width">
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
            <div className="mb-4">
                <label htmlFor="InputSubject" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Subject</label>
                <input type="text" className="form-control rounded-0 py-2" id="InputSubject" />
            </div>
            <div className="mb-4">
                <label htmlFor="InputMessage" className="form-label" style={{fontSize: '17px', fontWeight: '500'}}>Message</label>
                <textarea className="form-control rounded-0 py-2" id="InputMessage" rows="5"></textarea>
            </div>
            <button type="submit" className="btn-form-submit">Send Message</button>
          </form>
          </div>
        </div>
      </div>
      <Footer />
      <CopyRight />
    </>
  )
}

