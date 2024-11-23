import React from 'react'

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