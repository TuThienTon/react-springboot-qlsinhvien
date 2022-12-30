import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { searchStudentEntitiesAsync } from '../redux/student.reducer';
import ResultStudent from './ResultStudent';
import SearchStudent from './SearchStudent';

const ListStudent = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchStudentEntitiesAsync({
            name: ''
        }));
    }, [])
    return (
        <div>
            <SearchStudent />
            <ResultStudent />
        </div>
    );
};

export default ListStudent;