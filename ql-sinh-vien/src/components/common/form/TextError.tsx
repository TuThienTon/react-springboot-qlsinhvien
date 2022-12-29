import React from 'react'

function TextError(props: any) {
  return (
    <div className='text-danger'>{props.children}</div>
  )
}

export default TextError
