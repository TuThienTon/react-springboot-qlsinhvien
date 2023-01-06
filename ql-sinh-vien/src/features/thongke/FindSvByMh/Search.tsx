import React from "react";
import SSPaper from "../../../components/common/other/SSPaper";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Button, Grid } from "@mui/material";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import { useAppDispatch } from "../../../app/hooks";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { findSvByMhEntitiesAsync } from "../redux/thongke.reducer";
import { filterMonhoc } from "../../../shared/api/monhoc.api";
const Search = () => {
    const dispatch = useAppDispatch();
    const initialValues = {
        searchKey: "",
        maMh: { value: "", label: "" },
    };
    const validationSchema = Yup.object().shape({});
    const submitSearch = (values: any, formik: any) => {
        dispatch(
            findSvByMhEntitiesAsync({
                ma_mh: values.searchKey,
            })
        );
    };
    const handleCancel = (formik: any) => (e: any) => {
        formik.resetForm();
        dispatch(
            findSvByMhEntitiesAsync({
                ma_mh: "",
            })
        );
    };
    const itemMh = {
        label: "Chọn Môn học",
        value: "",
    };
    const [monhoc, setMh] = useState({
        label: "",
        value: "",
    });
    const [dataMh, setDataMh] = useState([itemMh]);
    useEffect(() => {
        
        filterMonhoc({name})
            .then((res) => {
                return res.data.map((item: any) => ({ label: item.tenMh, value: item.id }));
            })

            .then((data) => {
                setDataMh([itemMh, ...data]);
            });
    }, []);
    return (
        <SSPaper>
            <Formik initialValues={initialValues} onSubmit={submitSearch} validationSchema={validationSchema}>
                {(formik) => (
                    <Form>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                            
                            <Grid item sm={12}>
                                <TextFieldContainer
                                    variant="select"
                                    type="text"
                                    label="Môn học"
                                    name="searchKey"
                                    values={monhoc}
                                    options={dataMh}
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

export default Search;
