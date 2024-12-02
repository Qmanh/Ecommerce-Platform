import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid, Grid2, IconButton, Rating } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ReviewCard = ({data}:any) => {

  console.log("data: ", data)
  return (
        <Grid2 container spacing={0}>
          <div className='w-full'>
            <Grid2 size={{ xs: 9 }}>
              <div className='space-y-2 w-full'>
                <div className='flex flex-row'>
                <Avatar className='text-white' sx={{ width: 26, height: 26, bgcolor: "#9155FD", marginRight:2 }}>
                  {
                    data.user?.fullName.split(" ")[1].charAt(0)
                  }
                </Avatar>
                  <p className='font-semibold text-md mr-2'>{data.user?.fullName}</p>
                  <p className='opacity-70'>{data.updatedAt}</p>
                </div>
              </div>
              <Rating
                readOnly
                value={data.rating}
                precision={1}
                sx={{marginLeft:4}}
              />
              <p className='text-sm ml-4'>{data.reviewText}</p>

              <div className='mt-2'>
                <img
                  className='w-16 h-16 object-cover ml-4'
                  src={data.productImages[0]}
                />
              </div>
            </Grid2>
          </div>

          <div className='text-right'>
          <IconButton>
            <Delete sx={{ color: red[700] }} />
          </IconButton>
        </div>

        </Grid2>
  )
}

export default ReviewCard