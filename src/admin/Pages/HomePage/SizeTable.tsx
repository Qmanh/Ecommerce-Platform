import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { HomeCategory } from '../../../types/HomeCategoryTypes';
import HomeCategoryForm from './HomeCategoryForm';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteSize, fetchAllSize, fetchHomeCategories } from '../../../State/admin/adminSlice';
import { toast } from 'react-toastify';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SizeTable = () => {
  const [open, setOpen] = useState(false);
  const { homeCategory } = useAppSelector(store => store);
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<HomeCategory>();
  const handleOpen = (category: HomeCategory) => {
    setOpen(true);

    console.log("category Id: ", category);
    setCategory(category);
  }

  const handleClose = () => {
    dispatch(fetchHomeCategories())
    setOpen(false)
  };

  const handleDeleteSize = (name:any)=>{
    dispatch(deleteSize(name)).then(()=>{
        toast.success('Delete Size Successfully!', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      dispatch(fetchAllSize())
    })
    .catch(()=>{
      toast.error('Delete Size Failed!', {
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
  useEffect(() => {
    dispatch(fetchAllSize())
  }, [])
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Size Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homeCategory.sizes.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {item.id}
                </StyledTableCell>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell>{item.description}</StyledTableCell>
                <StyledTableCell align="right" sx={{color:`${item.statusSize==='YES'?'green':'red'}`}}>{item.statusSize}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button>
                    <Delete sx={{color:'var(--pink)'}} onClick={()=>handleDeleteSize(item.name)} />
                  </Button>
                </StyledTableCell>

              </StyledTableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HomeCategoryForm data={category} />
        </Box>
      </Modal>
    </>
  );
}

export default SizeTable