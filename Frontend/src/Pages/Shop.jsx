import Products from "../Features/Products/Products";
import CopyRight from "../UI/CopyRight";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import Navbar from "../UI/Navbar";
import PageHeader from "../UI/PageHeader";
import Welcome from "../UI/Welcome";

export default function Shop() {
  return (
    <>
        <Welcome />
        <Header />
        <Navbar />
        <PageHeader title='Products' bCrumbItem1 ='Home' bCrumbActive = 'Shop'/>
        <Products />
        <Footer />
        <CopyRight />
    </>
  )
}
