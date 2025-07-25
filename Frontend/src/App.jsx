import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import FixedFooter from "./UI/FixedFooter";
import { lazy, Suspense } from "react";

const Home = lazy(()=> import("./Pages/Home"));
const About = lazy(()=> import("./Pages/About"));
const Contact = lazy(()=> import("./Pages/Contact"));
const Shop = lazy(()=> import("./Pages/Shop"));

const Login = lazy(()=> import("./UI/Login"));
const SignUp = lazy(()=> import("./UI/SignUp"));
const Search = lazy(()=> import("./UI/Search"));
const Loader = lazy(()=> import( "./UI/Loader"));

const Cart = lazy(()=> import("./Features/Cart/Cart"));
const Dashboard = lazy(()=> import("./Features/AdminPanel/Dashboard"));
const Products = lazy(()=> import( "./Features/AdminPanel/Products"));
const FlashSales = lazy(()=> import("./Features/AdminPanel/FlashSales"));
const Customers = lazy(()=> import("./Features/AdminPanel/Customers"));
const OrderList = lazy(()=> import("./Features/AdminPanel/OrderList"));
const Report = lazy(()=> import("./Features/AdminPanel/Report"));
const Settings = lazy(()=> import("./Features/AdminPanel/Settings"))

const ProductDetails = lazy(()=> import("./Features/Products/ProductDetails"));
const ProductCategory = lazy(()=> import("./Features/Products/ProductCategory"));
const ProductsWishList = lazy(()=> import("./Features/Products/ProductsWishList"));
const ProductsCompareList = lazy(()=> import("./Features/Products/ProductsCompareList"));


function Layout({children}){
  const location = useLocation();
  const routesWithoutFooter =['/dashboard', '/products', '/flash-sales', '/customers', 
    '/order-list', '/report', '/settings'];

  const shouldDisplayFooter = !routesWithoutFooter.includes(location.pathname);

  return (
    <>
      {children}
      {shouldDisplayFooter && <FixedFooter />}
    </>
  )
}

function handleLogin(token){
  localStorage.setItem('authToken', token);
}

export default function App() {
  return (
        <Router>
          <Layout>
            <Suspense fallback={<Loader />} >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact-us" element={<Contact />} /> 
                <Route path="/login" element={<Login onLogin = {handleLogin} />} />
                <Route path="/signup" element={<SignUp onLogin = {handleLogin} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<ProductsWishList />} /> 
                <Route path="/compare" element={<ProductsCompareList />} /> 
                <Route path="/collection/:category" element={<ProductCategory />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/product/:productId" element = {<ProductDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/flash-sales" element={<FlashSales />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/order-list" element={<OrderList />} />
                <Route path="/report" element={<Report />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
            </Suspense>
          </Layout>
        </Router>
  )
}
