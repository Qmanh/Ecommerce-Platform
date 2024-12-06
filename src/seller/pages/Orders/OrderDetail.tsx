import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerOrders, updateOrderStatus } from '../../../State/seller/sellerOrderSlice';
import { Box, Button, Grid2, IconButton, Menu, MenuItem, Modal, Pagination, TextField } from '@mui/material';
import { OrderStatus } from '../../../types/OrderTypes';
import './OrderTable.css';
import { formatDate } from '../../../Utils/FormatDate';
import { useFormik } from 'formik';
import { Close } from '@mui/icons-material';
import { formatCurrency} from '../../../Utils/CustomCurrencyVND';

const orderStatusColor = {
  PENDING: { color: '#FFB90F', label: 'PENDING' },
  CONFIRMED: { color: '#20B2AA', label: 'CONFIRMED' },
  PLACED: { color: '#698B22', label: 'PLACED' },
  SHIPPED: { color: '#1E90FF', label: 'SHIPPED' },
  DELIVERED: { color: '#32CD32', label: 'DELIVERED' },
  CANCELLED: { color: '#FF0000', label: 'CANCELLED' },
}

const orderStatus = [
  { color: '#FFB90F', label: 'PENDING' },
  { color: '#698B22', label: 'PLACED' },
  { color: '#20B2AA', label: 'CONFIRMED' },
  { color: '#1E90FF', label: 'SHIPPED' },
  { color: '#32CD32', label: 'DELIVERED' },
  { color: '#FF0000', label: 'CANCELLED' },
]


const OrderDetail = ({ onClose, data }: { onClose: any, data: any }) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt") || "";

  const formik = useFormik({
    initialValues: {
      paymentStatus: data.paymentStatus,
      totalItem: data.totalItem,
      totalMrpPrice: data.totalMrpPrice,
      totalSellingPrice: data.totalSellingPrice,
      deliverDate: data.deliverDate,
      orderDate: data.orderDate,
      orderStatus: data.orderStatus,
      discount: data.discount,

    },
    onSubmit: (values: any) => {
      console.log(values)
    }
  })

  // const handleRemoveImage = (index: number) => {
  //   const updatedImages = [...formik.values.images]
  //   updatedImages.splice(index, 1);
  //   formik.setFieldValue("images", updatedImages);
  // }

  // const childCategory = (category: any, parentCategoryId: any) => {
  //   return category.filter((child: any) => {
  //     return child.parentCategoryId == parentCategoryId;
  //   });
  // };


  return (
    <div>
      <h1 className='text-center mb-4 text-xl text-primary-color'>Order Id: <strong>{data.id} </strong>- Name: <strong>{data.user.fullName}</strong></h1>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 3 }}>
          <TextField
            fullWidth
            id="paymentStatus"
            name="paymentStatus"
            label="Payment Status"
            value={formik.values.paymentStatus}
          />
        </Grid2>

        <Grid2 size={{ xs: 3 }}>
          <TextField
            fullWidth
            id="orderStatus"
            name="orderStatus"
            label="Order Status"
            value={formik.values.orderStatus}
          />
        </Grid2>


        <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            id="totalMrpPrice"
            name="totalMrpPrice"
            label="Total MRP Price"
            type='text'
            value={formatCurrency(formik.values.totalMrpPrice)}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            id="totalSellingPrice"
            name="totalSellingPrice"
            label="Total Selling Price"
            type='text'
            value={formatCurrency(formik.values.totalSellingPrice)}
          />
        </Grid2>

        <Grid2 size={{ xs: 3 }}>
          <TextField
            fullWidth
            id="totalItem"
            name="totalItem"
            label="Item"
            value={formik.values.totalItem}
          />
        </Grid2>

        <Grid2 size={{ xs: 3 }}>
          <TextField
            fullWidth
            id="discount"
            name="discount"
            label="Discount"
            value={formik.values.discount}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            id="orderDate"
            name="orderDate"
            label="Order Date"
            type='text'
            value={formatDate(formik.values.orderDate)}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            id="deliverDate"
            name="deliverDate"
            label="Deliver Date"
            type='text'
            value={formatDate(formik.values.deliverDate)}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 12, lg: 12 }}>
          <TableContainer component={Paper}
            style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Size</TableCell>
                  <TableCell align="left">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.orderItems.map((item: any) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {item.product.title}
                      </TableCell>
                      <TableCell>
                        {item.product.color}
                      </TableCell>
                      <TableCell align="left">
                        {item.quantity}
                      </TableCell>

                      <TableCell align="left">
                        {item.size}
                      </TableCell>

                      <TableCell align="left">
                        {formatCurrency(item.sellingPrice)}
                      </TableCell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>

      </Grid2>

    </div>
  )
}

export default OrderDetail