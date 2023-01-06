import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../app/hooks';
import { searchSvxsEntitiesAsync } from '../redux/thongke.reducer';
import ResultSVXS from './ResultSVXS'
import SearchTK from './SearchTK';

const ListSvXuatSac = () => {
  const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchSvxsEntitiesAsync({
            name: ''
        }));
    }, [])
  return (
    <div>ListSvXuatSac
      <SearchTK/>
      <ResultSVXS />
    </div>
  )
}

export default ListSvXuatSac