import React from 'react'

function SSToastWithElement(msg: any) {
  return (
    <div dangerouslySetInnerHTML={{ __html: msg }}></div>
  )
}

export default SSToastWithElement