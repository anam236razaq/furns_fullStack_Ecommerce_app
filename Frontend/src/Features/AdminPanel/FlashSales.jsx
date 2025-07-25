import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../UI/Loader';
import AdminBars from './AdminBars';
import { UseProducts } from '../../Contexts/ProductsProvider';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { GrFormNext, GrFormPrevious} from 'react-icons/gr';
import { FaLongArrowAltDown, FaLongArrowAltUp, FaPlus } from 'react-icons/fa';
import moment from 'moment';

export default function FlashSales() {
const[isLoading, setIsLoading] = useState(true);
const[currentPage, setCurrentPage]= useState(1);
const[sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});
const {products, addProduct, removeProducts, editProduct} = UseProducts();

const [productName, setProductName] = useState('');
const [productImg, setProductImg] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const[stock, setStock]= useState('');
const [status, setStatus] = useState('');

//Filtered Products
const filteredProducts = products.filter((product)=> product.saleStatus && product.startSaleDate && product.endSaleDate);

//Sorted Products
const sortedProducts = React.useMemo(()=> {
    if(sortConfig.key){
        return [...filteredProducts].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if(sortConfig.key === 'stock'){
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }

            if(aValue < bValue){
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if(aValue > bValue){
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }
    return [...filteredProducts];
}, [filteredProducts, sortConfig]);


const totalResults= filteredProducts.length;
const itemsPerPage=10;
const totalPages = Math.ceil(totalResults/itemsPerPage);
const currentProducts = sortedProducts.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);

//Loading functionality
useEffect(()=>{
    const timer = setTimeout(()=> {
      setIsLoading(false);
    }, 1000);

    return ()=> clearTimeout(timer);
  }, []);

//Delete Functionality
  function handleDelete(productId){
    removeProducts(productId);
  }

//Pagination
  function handlePageChange(page){
    if(page >=1 && page <= totalPages){
        setCurrentPage(page);
    }
  }
  
//Sort Method
  function handleSort(key){
    setSortConfig((prevConfig)=> {
        if(prevConfig.key === key){
            return {
                key,
                direction: prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
            };
        }
        return {key, direction: 'ascending'}
    });
  }

//Formatting Start Date
  function handleStartDateChange(e){
    const formattedDate = moment(e.target.value).format('DD-MM-YYYY hh:mma');
    setStartDate(formattedDate);
  }

//Formatting End Date
  function handleEndDateChange(e){
    const formattedDate = moment(e.target.value).format('DD-MM-YYYY hh:mma');
    setEndDate(formattedDate);
  }

//Image Funtionality
  function handleImageChange(e){
    const file = e.target.files[0]; //if we select multiple files, then they will be like files[0], files[1] etc

    if(file){
        const reader = new FileReader();  //built-in Js API for file uploads/images
        reader.onloadend = () => { // event occur when file successfully loaded
            setProductImg(reader.result); // set component state to file content
        }
        reader.readAsDataURL(file); // read the file as data URL
    }
  }

  const imageInputRef = useRef();

//Adding product
  function handleAddProduct(){
    const newProduct={
        id: Math.random().toString(36).substr(2, 9),
        name: productName,
        img: productImg,
        startSaleDate:startDate,
        endSaleDate:endDate,
        stock: parseInt(stock, 10),
        saleStatus:status,
    }
    addProduct(newProduct);
    setProductName('');
    setEndDate('');
    setStartDate('');
    setStatus('');
    setStock('');

    if(imageInputRef.current){
        imageInputRef.current.value= '';
    }
  }

  return (
    <>
    {isLoading? (
        <Loader />
    ) : (
        <div id='app'>
            <div className='main-wrapper'>
                <AdminBars />
                <div className='main-content'>
                    <section className='section'>
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-5">
                                    <div className="card-header d-flex align-items-center justify-content-between" style={{backgroundColor: 'white'}}>
                                        <h4>Flash Sales</h4>
                                        <button className='p-2 border-0 text-light rounded-1' style={{backgroundColor: '#fd7e14'}} data-bs-toggle="modal" data-bs-target="#newProductModal"><FaPlus className='me-1' style={{marginBottom: '4px'}}/>Add New Product</button>
                                        <div className="modal fade" id="newProductModal" tabIndex="-1" aria-labelledby="newProductModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="newProductModalLabel">Add New Product</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="mb-3">
                                                            <label htmlFor="FormControlInput1" className="form-label">Product Name</label>
                                                            <input type="text" className="form-control" id="FormControlInput1" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="FormControlInput6" className="form-label">Product Image</label>
                                                            <input type="file" ref={imageInputRef} className="form-control" id="FormControlInput6" onChange={handleImageChange}/>
                                                        </div>
                                                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                                                            <div className='w-50 me-2'>
                                                                <label htmlFor="FormControlInput2" className="form-label">Start Date</label>
                                                                <input type="datetime-local" className="form-control" id="FormControlInput2" 
                                                                    value={moment(startDate, 'DD-MM-YYYY hh:mma').format('YYYY-MM-DDTHH:mm')} onChange={handleStartDateChange}/>
                                                            </div>
                                                            <div className='w-50 ms-2'>
                                                                <label htmlFor="FormControlInput3" className="form-label">End date</label>
                                                                <input type="datetime-local" className="form-control" id="FormControlInput3" 
                                                                value={moment(endDate, 'DD-MM-YYYY hh:mma').format('YYYY-MM-DDTHH:mm')} onChange={handleEndDateChange}/>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                                                            <div className='w-50 me-2'>
                                                                <label htmlFor="FormControlInput4" className="form-label">Stock</label>
                                                                <input type="number" className="form-control" id="FormControlInput4" value={stock} onChange={(e)=>setStock(e.target.value)}/>
                                                            </div>
                                                            <div className='w-50 ms-2'>
                                                                <label htmlFor="FormControlInput5" className="form-label">Status</label>
                                                                <input type="text" className="form-control" id="FormControlInput5" value={status} onChange={(e)=>setStatus(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" onClick={handleAddProduct}>Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body px-0">
                                        <div className="table-responsive">
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th><input className="form-check-input rounded-0 me-2 checkbox" type="checkbox" value="" id="flexCheckDefault" />
                                                            Product Name <FaLongArrowAltUp style={{fontSize: '12px'}} onClick={()=>handleSort('name')}/>
                                                                <FaLongArrowAltDown style={{marginLeft: '-6px', fontSize: '12px'}} onClick={()=> handleSort('name')}/>
                                                        </th>
                                                        <th>
                                                            Start Date <FaLongArrowAltUp style={{fontSize: '12px'}} onClick={()=> handleSort('startSaleDate')}/>
                                                            <FaLongArrowAltDown style={{marginLeft: '-6px', fontSize: '12px'}} onClick={()=> handleSort('startSaleDate')}/>
                                                        </th>
                                                        <th>
                                                            End Date <FaLongArrowAltUp style={{fontSize: '12px'}} onClick={()=> handleSort('endSaleDate')}/>
                                                            <FaLongArrowAltDown style={{marginLeft: '-6px', fontSize: '12px'}} onClick={()=> handleSort('endSaleDate')}/>
                                                        </th>
                                                        <th>
                                                            Stock <FaLongArrowAltUp style={{fontSize: '12px'}} onClick={()=> handleSort('stock')}/>
                                                            <FaLongArrowAltDown style={{marginLeft: '-6px', fontSize: '12px'}} onClick={()=> handleSort('stock')}/>
                                                        </th>
                                                        <th>
                                                            Status <FaLongArrowAltUp style={{fontSize: '12px'}} onClick={()=> handleSort('saleStatus')}/>
                                                            <FaLongArrowAltDown style={{marginLeft: '-6px', fontSize: '12px'}} onClick={()=> handleSort('saleStatus')}/>
                                                        </th>
                                                        <th>
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentProducts.map((product)=> (
                                                            <tr key={product.id} style={{fontSize: '14px', backgroundColor: 'white'}}>
                                                                <td>
                                                                    <input className="form-check-input rounded-0 me-2 checkbox" type="checkbox" value="" id="flexCheckDefault" />
                                                                    <img src={product.img} alt={product.name} className='me-2' style={{width: '30px'}}/>
                                                                    {product.name.charAt(0).toUpperCase() + product.name.slice(1).toLowerCase()}
                                                                </td>
                                                                <td>{product.startSaleDate}</td>
                                                                <td>{product.endSaleDate}</td>
                                                                <td>{product.stock}</td>
                                                                <td><div className={`badge ${product.saleStatus.toLowerCase() === 'ongoing'? 'text-success' : 
                                                                    product.saleStatus.toLowerCase() === 'upcoming'? 'text-primary' : 'text-danger'}`} style={{
                                                                        border: `1px solid ${product.saleStatus.toLowerCase() === 'ongoing'? 'green' : product.saleStatus.toLowerCase() === 'upcoming' ? 'blue' : 'red'}`}}>
                                                                    {product.saleStatus.charAt(0).toUpperCase() + product.saleStatus.slice(1).toLowerCase()}</div>
                                                                </td>
                                                                <td >
                                                                    <button className='btn-sale me-2'><MdOutlineEdit /></button>
                                                                    <button className='btn-sale' onClick={()=>handleDelete(product.id)}><MdDeleteOutline className='btn-sale-delete'/></button>
                                                                </td>
                                                        </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                            <div className='d-flex align-items-center justify-content-between mx-3'>
                                                <div>Showing {Math.min((currentPage-1)*itemsPerPage+1, totalResults)} to {Math.min(currentPage*itemsPerPage, totalResults)} of {totalResults} results</div>
                                                <ul className='pagination mb-0'>
                                                    <li className={`page-item ${currentPage === 1? 'disabled' : ''}`}>
                                                        <button className='page-link' onClick={()=>handlePageChange(currentPage-1)}><GrFormPrevious /></button>
                                                    </li>

                                                    {Array.from({length: totalPages}, (_, i)=> i+1).filter((page) =>
                                                        page === 1 || page === totalPages || Math.abs(page-currentPage)<2
                                                    ).map((page)=> (
                                                        <li key={page} className={`page-item ${currentPage === page? 'active' : ''}`}>
                                                            <button className='page-link' onClick={()=>handlePageChange(page)}>{page}</button>
                                                        </li>
                                                    ))}
                                                    {currentPage < totalPages -1 && (
                                                        <li className='page-item disabled'>
                                                            <span className='page-link'>...</span>
                                                        </li>
                                                    )}

                                                    <li className={`page-item ${currentPage === totalPages? 'disabled' : ''}`}>
                                                        <button className='page-link' onClick={()=>handlePageChange(currentPage+1)}><GrFormNext /> </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        )}
    </>
  )
}
