import { useState } from "react"
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function Welcome() {
    const [selectedLanguage, setSelectedLanguage]=useState('English');
    const [selectedCurrency, setSelectedCurrency]=useState('$ - USD');

    const languages = ['English', 'Italiano', 'Francais', 'Filipino'];
    const currencies = ['$ - USD', '€ - EUR', '£ - POUND', '₣ - FRANC'];

  return (
    <div className="container-fluid d-none d-lg-flex align-items-center justify-content-between text-light" style={{backgroundColor: 'rgb(12, 1, 31)'}}>
        <p className="fst-italic ms-4 mt-3" style={{color: '#fd7e14'}}>Welcome to Furns Store</p>
        <div className="me-5 d-flex align-items-center">
            <DropDown options={languages} selectedOption={selectedLanguage} 
                onSelect={setSelectedLanguage} marginRight='1.7rem' />
            <DropDown options={currencies} selectedOption={selectedCurrency}
                onSelect={setSelectedCurrency} />
        </div>
    </div>
  )
}

function DropDown({ options, selectedOption, onSelect, marginRight }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        onSelect(option); 
        setIsOpen(false); 
    };

    return (
        <div className="position-relative" style={{ marginRight: `${marginRight}` }}>
            <button className="btns-welcome" onClick={toggleDropDown}>
                {selectedOption}
                {isOpen ? <HiChevronUp className="icons-welcome ms-2" /> : <HiChevronDown className="icons-welcome ms-2" />}
            </button>
            {isOpen && (
                <ul className="dropdown-welcome">
                    {options.map((option) => (
                        <li key={option} onClick={() => handleSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


