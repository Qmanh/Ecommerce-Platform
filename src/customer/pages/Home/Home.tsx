import React from "react";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import { Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Toast from "../../../Theme/Toastify/Toast";


const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="space-y-5 lg:space-y-10 relative pb-20">
                <ElectricCategory/>
                <CategoryGrid/>

                <div className="pt-20">
                    <h1 className="text-lg text-center lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10">TODAY'S DEAL</h1>
                    <Deal/>
                </div>
                

                <section className="py-20">
                    <h1 className="text-lg text-center lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10">SHOP BY CATEGORY</h1>
                    <ShopByCategory/>
                </section>

                <section className="lg:px-20 relative h-[200px] lg:h-[450px] object-cover">
                    <img 
                        className="w-full h-[500px]"
                        src="https://prod.rockmedialibrary.com/api/public/content/fd68c424841042ca87ff86c810f3cb77?v=55db069e"
                    />
                    <div className="absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3">
                        <h1>Sell Your Product</h1>
                        <p className="text-lg md:text-2xl">With <span className="logo">Shopping LazaPee</span></p>
                    
                        <div className="pt-6 flex justify-center ">
                            <Button onClick={()=> navigate("/become-seller")} startIcon={<Storefront/>} variant="contained" size="large">
                                Become Seller
                            </Button>
                        </div>
                    </div>

                </section>
                
            </div>


        </>
    )
}

export default Home