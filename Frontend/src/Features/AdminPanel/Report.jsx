import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../UI/Loader';
import AdminBars from './AdminBars';
import { AiFillDollarCircle } from 'react-icons/ai';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { IoPersonCircle } from 'react-icons/io5';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import ApexCharts from 'apexcharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { UseProducts } from '../../Contexts/ProductsProvider';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const locations =[
    {name: "New York", coordinates: [-74.006, 40.7128]},
    { name: "San Francisco", coordinates: [-122.4194, 37.7749] },
    { name: "Sydney", coordinates: [130.2093, -33.8688] },
    { name: "Singapore", coordinates: [103.8198, 1.3521] },
]

export default function Report() {
const[isLoading, setIsLoading] = useState(true);
const chart1Ref = useRef(null);
const chart2Ref = useRef(null);
const[isMenu, setIsMenu]= useState(null);
const {products, setProducts} = UseProducts();

function toggleIconClick(productId){
    setIsMenu(isMenu=== productId? null : productId);
}

function handleDelete(productId){
    const updatedProducts = products.filter((product)=>product.id !== productId);
    setProducts(updatedProducts);
    setIsMenu(false);
}

useEffect(()=>{
    const timer = setTimeout(()=> {
      setIsLoading(false);
    }, 1000);

    return ()=> clearTimeout(timer);
  }, []);

  useEffect(()=> {
    if(!isLoading && chart1Ref.current){
        const chart1 = new ApexCharts(chart1Ref.current, {
            series: [
                {
                    name: " Current Week - $68,768",
                    data: [11, 20, 13, 24, 25, 11, 28]
                },
                {
                    name: "Last Week - $58,211",
                    data: [12, 11, 15, 18, 17, 13, 13]
                }
            ],
            chart: {
                height: 300,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.5
                },
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
                },
                colors: ['#fd7e14', '#545454'],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Revenue',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], 
                        opacity: 0.5
                    },
                },
                tooltip: {
                    enabled:false
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                },
                yaxis: {
                    min: 0,
                    max: 30,
                    tickAmount:3,
                    labels: {
                        formatter: function(value){
                            return value+'M';
                        }
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
        });
        chart1.render();

        return () => {
            chart1.destroy();
        };
    }
  }, [isLoading]);

  useEffect(() => {
    if(!isLoading && chart2Ref.current){
    const chart2 = new ApexCharts(chart2Ref.current, {
            series: [44, 55, 41, 15],
            chart: {
                type: 'donut',
                width: 250,
            },
            labels: ['Direct', 'Affiliate', 'Sponsored', 'Email'],
            dataLabels: {
                enabled: false
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                floating: false,
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
                fontSize: '12px',
            },
            responsive: [
            {
                breakpoint: 480,
                options: {
                chart: {
                    width: 200,
                },
                },
            },
            {
                breakpoint: 1024,
                options: {
                chart: {
                    width: 300,
                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    floating: false,
                    itemMargin: {
                        horizontal: 20,
                        vertical: 5,
                    },
                    fontSize: '12px',
                },
                },
            },
            {
                breakpoint: 992,
                options: {
                chart: {
                    width: 300,
                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    floating: false,
                    itemMargin: {
                        horizontal: 3,
                        vertical: 0,
                    },
                    fontSize: '12px',
                },
                },
            },
            ],
        });

    chart2.render();

    return () => {
        chart2.destroy();
    };
}
}, [isLoading]);

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
                        <div className='row'>
                            <div className='col-sm-6 col-lg-3 mb-4'>
                                <AdminCard title='Total Sales' value='$50,897' icon={AiFillDollarCircle}
                                    timeFrame='in the last month' percentage='14%' percentageColor='text-success'/>
                            </div>
                            <div className='col-sm-6 col-lg-3 mb-4'>
                                <AdminCard title='Total orders' value='3456' icon={RiShoppingBag3Line}
                                    timeFrame='in the last month' percentage='17%' percentageColor='text-danger'/>
                            </div>
                            <div className='col-sm-6 col-lg-3 mb-4'>
                                <AdminCard title='Total revenue' value='$1456' icon={AiFillDollarCircle}
                                    timeFrame='in the last month' percentage='14%' percentageColor='text-success'/>
                            </div>
                            <div className='col-sm-6 col-lg-3 mb-4'>
                                <AdminCard title='Total customers' value='42,456' icon={IoPersonCircle}
                                    timeFrame='in the last month' percentage='11%' percentageColor='text-danger'/>
                            </div>
                        </div>
                        <div className='row mb-5'>
                            <div className="col-12 col-lg-6">
                                <div className="card admin-card px-0">
                                    <div className="card-body">
                                        <div className="recent-report__chart">
                                            <div ref={chart1Ref}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 mt-5 mt-lg-0">
                                <div className="card admin-card px-0">
                                    <h6 className='mt-2 ps-2'>Sales By Location</h6>
                                   
                                    <div className="card-body">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <ComposableMap projection="geoMercator" className='geography'>
                                                <Geographies>
                                                    {({geographies}) =>
                                                        geographies.map((geo) => (
                                                            <Geography key={geo.rsmkey} geography={geo}/>
                                                    ))}
                                                </Geographies>
                                                {locations.map(({name, coordinates}) => (
                                                    <Marker key={name} coordinates={coordinates}>
                                                        <circle r={15} fill="#FF5533" stroke="#fff" strokeWidth={2}/>
                                                        <text textAnchor='middle' y={-15} className='geography-text'>
                                                            {name}
                                                        </text>
                                                    </Marker>
                                                ))}
                                            </ComposableMap>
                                        </div>
                                        <div>
                                            <Progress name='New York' progressWidth='72%' sales='72k'/>
                                            <Progress name='San Francisco' progressWidth='50%' sales='50k'/>
                                            <Progress name='Sydney' progressWidth='55%' sales='55k'/>
                                            <Progress name='Singapor' progressWidth='65%' sales='65k'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 mt-5 mt-lg-0">
                                <div className="card admin-card px-0">
                                    <h6 className='mt-2 ps-2'>Total Sales</h6>
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <div id="report-chart2" ref={chart2Ref}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-5'>
                            <div className="col-12 col-lg-9">
                                <div className="card admin-card px-0">
                                    <h6 className='mt-2 ps-2'>Top Selling Products</h6>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped" id="table-1">
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Price</th>
                                                        <th>Category</th>
                                                        <th>Quantity</th>
                                                        <th>Amount</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.filter((product)=>
                                                        product.topSellAmount && product.topSellQuantity).map((product) => (
                                                        <tr key={product.id} style={{fontSize: '12px'}}>
                                                            <td>{product.name}</td>
                                                            <td>${product.salePrice? product.salePrice : product.price}</td>
                                                            <td>{product.category}</td>
                                                            <td>{product.topSellQuantity}</td>
                                                            <td>${product.topSellAmount}</td>
                                                            <td>
                                                                <span><HiOutlineDotsVertical onClick={()=>toggleIconClick(product.id)} /></span>
                                                                {isMenu=== product.id && (
                                                                    <div className='position-absolute py-2 z-10 d-flex align-items-center bg-white'
                                                                        style={{boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '20%'}}>
                                                                        <button className='w-100' style={{border: 'none', padding: '8px'}} onClick={()=>handleDelete(product.id)}>Delete</button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 mt-5 mt-lg-0">
                                <div className="card admin-card px-0">
                                    <h6 className='mt-2 ps-2'>Monthly Target</h6>
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <div className='semi-circle-progress-bar' role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                aria-valuemax="100" style={{ '--value': 75 }}>
                                                    <span className="percentage-label">{75}%</span>
                                            </div>
                                            <p className='text-center my-4 my-lg-5 pb-lg-2' style={{fontSize: '11px'}}>You earn $3267 today, it's higher than last month keep up your good trends!</p>
                                            <div className='d-flex w-100 justify-content-lg-between justify-content-around' style={{fontSize: '12px', borderTop: '1px solid rgb(235, 235, 235)'}}>
                                                <div className='mt-2'>
                                                    <span>Target</span>
                                                    <div className='d-flex align-items-center mt-1'><span className='me-1 fw-bold'>$25k</span><FaArrowDown className='text-danger'/></div>
                                                </div>
                                                <div className='mt-2'>
                                                    <span>Revenue</span>
                                                    <div className='d-flex align-items-center mt-1'><span className='me-1 fw-bold'>$18k</span><FaArrowUp className='text-success'/></div>
                                                </div>
                                                <div className='mt-2'>
                                                    <span>Today</span>
                                                    <div className='d-flex align-items-center mt-1'><span className='me-1 fw-bold'>$1.8k</span><FaArrowUp className='text-success'/></div>
                                                </div>
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

function AdminCard({title, value, icon:Icon, percentage, timeFrame, percentageColor}){
    return (
    <div className='card admin-card h-100' style={{width: '100%'}}>
        <div className='d-flex align-items-center justify-content-between'>
            <div>
                <p className='mb-0 text-uppercase' style={{fontSize: '11px', fontWeight: '500'}}>{title}</p>
                <h4 style={{fontWeight: '700'}}>{value}</h4>
            </div>
            <div className='admin-card-icon'><Icon style={{fontSize: '24px', color: '#fd7e14'}} /></div>
        </div>
        <div className='d-flex align-items-center justify-content-between mt-3' style={{fontSize: '14px'}}>
            <span>{timeFrame}</span>
            <div className={`d-flex align-items-center ${percentageColor}`} style={{fontSize: '16px'}}><FaArrowUp /><span style={{marginLeft: '2px'}}>{percentage}</span></div>
        </div>
    </div>
    )
}

function Progress({name, progressWidth, sales}){
    return (
        <div className='d-flex flex-column mb-2'>
            <div className='d-flex justify-content-between align-items-center me-2' style={{fontSize: '12px'}}>
                <span className='mb-2'>{name}</span>
                <span className='mb-2'>{sales}</span>
            </div>
            <div className="progress me-2" role="progressbar" aria-valuemin="0"
                aria-valuemax="100" style={{height: '4px'}}>
                <div className="progress-bar" style={{width: progressWidth, backgroundColor: '#fd7e14'}}></div>
            </div>
        </div>
        )
    }
