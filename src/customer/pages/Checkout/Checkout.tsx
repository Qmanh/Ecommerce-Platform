import { Box, Button, FormControlLabel, IconButton, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm';
import PricingCard from '../Cart/PricingCard';
import { AddCircle, Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createOrder } from '../../../State/customer/OrderSlice';
import { getAllAddressByUser } from '../../../State/customer/AddressSlice';
import { Address } from '../../../types/userTypes';
import { deleteAddress } from '../../../State/AuthSlice';
import { getAddressById } from '../../../State/customer/AddressSliceById';
import { fetchUserCart } from '../../../State/customer/CartSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const paymentGatewayList = [
    {
        value: "VNPAY",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s",
        label: ""
    },
    {
        value: "COD",
        image: "",
        label: "Ship COD",
    }
]


const Checkout = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { cart, address } = useAppSelector(store => store);
    const [paymentGateway, setPaymentGateway] = useState("VNPAY");
    const [addressRadio, setAddressRadio] = useState();
    const [idDelete, setIdDeleted] = useState();
    const dispatch = useAppDispatch();
    const jwt = localStorage.getItem("jwt") || "";

    const [addresses, setAddresses] = useState();


    const handlePaymentChange = (event: any) => {
        setPaymentGateway(event.target.value);
    }

    const handleAddressChange = (event: any) => {
        
        setAddressRadio(event.target.value);
        dispatch(getAddressById({id:event.target.value,jwt})).then((data)=>{
            setAddresses(data.payload)
            console.log(data.payload)
        })
    }


    const handleCheckOut = () => {
        dispatch(createOrder({
            address: addresses,
            jwt: localStorage.getItem("jwt") || "",
            paymentGateway
        }))
    }

    const handleDeleteAddress = (id:any) =>{
        setIdDeleted(id);
        console.log("delete address id: ",id);
        dispatch(deleteAddress({jwt,id})).then(() => {
            // Update addresses state after successful deletion
            dispatch(getAllAddressByUser(jwt))
        });
    }

    useEffect(() => {
        dispatch(getAllAddressByUser(jwt))
        dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
    }, [jwt])

    return (
        <>
            <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
                <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9 '>
                    <div className='col-span-2 space-y-5'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-semibold'>Select Address</h1>
                            <Button onClick={handleOpen}>
                                <AddCircle />
                            </Button>
                        </div>

                        <div className='tex-xs font-medium space-y-5'>
                            <p className='space-y-3'>Saved Address</p>
                            <div className='w-full '>
                                
                                    {address && Array.isArray(address.address) && address.address.map((item) =>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            className='flex justify-between pr-0 border rounded-md'
                                            onChange={handleAddressChange}
                                            value={addressRadio}
                                        >
                                        <div className="p-5 flex">
                                            <FormControlLabel
                                                className='w-[100%] pr-2 rounded-md flex justify-start'
                                                value={item.id}
                                                control={<Radio />}
                                                label={
                                                    <>
                                                        <div className='space-y-3 pt-3'>

                                                            <p>{item.address}, {item.locality}, {item.city}, {item.state}</p>
                                                            <strong>Mobile: </strong> {item.mobile}
                                                        </div>
                                                    </>
                                                } />
                                            
                                        </div>
                                        <div>
                                                <IconButton>
                                                    <Delete sx={{color:'var(--pink)'}} onClick={()=>handleDeleteAddress(item.id)}/>
                                                </IconButton>
                                        </div>
                                        </RadioGroup>
                                    )}
                            </div>
                        </div>

                        <div className='py-4 px-5 rounded-md border'>
                            <Button onClick={handleOpen}>
                                Add New Address
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className='space-y-3 border p-5 rounded-md'>
                                <h1 className='text-primary-color font-medium pb-2 text-center'>Choose Payment Gateway</h1>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    className='flex justify-between pr-0'
                                    onChange={handlePaymentChange}
                                    value={paymentGateway}
                                >
                                    {paymentGatewayList.map((item) =>
                                        <FormControlLabel
                                            className='border w-[45%] pr-2 rounded-md flex justify-center'
                                            value={item.value}
                                            control={<Radio />}
                                            label={
                                                item.image ?
                                                    <img
                                                        className={`${item.value == "VNPAY" ? 'w-14' : ""} object-cover`}
                                                        src={item.image}
                                                        alt={item.label} />
                                                    : item.label
                                            } />
                                    )}

                                </RadioGroup>
                            </div>
                            <div className='border rounded-md'>
                                <PricingCard item={cart.cart} />
                                <div className='p-5'>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        sx={{ py: "11px" }}
                                        onClick={handleCheckOut}
                                    >Check out</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm onClose={onclose} paymentGateway={paymentGateway} />
                </Box>
            </Modal>
        </>
    )
}

export default Checkout