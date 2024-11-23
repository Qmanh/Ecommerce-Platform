import { Button, FormControl, InputLabel, Menu, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { getAllSeller, updateAccountSellerStatus } from '../../../State/seller/sellerSlice';
import { AccountStatus } from '../../../types/SellerType';
import { toast, ToastContainer } from 'react-toastify';

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

const status = [
  {status:'PENDING_VERIFICATION',title:'Pending Verification', description:'Account is pending'},
  {status:'ACTIVE',title:'Active', description:'Account is active'},
  {status:'SUSPENDED',title:'Suspended', description:'Account is temporarily suspended'},
  {status:'DEACTIVATED',title:'Deactivated', description:'Account is deactivated'},
  {status:'BANNED',title:'Banned', description:'Account is permanently banned'},
  {status:'CLOSED',title:'Closed', description:'Account is permanently closed'},
]

const statusAccountColor: { [key: string]: { color: string; label: string } } = {
  PENDING_VERIFICATION: { color: '#FFA500', label: 'PENDING_VERIFICATION' },
  ACTIVE: { color: '#2ac93d', label: 'ACTIVE' },
  SUSPENDED: { color: '#F5BCBA', label: 'SUSPENDED' },
  DEACTIVATED: { color: '#1E90FF', label: 'DEACTIVATED' },
  BANNED: { color: '#32CD32', label: 'BANNED' },
  CLOSED: { color: '#FF0000', label: 'CLOSED' },
};
const statusAccount = [
  {color:'#FFA500', label: 'PENDING_VERIFICATION'},
  {color:'#F5BCBA', label: 'ACTIVE'},
  {color:'#F5BCBA', label: 'SUSPENDED'},
  {color:'#1E90FF', label: 'DEACTIVATED'},
  {color:'#32CD32', label: 'BANNED'},
  {color:'#FF0000', label: 'CLOSED'},
]

const SellersTable = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");
  const {seller} = useAppSelector(store=>store);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt") ||"";
  const [params, setParams] = useState({ status: accountStatus });
  const [updateStatus, setUpdateStatus] = useState(false);

  
useEffect(() => {
    setParams((prevParams) => ({
        ...prevParams,
        status: accountStatus
    }));
}, [accountStatus]); // Run this effect when accountStatus changes

useEffect(() => {
    dispatch(getAllSeller(params));
}, [params]); // Run this effect when params change


  const [anchorEl, setAnchorEl] = useState<null | any>({});
  const open = Boolean(anchorEl);
  
  
  const handleChange = (event:any)=>{
    setAccountStatus(event.target.value)
  }

  const handleClick = (event:any, orderId:number) => {
    setAnchorEl((prev:any)=>({...prev, [orderId]:event.currentTarget}));
  };
  const handleClose = (orderId:number)=>() => {
    setAnchorEl((prev:any)=>({...prev, [orderId]:null}));
  };
  const handleUpdateOrderStatus = (sellerId:any,accountStatus:any)=>() =>{
    
    dispatch(updateAccountSellerStatus({jwt,sellerId,accountStatus}))
    .then(()=>{
        setUpdateStatus(true);
        setAccountStatus(accountStatus);
        setParams((prevParams) => ({
          ...prevParams,
          status: accountStatus
        }));
    })
    .catch(()=>{
      toast.error('Update Status Account Failed', {
        position: "top-right",
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

  useEffect(()=>{
    if(updateStatus){
      toast.success('Update Status Account Success!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    setUpdateStatus(false);
  },[updateStatus])

  return (
    <>
      <div className='pb-5 w-60'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Accoun Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accountStatus}
          label="Account Status"
          onChange={handleChange}
        >
          {
            status.map((item) => <MenuItem value={item.status}>{item.title}</MenuItem>)
          }
        </Select>
      </FormControl>

        

      </div>

      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Seller Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="right">Mobile</StyledTableCell>
                <StyledTableCell align="right">Bussiness Name</StyledTableCell>
                <StyledTableCell align="right">Account Status</StyledTableCell>
                <StyledTableCell align="right">Change Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seller.sellers.map((item:any) => (
                <StyledTableRow key={item.sellerName}>
                  <StyledTableCell component="th" scope="row">
                    {item.sellerName}
                  </StyledTableCell>
                  <StyledTableCell>{item.email}</StyledTableCell>
                  <StyledTableCell align="right">{item.mobile}</StyledTableCell>
                  <StyledTableCell align="right">{item.businessDetails?.businessName}</StyledTableCell>

                  <StyledTableCell align="right">
                    <span style={{color:`${statusAccountColor[item.accountStatus].color}`, borderColor:`${statusAccountColor[item.accountStatus].color}`}} className={`px-5 py-2 border rounded-full`}>{item.accountStatus}</span>
                  </StyledTableCell>
                  
                  <StyledTableCell align="right">
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
                      statusAccount.map((status) => 
                        <MenuItem
                          key={status.label}
                          onClick={handleUpdateOrderStatus(item.id, status.label)}>
                            {status.label}
                        </MenuItem>
                      )
                    }
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
    </>
  )
}

export default SellersTable