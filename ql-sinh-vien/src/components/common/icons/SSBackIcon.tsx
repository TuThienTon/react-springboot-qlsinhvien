import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

function SSBackIcon(props: any) {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      {...props}
    >
      <KeyboardDoubleArrowLeftIcon style={{ color: '#0d6efd' }} />
      Quay lại
    </Link>
  )
}

export default SSBackIcon
