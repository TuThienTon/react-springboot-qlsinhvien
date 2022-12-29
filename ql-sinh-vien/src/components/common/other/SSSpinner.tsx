import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

function SSSpinner({ open }: { open: boolean }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1000 }}
      open={open}
      onClick={() => { }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default SSSpinner
