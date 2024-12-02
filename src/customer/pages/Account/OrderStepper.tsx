import { CheckCircle, FiberManualRecord } from '@mui/icons-material';
import { Box, imageListItemBarClasses } from '@mui/material';
import React, { useEffect, useState } from 'react'

const steps = [
    { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED", number:0 },
    { name: "Packed", description: "Item packed in dispatch Warehouse", value: "CONFIRMED" , number:1},
    { name: "Shipped", description: "by Mon, 15 Jul", value: "SHIPPED", number:2 },
    { name: "Arriving", description: "by 16 Jul - 18 Jul", value: "ARRIVING" , number:3},
    { name: "Arrived", description: "by 16 Jul - 18 Jul", value: "DELIVERED" , number:4}
];

const canceledStep = [
    { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED", number:0 },
    { name: "Order Cancelled", description: "on Thu, 11 Jul", value: "CANCELLED",number:1 }
]


const OrderStepper = ({ orderStatus }: any) => {

const getOrderStatusNumber = (orderStatus:any) => {
    const step = steps.find(step => step.value === orderStatus);
    return step ? step.number : null; 
};

const currentStep = getOrderStatusNumber(orderStatus);

const [statusStep, setStatusStep] = useState(steps);

    useEffect(() => {
        if (orderStatus === 'CANCELLED') {
            setStatusStep(canceledStep)
        } else {
            setStatusStep(steps)
        }
    }, [orderStatus])
    return (
        <Box className="my-10">
            {statusStep.map((step, index) => (
                <>
                    <div key={index} className={`flex px-4`}>
                        <div className='flex flex-col items-center'>
                            <Box
                                sx={{ zIndex: -1 }}
                                className={` w-8 h-8 rounded-full flex items-center 
                                justify-center z-10 ${index <= Number(currentStep)
                                        ? "bg-gray-200 text-blue-500"
                                        : "bg-gray-300 text-gray-600"
                                    }    
                            `}
                            >
                                {step.value === orderStatus ? (
                                    <CheckCircle />
                                ) : (
                                    <FiberManualRecord sx={{ zIndex: -1 }} />
                                )
                                }
                            </Box>
                            {statusStep.length - 1 != index && (
                                <div className={`border h-20 w-[2px] ${index < Number(currentStep)
                                    ? "bg-primary-color" : "bg-gray-300 text-gray-600"
                                    }`}>
                                </div>
                            )}
                        </div>
                        <div className={`ml-2 w-full`}>
                            <div className={`${step.value === orderStatus
                                ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3"
                                : ""
                                } ${(orderStatus === "CANCELLED" && step.value === orderStatus) ? "bg-red-500" : ""}
                            w-full
                        `}>
                                <p className={``}>
                                    {step.name}
                                </p>
                                <p className={`${step.value === orderStatus
                                    ? "text-gray-200"
                                    : "text-gray-500"
                                    } text-xs`}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </Box>
    )
}

export default OrderStepper