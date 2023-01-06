import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../app/hooks';
import { findSvByMhEntitiesAsync } from '../redux/thongke.reducer';
import Result from './Result';
import Search from './Search';

const ListSvByMh = () => {
  const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(findSvByMhEntitiesAsync({
            ma_mh: ''
        }));
    }, [])
  return (
    <div>ListSvByMh
      <Search/>
      <Result/>
    </div>
  )
}

export default ListSvByMh;