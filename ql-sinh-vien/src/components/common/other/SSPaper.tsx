import Paper from '@mui/material/Paper'
import React from 'react'

function SSPaper({ children }: { children: any }) {
  return (
    <Paper elevation={0} className="my-3 p-3">
      {children}
    </Paper>
  )
}

export default SSPaper
