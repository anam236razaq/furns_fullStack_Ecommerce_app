import React, { useEffect, useState } from 'react'
import Loader from '../../UI/Loader';
import AdminBars from './AdminBars';

export default function OrderList() {
const[isLoading, setIsLoading] = useState(true);

useEffect(()=>{
    const timer = setTimeout(()=> {
      setIsLoading(false);
    }, 1000);

    return ()=> clearTimeout(timer);
  }, []);

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
                           OrderList
                        </section>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}
