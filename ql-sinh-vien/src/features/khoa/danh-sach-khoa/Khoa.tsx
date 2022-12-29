import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { searchKhoaEntitiesAsync } from '../redux/khoa.reducer';
import ResultKhoa from './ResultKhoa';
import SearchKhoa from './SearchKhoa';

const Khoa = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchKhoaEntitiesAsync({
            name: ''
        }))
    }, [])
    return (
        <>
            <SearchKhoa />
            <ResultKhoa />
        </>
    );
};

export default Khoa;