import React from "react";
import SSPaper from "../../../components/common/other/SSPaper";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Button, Grid } from "@mui/material";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import { useAppDispatch } from "../../../app/hooks";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { searchKetquaEntitiesAsync } from "../redux/ketqua.reducer";
import { filterMonhoc } from "../../../shared/api/monhoc.api";
import { filterStudent } from "../../../shared/api/student.api";
const SearchKetqua = () => {
    const dispatch = useAppDispatch();
    const initialValues = {
        svKey: "",
        mhKey: "",
    };
    const validationSchema = Yup.object().shape({});
    const submitSearch = (values: any, formik: any) => {
        dispatch(
            searchKetquaEntitiesAsync({
                masv: values.svKey,
                mamh: values.mhKey,
            })
        );
    };
    const handleCancel = (formik: any) => (e: any) => {
        formik.resetForm();
        dispatch(
            searchKetquaEntitiesAsync({
                masv: "",
                mamh: "",
            })
        );
    };
    const itemMh = {
        label: "Chọn Môn học",
        value: "",
    };
    const itemSv = {
        label: "Chọn Sinh viên",
        value: "",
    };
    const [monhoc, setMh] = useState({
        label: "",
        value: "",
    });
    const [sinhvien, setSv] = useState({
        label: "",
        value: "",
    });
    const [dataMh, setDataMh] = useState([itemMh]);
    const [dataSv, setDataSv] = useState([itemSv]);
    useEffect(() => {
        filterMonhoc({ name })
            .then((res) => {
                return res.data.map((item: any) => ({ label: item.tenMh, value: item.id }));
            })

            .then((data) => {
                setDataMh([itemMh, ...data]);
            });
        filterStudent({ name })
            .then((res) => {
                return res.data.map((item: any) => ({ label: item.hoSv +' '+ item.tenSv, value: item.id }));
            })

            .then((data) => {
                setDataSv([itemSv, ...data]);
            });
    }, []);
    return (
        <SSPaper>
            <Formik initialValues={initialValues} onSubmit={submitSearch} validationSchema={validationSchema}>
                {(formik) => (
                    <Form>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                            <Grid item sm={6}>
                                <TextFieldContainer
                                    variant="select"
                                    type="text"
                                    label="Môn học"
                                    name="mhKey"
                                    values={monhoc}
                                    options={dataMh}
                                    isRequired
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextFieldContainer
                                    variant="select"
                                    type="text"
                                    label="Sinh viên"
                                    name="svKey"
                                    values={sinhvien}
                                    options={dataSv}
                                    isRequired
                                />
                            </Grid>
                            <Grid item sm={6} style={{ textAlign: "right" }}>
                                <Button variant="contained" color="primary" type="submit" sx={{ width: "165px" }}>
                                    Tìm kiếm
                                </Button>
                            </Grid>
                            <Grid item sm={6}>
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
                )}
            </Formik>
        </SSPaper>
    );
};

export default SearchKetqua;
