import React, { useEffect, useRef, useState } from 'react'
import { AiFillDollarCircle } from 'react-icons/ai'
import { FaArrowUp} from 'react-icons/fa'
import ApexCharts from 'apexcharts';
import { RiShoppingBag3Line } from 'react-icons/ri'
import { IoPersonCircle } from 'react-icons/io5';
import Loader from '../../UI/Loader';
import AdminBars from './AdminBars';

export default function Dashboard() {
    const[isLoading, setIsLoading] = useState(true);
    const chart1Ref = useRef(null);
    const chart2Ref = useRef(null);
    const chart3Ref = useRef(null);
    const chart4Ref = useRef(null);

    useEffect(()=>{
        const timer = setTimeout(()=> {
          setIsLoading(false);
        }, 1000);
    
        return ()=> clearTimeout(timer);
      }, []);

    /****Area Sales Chart***/
    useEffect(() => {
        if(!isLoading && chart1Ref.current){
        const chart1 = new ApexCharts(chart1Ref.current, {
            chart: {
              height: 280,
              type: 'area',
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth',
            },
            series: [
              {
                name: 'Profit',
                data: [31, 40, 28, 51, 42, 109, 100],
              },
              {
                name: 'Sales',
                data: [11, 32, 45, 32, 34, 52, 41],
              },
            ],
            xaxis: {
              type: 'datetime',
              categories: [
                '2018-09-19T00:00:00',
                '2018-09-19T01:30:00',
                '2018-09-19T02:30:00',
                '2018-09-19T03:30:00',
                '2018-09-19T04:30:00',
                '2018-09-19T05:30:00',
                '2018-09-19T06:30:00',
              ],
              labels: {
                style: {
                  colors: '#9aa0ac',
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  color: '#9aa0ac',
                },
              },
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm',
              },
            },
          });
        
        chart1.render();

        return () => {
            chart1.destroy();
        };
    }
    }, [isLoading]);

    /****Pie Sales Chart****/
    useEffect(() => {
        if(!isLoading && chart2Ref.current){
        const chart2 = new ApexCharts(chart2Ref.current, {
                series: [44, 55, 41, 15],
                chart: {
                    type: 'donut',
                },
                labels: ['Beds', 'Chairs', 'Sofas', 'Tables'],
                dataLabels: {
                    enabled: false
                },
                legend: {
                    position: 'bottom'
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

    /****Bar Sales Chart *****/
    useEffect(() => {
        if(!isLoading && chart3Ref.current){
        const chart3 = new ApexCharts(chart3Ref.current, {
            series: [
                {
                  name: 'Beds',
                  data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                },
                {
                  name: 'Chairs',
                  data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                }
              ],
              chart: {
                type: 'bar',
                height: 280
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '30%',
                  borderRadius: 5,
                  borderRadiusApplication: 'end'
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
              },
              fill: {
                opacity: 1
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val ;
                  }
                }
              }
        });
        chart3.render();

        return () => {
            chart3.destroy();
        };
    }
    }, [isLoading]);

    /***Line Chart For Peak Sales****/
    useEffect(() => {
        if(!isLoading && chart4Ref.current){
        const chart4 = new ApexCharts(chart4Ref.current, {
            series: [{
                name: "Sales",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }],
              chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Peak Sales',
                align: 'left'
              },
            grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], 
                  opacity: 0.5
                },
              },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              }
        });
        chart4.render();

        return () => {
            chart4.destroy();
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
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-sm-6 col-lg-3 mb-4'>
                                            <AdminCard title='Sales' value='$50,897' icon={AiFillDollarCircle}
                                                timeFrame='last week' percentage='14%' percentageColor='text-success'/>
                                        </div>
                                        <div className='col-sm-6 col-lg-3 mb-4'>
                                            <AdminCard title='Monthly order' value='3456' icon={RiShoppingBag3Line}
                                                timeFrame='last week' percentage='17%' percentageColor='text-danger'/>
                                        </div>
                                        <div className='col-sm-6 col-lg-3 mb-4'>
                                            <AdminCard title='Monthly revenue' value='$1456' icon={AiFillDollarCircle}
                                                timeFrame='last week' percentage='14%' percentageColor='text-success'/>
                                        </div>
                                        <div className='col-sm-6 col-lg-3 mb-4'>
                                            <AdminCard title='online customers' value='42,456' icon={IoPersonCircle}
                                                timeFrame='last week' percentage='11%' percentageColor='text-danger'/>
                                        </div>
                                    </div>
                                    <div className='row mb-5'>
                                        <div className="col-12 col-lg-7">
                                            <div className="card admin-card px-0">
                                                <h6 className='mt-2 ps-2'>Total Sales</h6>
                                                <div className="card-body">
                                                    <div className="recent-report__chart">
                                                        <div ref={chart1Ref}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-5 mt-5 mt-lg-0">
                                            <div className="card admin-card px-0">
                                                <h6 className='mt-2 ps-2'>Total Sales</h6>
                                                <div className="card-body">
                                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                                        <div id="chart2" ref={chart2Ref}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-5'>
                                        <div className="col-12 col-lg-4">
                                            <div className="card admin-card px-0">
                                                <h6 className='p-2'>Product Demand</h6>
                                                <div className='card-header d-flex justify-content-between align-items-center border-top'>
                                                    <h6 className='col-6'>Product</h6>
                                                    <h6 className='col-6'>Popularity</h6>
                                                </div>
                                                <div className="card-body p-0">
                                                    <Progress name='Tables' progressWidth='15%' backgroundColor='rgb(255, 69, 96)'/>
                                                    <Progress name='Sofas' progressWidth='41%' backgroundColor='rgb(254, 176, 25)'/>
                                                    <Progress name='Beds' progressWidth='44%' backgroundColor='rgb(0, 143, 251)'/>
                                                    <Progress name='Chairs' progressWidth='55%' backgroundColor='rgb(0, 227, 150)'/>
                                                    <Progress name='ArmChair' progressWidth='80%' backgroundColor='rgb(0, 54, 130)'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-8 mt-5 mt-lg-0">
                                            <div className="card admin-card">
                                                <h6 className='mt-2 ps-2'>Average Sales</h6>
                                                <div className="card-body">
                                                    <div className="recent-report__chart">
                                                        <div ref={chart3Ref}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-5'>
                                        <div className="col-12 col-lg-6">
                                            <div className="card admin-card px-0">
                                                <div className="card-body">
                                                    <div className="recent-report__chart">
                                                        <div ref={chart4Ref}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 mt-5 mt-lg-0">
                                            <div className="card admin-card px-0">
                                                <h6 className='mt-2 ps-2'>Google Maps</h6>
                                                <div className="card-body">
                                                <iframe width="95%" height="325" src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_URL"
                                                    frameBorder="0" style={{ border: '0' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
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


function Progress({name, progressWidth, backgroundColor}){
return (
    <div className='d-flex justify-content-between align-items-center progress-border'>
        <span className='col-4 ms-3'>{name}</span>
        <div className="col-7 progress me-2" role="progressbar" aria-valuemin="0"
            aria-valuemax="100" style={{height: '14px'}}>
            <div className="progress-bar" style={{width: progressWidth, backgroundColor: backgroundColor}}></div>
        </div>
    </div>
    )
}