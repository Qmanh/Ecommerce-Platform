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
import { Box, Button, Menu, MenuItem, Modal, Pagination } from '@mui/material';
import { OrderStatus } from '../../../types/OrderTypes';
import './OrderTable.css';
import { formatDate } from '../../../Utils/FormatDate';
import OrderDetail from './OrderDetail';

const orderStatusColor = {
  PENDING: {color: '#FFB90F', label: 'PENDING'},
  CONFIRMED: {color: '#20B2AA', label: 'CONFIRMED'},
  PLACED: {color: '#698B22', label: 'PLACED'},
  SHIPPED: {color: '#1E90FF', label: 'SHIPPED'},
  DELIVERED: {color: '#32CD32', label: 'DELIVERED'},
  CANCELLED: {color: '#FF0000', label: 'CANCELLED'},
}

const orderStatus = [
  {color:'#FFB90F', label: 'PENDING'},
  {color:'#698B22', label: 'PLACED'},
  {color:'#20B2AA', label: 'CONFIRMED'},
  {color:'#1E90FF', label: 'SHIPPED'},
  {color:'#32CD32', label: 'DELIVERED'},
  {color:'#FF0000', label: 'CANCELLED'},
]
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

const OrderTable = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [dataDetail, setDataDetail] = useState("");
    const handleCloseModal = () => setOpenModal(false);
    const {sellerOrder} = useAppSelector(store => store);
    const [page, setPage] = useState(0);

    const newFillter={pageNumber:page};

    console.log("check pagenumber: ", page)
    
    const jwt = localStorage.getItem("jwt")||"";

    const [anchorEl, setAnchorEl] = useState<null | any>({});
    const open = Boolean(anchorEl);
    const handleClick = (event:any, orderId:number) => {
      setAnchorEl((prev:any)=>({...prev, [orderId]:event.currentTarget}));
    };
    const handleClose = (orderId:number)=>() => {
      setAnchorEl((prev:any)=>({...prev, [orderId]:null}));
    };
    const handleUpdateOrderStatus = (orderId:number, orderStatus:any)=>() =>{
      dispatch(updateOrderStatus({jwt:localStorage.getItem("jwt")||"",orderId, orderStatus})).then(()=>{
        const currentFillter = { ...newFillter, pageNumber: page }; // Cập nhật fillter với pageNumber hiện tại
        dispatch(fetchSellerOrders({ jwt, params: currentFillter }));
      })

      
    }

    const handlePageChange = (value:number) => {
      setPage(value-1);
      const number = value - 1
      const fillter={pageNumber: number};
      dispatch(fetchSellerOrders({jwt, params: fillter}))
    }

    const handleGetDetail=(data:any)=>{
      setOpenModal(true);
      setDataDetail(data);
    }
    useEffect(()=>{
      const currentFillter = { ...newFillter, pageNumber: page };
      dispatch(fetchSellerOrders({jwt, params: currentFillter}))
    },[])
  

    return (
      <>
      <div className="Table">
        <h3 className='font-bold'>Recent Orders</h3>
        <TableContainer component={Paper}
          style={{boxShadow: '0px 13px 20px 0px #80808029'}}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customers</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell align="left">Order Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellerOrder.orderList.orderDTOList.map((item) => (
              
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.user.email}
                  </TableCell>
                  <TableCell>
                    {formatDate(item.orderDate)}
                  </TableCell>
                  <TableCell align="left">
                  <span style={{color:`${orderStatusColor[item.orderStatus].color}`, borderColor:`${orderStatusColor[item.orderStatus].color}`}} className={`px-5 py-2 border rounded-full`}>{item.orderStatus}</span>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      size="small" color="primary"
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event) => handleClick(event,item.id)}
                    >
                      Status
                    </Button>
                    <Menu
                      id={`status-menu ${item.id}`}
                      anchorEl={anchorEl[item.id]}
                      open={Boolean(anchorEl[item.id])}
                      onClose={handleClose(item.id)}
                      MenuListProps={{
                        'aria-labelledby': `status-menu ${item.id}`,
                      }}
                    >
                    { 
                      orderStatus.map((status) => 
                        <MenuItem
                          key={status.label}
                          onClick={handleUpdateOrderStatus(item.id, status.label)}>
                            {status.label}
                        </MenuItem>
                      )
                    }
                    </Menu>
                  </TableCell>
                  <TableCell align='left'>
                      <span className='Details cursor-pointer' onClick={()=>handleGetDetail(item)}>Detail</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className='flex justify-center py-10'>
            <Pagination 
              onChange={(e,value) => handlePageChange(value)}
              count={sellerOrder.orderList.totalPageNumber < 1 ? 1:sellerOrder.orderList.totalPageNumber }
              variant="outlined" 
              color="primary"  
            />
          </div>
        </div> 

        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OrderDetail onClose={handleCloseModal} data={dataDetail}/>
        </Box>
      </Modal>
      </>
      );
}

export default OrderTable