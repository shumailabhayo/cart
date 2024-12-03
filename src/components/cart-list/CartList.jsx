import { Box, Drawer, Typography } from '@mui/material';
import React from 'react';

const CartList = (props) => {
  const { openCartList, toggleCartList } = props; // Fixed typo here
  return (
    <>
      <Drawer open={openCartList} onClose={toggleCartList(false)}>
        <Box sx={{ width: '340px' }}>
          <Typography className='fw-bold text-center mt-4'>Cart List</Typography>
        </Box>
      </Drawer>
    </>
  );
}

export default CartList;

