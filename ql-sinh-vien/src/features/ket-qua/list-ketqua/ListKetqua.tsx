import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { searchKetquaEntitiesAsync } from '../redux/ketqua.reducer';
import ResultKetqua from './ResultKetqua';
import SearchKetqua from './SearchKetqua';

const ListKetqua = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchKetquaEntitiesAsync({
            masv: '',
            mamh: ''
        }));
    }, [])
    return (
        <div>
            <SearchKetqua />
            <ResultKetqua />
            
        </div>
    );
};

export default ListKetqua;