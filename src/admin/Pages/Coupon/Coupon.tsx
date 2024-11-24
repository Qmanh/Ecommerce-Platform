import { ChangeCircle, Delete } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteCoupon, getAllCoupons, updateActiveCoupon } from '../../../State/admin/adminCouponSlice';
import { formatCurrency } from '../../../Utils/CustomCurrencyVND';
import { lightBlue } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Coupon = () => {
  const dispatch = useAppDispatch();
  const {coupons} = useAppSelector(store=>store);
  const jwt = localStorage.getItem("jwt")||"";
  
  const [updated, forceUpdate] = useReducer(x => x+1,0)


  const handleUpdateActive =(couponId:any) =>{
    
    dispatch(updateActiveCoupon({jwt:jwt, id:couponId}))
    .then(()=>{
      toast.success('Update Active Successfully!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        forceUpdate();
    })
    .catch(()=>{
      toast.error('Update Active Failed!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        forceUpdate();
    })
  }

  const handleDelete =(couponId:any) =>{
    
    dispatch(deleteCoupon({jwt:jwt, id:couponId}))
    .then(()=>{
      toast.success('Deleted Successfully!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        forceUpdate();
    })
    .catch(()=>{
      toast.error('Deleted Failed!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        forceUpdate();
    })
  }
  
  useEffect(()=>{
    dispatch(getAllCoupons(localStorage.getItem("jwt")))
  },[updated])

  return (
    <>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Coupon Code</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell >Minimum Value</StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center" >Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.coupons?.map((coupon:any) => (
                <StyledTableRow key={coupon.code}>
                  <StyledTableCell component="th" scope="row">
                    {coupon.code}
                  </StyledTableCell>
                  <StyledTableCell>{coupon.validityStartDate}</StyledTableCell>
                  <StyledTableCell >{coupon.validityEndDate}</StyledTableCell>
                  <StyledTableCell align="center">{formatCurrency(coupon.minimumOrderValue)}</StyledTableCell>
                  <StyledTableCell align="center">{coupon.discountPercentage} %</StyledTableCell>
                  <StyledTableCell align="center">
                    <span style={{color:`${coupon.active ? '#339933':'#CC0000'}`,
                                   borderColor:`${coupon.active ? '#339933':'#CC0000'}`}} 
                                   className={`px-5 py-2 border rounded-full`}>
                          {coupon.active ? `ACTIVE`:`NO ACTIVE`}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={()=>handleUpdateActive(coupon.id)} >
                      <ChangeCircle
                      className='rounded-full transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-600 mr-2'
                      sx={{color:`${coupon.active ?'#339933':'#CC0000'}`, cursor:'pointer'}}/>
                    </IconButton>
                    
                    <IconButton onClick={()=>handleDelete(coupon.id)}>
                      <Delete className='rounded-full bg-blue-900 transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-600' sx={{color:'#CCFFFF',cursor:'pointer', backgroundColor:lightBlue}}/>
                    </IconButton>
                    
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>
  )
}

export default Coupon