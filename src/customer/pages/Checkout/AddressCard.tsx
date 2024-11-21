import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
    const handleChange = (event:any)=>{
        console.log(event.target.checked)
    }

  return (
    <div className="p-5 border rounded-md flex">
        <div>
            <Radio
                checked={true}
                onChange={handleChange}
                value=""
                name='radio-button'
            />
        </div>
        <div className='space-y-3 pt-3'>
            <h1>Dev</h1>
            <p>Hoa Binh, Tay Thanh, Tan Phu</p>
            <strong>Mobile: </strong> 09091234567
        </div>

    </div>
  )
}

export default AddressCard