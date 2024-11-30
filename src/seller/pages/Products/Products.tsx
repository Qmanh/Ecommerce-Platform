import React from 'react'
import ProductTable from './ProductTable'
import { Box, IconButton, Modal } from '@mui/material'
import { Add, AddCircle } from '@mui/icons-material'
import { lightBlue } from '@mui/material/colors'
import AddProduct from './AddProduct'

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

const Products = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h1 className='font-bold mb-5 text-xl'>All Products</h1>
      <div className='flex justify-end'>
        <IconButton>
          <AddCircle sx={{ color: 'var(--pink)' }} onClick={handleOpen} />
        </IconButton>

      </div>
      <ProductTable />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddProduct onClose={handleClose} data={""}/>
        </Box>
      </Modal>
    </div>
  )
}

export default Products