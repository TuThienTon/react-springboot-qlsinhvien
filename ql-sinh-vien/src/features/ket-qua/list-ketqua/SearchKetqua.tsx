import React from 'react';
import SSPaper from '../../../components/common/other/SSPaper';
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Button, Grid } from '@mui/material';
import TextFieldContainer from '../../../components/common/form/TextFieldContainer';
import { useAppDispatch } from '../../../app/hooks';
import * as Yup from 'yup';
import { searchKetquaEntitiesAsync } from '../redux/ketqua.reducer';
const SearchKetqua = () => {
    const dispatch = useAppDispatch();
    const initialValues = {
        keyName: ''
    }
    const validationSchema = Yup.object().shape({
        // fullName: Yup.string().required("Không được để trống")
    })
    const submitSearch = (values: any, formik: any) => {
        dispatch(searchKetquaEntitiesAsync({
            name: values.keyName
        }));
    }
    const handleCancel = (formik: any) => (e: any) => {
        formik.resetForm();
        dispatch(searchKetquaEntitiesAsync({
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
                                        label="Search"
                                        name="keyName"
                                        placeholder="Search"
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

export default SearchKetqua;