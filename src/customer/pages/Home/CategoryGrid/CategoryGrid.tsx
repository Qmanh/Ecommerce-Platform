import React from "react";

const CategoryGrid = () => {
    return (
        <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
            
            <div className="col-span-3 row-span-12 text-white">
                <img 
                    className="w-full h-full object-cover object-top rounded-md"
                    src="https://i.pinimg.com/564x/8e/3d/34/8e3d344524e0ca5e00c1f0edb20e48db.jpg"
                    alt=""
                />
            </div>

            <div className="col-span-2 row-span-6 text-white">
                <img 
                    className="w-full h-full object-cover object-top rounded-md"
                    src="https://i.pinimg.com/564x/49/e4/30/49e4303f27f639206afbd96e57999e96.jpg"
                    alt=""
                />
            </div>

            <div className="col-span-4 row-span-6 text-white">
                <img 
                    className="w-full h-full object-cover object-top rounded-md"
                    src="https://i.pinimg.com/564x/32/97/83/3297830d51e20faeadf13b021ef00821.jpg"
                    alt=""
                />
            </div>

            <div className="col-span-3 row-span-12 text-white">
                <img 
                    className="w-full h-full object-cover object-top rounded-md"
                    src="https://i.pinimg.com/564x/62/94/14/629414846b1a26ca01923a600e2dc402.jpg"
                    alt=""
                />
            </div>

            <div className="col-span-4 row-span-6 text-white">
                <img 
                    className="w-full h-full object-cover object-top rounded-md"
                    src="https://i.pinimg.com/564x/f9/62/6e/f9626e9ff452b0583f9003ab4f161cc4.jpg"
                    alt=""
                />
            </div>

            <div className="col-span-2 row-span-6 text-white">
                <img 
                    className="w-full h-full object-cover object-top rounded-md"
                    src="https://i.pinimg.com/564x/9a/84/d5/9a84d54a1618b2e2acbdcca107c46af7.jpg"
                    alt=""
                />
            </div>
        </div>
    )
}

export default CategoryGrid