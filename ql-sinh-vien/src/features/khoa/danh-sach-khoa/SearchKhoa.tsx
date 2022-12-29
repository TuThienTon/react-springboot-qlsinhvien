import { Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import TextFieldContainer from '../../../components/common/form/TextFieldContainer';
import SSPaper from '../../../components/common/other/SSPaper';
import { searchKhoaEntitiesAsync } from '../redux/khoa.reducer';

const SearchKhoa = () => {
    const dispatch = useAppDispatch();
    const initialValues = {
        tenKhoa: ''
    }

    const submitSearch = (values: any, formik: any) => {
        dispatch(searchKhoaEntitiesAsync({name: values.tenKhoa}));
        // console.log(values.tenKhoa);
    }

    const handleCancel = (formik: any) => (e: any) => {
        formik.resetForm();
        dispatch(searchKhoaEntitiesAsync({name:''}));
    }

    return (
        <SSPaper>
            <Formik initialValues={initialValues} onSubmit={submitSearch}>
                {
                    (formik) => (
                        <Form>
                            <Grid container
                                rowSpacing={2}
                                columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                                <Grid item sm={12}>
                                    <TextFieldContainer
                                        variant="input"
                                        type="text"
                                        label="Tên khoa"
                                        name="tenKhoa"
                                        placeholder="Nhập tên khoa"
                                    />
                                </Grid>
                                <Grid item sm={6} style={{ textAlign: "right" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        sx={{ width: "165px" }}
                                    >
                                        Tìm kiếm
                                    </Button>
                                </Grid>
                                <Grid item sm={6} >
                                    <Button
                                        variant="contained"
                                        color="info"
                                        type="button"
                                        sx={{ width: "165px" }}
                                        onClick={handleCancel(formik)}
                                    >
                                        Hủy
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
            </Formik>
        </SSPaper>
    );
};

export default SearchKhoa;