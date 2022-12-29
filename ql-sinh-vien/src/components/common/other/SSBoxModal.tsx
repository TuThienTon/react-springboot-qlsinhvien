import { Box } from '@mui/material'
import React from 'react'
import SSPaper from './SSPaper'

function SSBoxModal({ children, overSx = {} }: { children: any, overSx?: any }) {
  return (
    <Box component="div" sx={{
      position: 'absolute',
      top: '7%',
      left: '50%',
      transform: 'translate(-50%, 0%)',
      width: 600,
      maxHeight: 'calc(100% - 14%)',
      overflowY: 'auto',
      ...overSx
    }}>
      <SSPaper>
        {children}
      </SSPaper>
    </Box>
  )
}

export default SSBoxModal
