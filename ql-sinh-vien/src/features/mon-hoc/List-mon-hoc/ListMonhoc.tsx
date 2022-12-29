import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { searchMonhocEntitiesAsync } from '../redux/monhoc.reducer';
import ResultMonhoc from './ResultMonhoc';
import SearchMonhoc from './SearchMonhoc';

const ListMonhoc = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchMonhocEntitiesAsync({
            name: ''
        }))
    }, [])
    return (
        <div>
            <SearchMonhoc />
            <ResultMonhoc />
        </div>
    );
};

export default ListMonhoc;