import React from 'react'

function IconRequiredLabel({show}: {show: boolean}) {
  if (show) {
    return (
      <span className="text-danger">
        *
      </span>
    )
  }
  return null
}

export default IconRequiredLabel
