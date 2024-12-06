import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteProduct, fetchSellerProducts } from '../../../State/seller/sellerProductSlice';
import { Product } from '../../../types/ProductTypes';
import { Box, Button, IconButton, Modal, Pagination } from '@mui/material';
import { AddOutlined, Delete, Edit } from '@mui/icons-material';
import './ProductTable.css';
import { formatCurrency } from '../../../Utils/CustomCurrencyVND';
import { toast } from 'react-toastify';
import UpdateProduct from './UpdateProduct';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ProductTable = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
  const [dataProduct, setDataProduct] = useState<Product>();
  const handleClose = () => setOpen(false);
  const { sellerProduct } = useAppSelector(store => store);

  console.log("check sellerProduct: ", dataProduct)
  const [page, setPage] = useState(0);

  const filter = {
    pageNumber: page
  }

  console.log("check pagenumber: ", page)
  const jwt = localStorage.getItem("jwt") || "";
  useEffect(() => {
    const currentFillter = { ...filter, pageNumber: page };
    dispatch(fetchSellerProducts({ jwt, params: currentFillter }))
  }, [open])

  const handlePageChange = (value: number) => {
    setPage(value - 1);
    const fillter = { pageNumber: value - 1 };
    dispatch(fetchSellerProducts({ jwt, params: fillter }))
  }

  const handleClick = (data: any) => {
    setOpen(true);
    console.log("chk data: ", data)
    setDataProduct(data);
  }

  const handleDelete = (id:any) =>{
    console.log("id: ",id)
    dispatch(deleteProduct(id)).then(()=>{
      toast.success('Deleted Product Successfully!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
  }
  return (
    <div className='Table'>
      <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">MRP</TableCell>
              <TableCell align="left">Selling Price</TableCell>
              <TableCell align="left">Color</TableCell>
              <TableCell align="left">Update Stock</TableCell>
              <TableCell align="left">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct.productList.products.map((item: Product) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <div className='flex gap-1 flex-wrap'>
                    {
                      item.images.map((image) =>
                        <img className='w-10 h-15 rounded-md' alt='' src={image} />
                      )
                    }
                  </div>
                </TableCell>
                <TableCell align="left">{item.title}</TableCell>
                <TableCell align="left">{formatCurrency(item.mrpPrice)}</TableCell>
                <TableCell align="left">{formatCurrency(item.sellingPrice)}</TableCell>
                <TableCell align="left">{item.color}</TableCell>
                <TableCell align="left">
                  {
                    item.quantity > 0 ?
                    <Button size='small'>
                      in_stock
                    </Button>
                    :
                    <Button size='small'>
                      out_of_stock
                    </Button>
                  }
                </TableCell>
                <TableCell align="left">
                  
                    <IconButton className='text-primary-color' size='small'>
                      <Edit onClick={()=> handleClick(item)} />
                    </IconButton>

                    <IconButton className='text-primary-color' size='small'>
                      <Delete sx={{color:'red'}} onClick={()=>handleDelete(item.id)}/>
                    </IconButton>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className='flex justify-center py-10'>
        <Pagination
          onChange={(e, value) => handlePageChange(value)}
          count={sellerProduct.productList.totalPageNumber}
          variant="outlined"
          color="primary"
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateProduct onClose={handleClose} data={dataProduct} />
        </Box>
      </Modal>
    </div>
  );
}

export default ProductTable