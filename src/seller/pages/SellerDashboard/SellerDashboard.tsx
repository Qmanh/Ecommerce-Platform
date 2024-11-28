import React from 'react'
import SellerDrawerList from '../../components/SellerDrawerList/SellerDrawerList'
import SellerRoutes from '../../../Routes/SellerRoutes'
import "../../../App.css";
import Dashboard from './Dashboard';
const SellerDashboard = () => {
    const toggleDrawer = () =>{

    }
  return (
    <div>
        {/* <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full '>
                <SellerDrawerList toggleDrawer={toggleDrawer}/>
            </section>

            <section className='p-2 w-full lg:w-[80%] overflow-y-auto'>
                <SellerRoutes/>
            </section>
        </div> */}
        <Dashboard/>
    </div>
  )
}

export default SellerDashboard