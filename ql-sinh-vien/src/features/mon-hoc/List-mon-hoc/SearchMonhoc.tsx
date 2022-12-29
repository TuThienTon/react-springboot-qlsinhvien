import { Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import TextFieldContainer from '../../../components/common/form/TextFieldContainer';
import SSPaper from '../../../components/common/other/SSPaper';
import { searchMonhocEntitiesAsync } from '../redux/monhoc.reducer';

const SearchMonhoc = () => {
    const dispatch = useAppDispatch();
    const initialValues = {
        tenMh: ''
    }

    const submitSearch = (values: any, formik: any) => {
        dispatch(searchMonhocEntitiesAsync({name: values.tenMh}));
        console.log(values);

    }

    const handleCancel = (formik: any) => (e: any) => {
        formik.resetForm();
        dispatch(searchMonhocEntitiesAsync({name:''}));
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
                                        label="Tên môn học"
                                        name="tenMh"
                                        placeholder="Nhập tên môn học"
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

export default SearchMonhoc;