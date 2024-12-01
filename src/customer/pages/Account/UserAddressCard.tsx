import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../State/Store'
import { deleteAddress, fetchUserAddress, fetchUserProfile } from '../../../State/AuthSlice'
import { getAllAddressByUser } from '../../../State/customer/AddressSlice'
import { Navigate } from 'react-router-dom'

const UserAddressCard = ({address}:{address:any}) => {

  return (
    <div className="p-5 border rounded-md flex">
        <div className='space-y-3'>
            <h1>{address.name}</h1>
            <p>{address.address}, {address.locality}, {address.city}, {address.state}</p>
            <strong>Mobile: </strong> {address.mobile}
        </div>

    </div>
  )
}

export default UserAddressCard