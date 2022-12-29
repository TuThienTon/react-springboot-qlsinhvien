import React from 'react'
import whiteLogo from '../../../assets/images/icon/icon-add-file.png';

function ImageImportFile(props: any) {
  const { width = '100%', ...rest } = props;
  return <img src={whiteLogo} width={width} {...rest} />
}

export default ImageImportFile
