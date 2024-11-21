import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid, Grid2, IconButton, Rating } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ReviewCard = () => {
  return (
    <div className='flex justify-between '>
      <Grid2 container spacing={10}>
        <Grid2 size={{xs:1}}>
          <Box>
            <Avatar className='text-white' sx={{width:56, height:56, bgcolor:"#9155FD"}}>
              Z
            </Avatar>
          </Box>
        </Grid2>

        <Grid2 size={{xs:9}}>
        <div className='space-y-2'>
          <div>
            <p className='font-semibold text-lg'>Dev</p>
            <p className='opacity-70'>2024-09-27T23:16:07.478</p>
          </div>
        </div>
        <Rating
          readOnly
          value={4}
          precision={1}
        />
        <p>Value for money product, great product</p>
        
        <div className=''>
          <img 
            className='w-24 h-24 object-cover'
            src='https://i.pinimg.com/236x/3e/3d/48/3e3d4867b29479b7fd86ee87ca09179d.jpg'
          />
        </div>
        </Grid2>
      </Grid2>
     <div>
      <IconButton>
        <Delete sx={{color:red[700]}}/>
      </IconButton>
     </div>
        
    </div>
  )
}

export default ReviewCard