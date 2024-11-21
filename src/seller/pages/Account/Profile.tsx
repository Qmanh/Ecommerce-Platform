import { Edit } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import ProfileFieldCard from '../../../component/ProfileFieldCard'
import PersionalDetails from './PersionalDetails';
import BussinessDetails from './BussinessDetails';
import PickupAddress from './PickupAddress';
import BankDetails from './BankDetails';
import { useAppSelector } from '../../../State/Store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Profile = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = (formName:string) => {
    setOpen(true)
    setSelectedForm(formName)
  };
  const {seller} = useAppSelector(store=>store);
  const handleClose = () => setOpen(false);

  const [selectedFrom, setSelectedForm] = useState("persionalDetails");

  const renderSelectedForm = () =>{
    switch(selectedFrom){
      case "persionalDetails":
        return <PersionalDetails/>
      case "bussinessDetails":
        return <BussinessDetails/>
      case "pickupAddress":
        return <PickupAddress/>
      default:
        return <BankDetails/>
    }
  }

  return (
    <div className='lg:px-20 pt-3 pb-20 space-y-20'>
      <div className='w-full lg:w-[70%]'>
        <div className='flex items-center pb-3 justify-between'>
          <h1 className='text-2xl font-bold text-gray-600'>Persional Details</h1>
          <div>
              <Button
                onClick={() => handleOpen("persionalDetails")}
                variant='contained'
                size='small' 
                className='w-16 h-16' 
                sx={{borderRadius:"2.9rem"}}>
                <Edit/>
              </Button>
          </div>
        </div>
        <div>
          <Avatar
            sx={{width:"10rem",height:"10rem"}} 
            src="https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png"/>
          <div>
            <ProfileFieldCard keys='Seller Name' value={seller.profile?.sellerName}/>
              <Divider/>
            <ProfileFieldCard keys='Seller Email' value={seller.profile?.email}/>
              <Divider/>
            <ProfileFieldCard keys='Seller Mobile' value={seller.profile?.mobile}/>
          </div>
        </div>
      </div>

      <div className='w-full lg:w-[70%]'>
        <div className='flex items-center pb-3 justify-between'>
          <h1 className='text-2xl font-bold text-gray-600'>Bussiness Details</h1>
          <div>
              <Button 
                onClick={() => handleOpen("bussinessDetails")}
                variant='contained' 
                size='small' 
                className='w-16 h-16' 
                sx={{borderRadius:"2.9rem"}}>
                <Edit/>
              </Button>
          </div>
        </div>
        <div>
          <div>
            <ProfileFieldCard keys='Bussiness Name/ Brand Name' value={seller.profile?.businessDetails.businessName}/>
              <Divider/>
            <ProfileFieldCard keys='GSTIN' value={seller.profile?.gstin || "Not provide"}/>
              <Divider/>
            <ProfileFieldCard keys='Account Status' value={seller.profile?.accountStatus}/>
          </div>
        </div>
      </div>

      <div className='w-full lg:w-[70%]'>
        <div className='flex items-center pb-3 justify-between'>
          <h1 className='text-2xl font-bold text-gray-600'>Pickup Address</h1>
          <div>
              <Button 
               onClick={() => handleOpen("pickupAddress")}
              variant='contained' 
              size='small' 
              className='w-16 h-16' 
              sx={{borderRadius:"2.9rem"}}>
                <Edit/>
              </Button>
          </div>
        </div>
        <div>
          <div>
            <ProfileFieldCard keys='Address' value={seller.profile?.pickupAddress.address || "Not provided"}/>
              <Divider/>
            <ProfileFieldCard keys='City' value={seller.profile?.pickupAddress.city || "Not provided"}/>
              <Divider/>
            <ProfileFieldCard keys='State' value={seller.profile?.pickupAddress.state || "Not provided"}/>
            <ProfileFieldCard keys='Mobile' value={seller.profile?.pickupAddress.mobile || "Not provided"}/>
          </div>
        </div>
      </div>

      <div className='w-full lg:w-[70%]'>
        <div className='flex items-center pb-3 justify-between'>
          <h1 className='text-2xl font-bold text-gray-600'>Bank Details</h1>
          <div>
              <Button 
              onClick={() => handleOpen("bankDetails")}
              variant='contained' 
              size='small' 
              className='w-16 h-16' 
              sx={{borderRadius:"2.9rem"}}>
                <Edit/>
              </Button>
          </div>
        </div>
        <div>
          <div>
            <ProfileFieldCard keys='Account Holder Name' value={seller.profile?.bankDetails.accountHolderName}/>
              <Divider/>
            <ProfileFieldCard keys='Account Number' value={seller.profile?.bankDetails.accountNumber}/>
              <Divider/>
            <ProfileFieldCard keys='IFSC CODE' value={seller.profile?.bankDetails.ifscCode}/>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        {renderSelectedForm()}
      </Box>
      </Modal>
    </div>
  )
}

export default Profile