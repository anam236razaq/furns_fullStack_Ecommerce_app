import { HiChevronDown} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className='container-fluid d-none d-lg-flex align-items-center justify-content-center'
        style={{paddingTop: '1px', paddingBottom: '1px', backgroundColor: 'rgb(12, 1, 31)'}}>
            <ul className=" nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li className="position-relative">
                    <Link to="/">Home Furniture<HiChevronDown className="icons-welcome" /></Link>
                    <ul className="dropdown-nav">
                        <li><Link to="/collection/bedroom">Bedroom</Link></li>
                        <li><Link to="/collection/dining">Dining</Link></li>
                        <li><Link to="/collection/living">Living</Link></li>
                    </ul>
                </li>
                <li className="position-relative">
                    <Link to="/">Office Furniture<HiChevronDown className="icons-welcome" /></Link>
                    <ul className="dropdown-nav">
                        <li><Link to="/collection/lounge">Lounge</Link></li>
                        <li><Link to="/collection/office-chair">Office Chair</Link></li>
                        <li><Link to="/collection/office-table">Office Table</Link></li>
                    </ul>
                </li>
                <li className="position-relative">
                    <Link to="/">Hospital Furniture<HiChevronDown className="icons-welcome" /></Link>
                    <ul className="dropdown-nav">
                        <li><Link to="/collection/hospital-bed">Hospital Bed</Link></li>
                        <li><Link to="/collection/hospital-utility">Hospital Utility</Link></li>
                    </ul>
                </li>
                <li><Link to="/contact-us">Contact</Link></li>
            </ul>
    </div>
  )
}
