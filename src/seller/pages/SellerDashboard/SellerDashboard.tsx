import React from 'react'
import SellerDrawerList from '../../components/SellerDrawerList/SellerDrawerList'
import SellerRoutes from '../../../Routes/SellerRoutes'
import "../../../App.css";
import '../SellerDashboard/Component/RightSide/RightSide.css';
import Dashboard from './Dashboard';
import Sidebar from './Component/Sidebar';
import RightSide from './Component/RightSide/RightSide';
const SellerDashboard = () => {
    const toggleDrawer = () => {

    }
    return (
        <div>
            <div className='lg:flex lg:h-[80vh] App'>
                <div className='AppGlass'>
                    <section className='hidden lg:block h-full'>
                        <SellerDrawerList toggleDrawer={toggleDrawer} />
                    </section>

                    <section className='ml-[0.5rem] w-full lg:w-[100%] overflow-auto'>
                        <SellerRoutes />
                    </section>

                    <section className='ml-[1rem]'>
                        <RightSide/>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default SellerDashboard