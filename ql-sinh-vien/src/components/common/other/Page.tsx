import React from 'react'
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

function Page(data: any) {
  const {title, children} = data;
  return (
    <>
      {/* <Box ref={ref} {...other}> */}
        <title>{title}</title>
        {children}
      {/* </Box> */}
    </>
  )
}

export default Page
