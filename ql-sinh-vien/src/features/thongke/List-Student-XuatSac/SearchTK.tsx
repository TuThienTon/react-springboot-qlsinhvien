import React from 'react';
import SSPaper from '../../../components/common/other/SSPaper';
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Button, Grid } from '@mui/material';
import TextFieldContainer from '../../../components/common/form/TextFieldContainer';
import { useAppDispatch } from '../../../app/hooks';
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { searchSvxsEntitiesAsync } from '../redux/thongke.reducer';
import { filterKhoa } from '../../../shared/api/khoa.api';
const SearchTK = () => {
    const dispatch = useAppDispatch();
    const initialValues = {
        searchKey: ''
    }
    const validationSchema = Yup.object().shape({

    })
    const submitSearch = (values: any, formik: any) => {
        dispatch(searchSvxsEntitiesAsync({
            makh: values.searchKey
        }));
    }
    const handleCancel = (formik: any) => (e: any) => {
        formik.resetForm();
        dispatch(searchSvxsEntitiesAsync({
            makh: ''
        }))
    };
    const itemKhoa = {
        label: "Chọn Khoa",
        value: "",
    };
    const [khoa, setKhoa] = useState({
        label: "",
        value: "",
    });
    const [dataKhoa, setDataKhoa] = useState([itemKhoa]);
    useEffect(() => {
        
        filterKhoa({name})
            .then((res) => {
                return res.data.map((item: any) => ({ label: item.tenKh, value: item.id }));
            })

            .then((data) => {
                setDataKhoa([itemKhoa, ...data]);
            });
    }, []);
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
                                    variant="select"
                                    type="text"
                                    label="Khoa"
                                    name="searchKey"
                                    values={khoa}
                                    options={dataKhoa}
                                    isRequired
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