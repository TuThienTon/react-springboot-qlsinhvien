import { SvgIcon } from '@mui/material';
import React from 'react';

function SSGridIcon() {
  return <SvgIcon width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.19 0H10.75V6V6.75V11.75H20V6.75V6V5.81C20 2.17 17.83 0 14.19 0Z" />
    <path d="M0 8.25V13.25V13.75V14.19C0 17.83 2.17 20 5.81 20H9.25V13.75V13.25V8.25H0Z" />
    <path d="M9.25 0V6.75H0V5.81C0 2.17 2.17 0 5.81 0H9.25Z" />
    <path d="M20 13.25V14.19C20 17.83 17.83 20 14.19 20H10.75V13.25H20Z" />
  </SvgIcon>;
}

export default SSGridIcon;

export const getSSGridIcon = (props?: any) => <SSGridIcon {...props} />
