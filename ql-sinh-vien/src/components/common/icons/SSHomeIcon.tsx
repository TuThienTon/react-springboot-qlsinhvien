import SvgIcon from '@mui/material/SvgIcon';
import React from 'react';

function SSHomeIcon(props: any) {
  return <SvgIcon {...props} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.86 8.36985L13.93 2.82985C12.86 1.96985 11.13 1.96985 10.07 2.81985L3.14001 8.36985C2.36001 8.98985 1.86001 10.2998 2.03001 11.2798L3.36001 19.2398C3.60001 20.6598 4.96001 21.8098 6.40001 21.8098H17.6C19.03 21.8098 20.4 20.6498 20.64 19.2398L21.97 11.2798C22.13 10.2998 21.63 8.98985 20.86 8.36985ZM12 15.4998C10.62 15.4998 9.50001 14.3798 9.50001 12.9998C9.50001 11.6198 10.62 10.4998 12 10.4998C13.38 10.4998 14.5 11.6198 14.5 12.9998C14.5 14.3798 13.38 15.4998 12 15.4998Z"/>
  </SvgIcon>
}

export default SSHomeIcon;

export const getSSHomeIcon = (props? : any) => <SSHomeIcon {...props} />