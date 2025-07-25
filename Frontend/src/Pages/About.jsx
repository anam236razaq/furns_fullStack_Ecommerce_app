import CopyRight from "../UI/CopyRight";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import Navbar from "../UI/Navbar";
import PageHeader from "../UI/PageHeader";
import Welcome from "../UI/Welcome";

export default function About() {
  return (
    <>
      <Welcome />
      <Header />
      <Navbar />
      <PageHeader title='About us' bCrumbItem1 ='Home' bCrumbActive = 'About'/>
      <div className="m-5">
          <h2 className="fs-2 lh-base mb-5">Furns is a global furniture destination for somethings. 
            We sell cutting-edge furniture and offer a wide variety of fashion-related content.</h2>
            <div className="row">
              <div className="col-12 col-md-6">
                <img src="/src/assets/img-about-01.jpg" alt="Our Stories" style={{width: '100%', maxWidth: '650px', height: '100%',maxHeight: '600px'}}/>
            </div>
            <div className="col-12 col-md-6">
              <img src="/src/assets/img-about-02.jpg" alt="Our Mission" className="mt-3 mt-md-0" style={{width: '100%', maxWidth: '650px',  height: '100%',maxHeight: '600px'}}/>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-md-6 mt-4">
              <h4>OUR STORIES</h4>
              <p className="lh-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor.</p>
            </div>
            <div className="col-12 col-md-6 mt-4">
              <h4>OUR MISSION</h4>
              <p className="lh-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor.</p>
          </div>
        </div>
      </div>
      <Footer />
      <CopyRight />
    </>
  )
}
