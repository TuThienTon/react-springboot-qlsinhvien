import React from 'react';
import SSPaper from '../../../components/common/other/SSPaper';
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Button, Grid } from '@mui/material';
import TextFieldContainer from '../../../components/common/form/TextFieldContainer';
import { useAppDispatch } from '../../../app/hooks';

import * as Yup from 'yup';
import { searchSvxsEntitiesAsync } from '../redux/thongke.reducer';
const SearchTK = () => {
    const dispatch = useAppDispatch();
    const initialValues = {
        keySearch: ''
    }
    const validationSchema = Yup.object().shape({

    })
    const submitSearch = (values: any, formik: any) => {
        dispatch(searchSvxsEntitiesAsync({
            name: values.keySearch
        }));
    }
    const handleCancel = (formik: any) => (e: any) => {
        formik.resetForm();
        dispatch(searchSvxsEntitiesAsync({
            name: ''
        }))
    };
    return (
        <SSPaper>
            <Formik initialValues={initialValues} onSubmit={submitSearch} validationSchema={validationSchema}>
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
                                        label="Tên sinh viên"
                                        name="keySearch"
                                        placeholder="Nhập tên sinh viên"
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

export default SearchTK;