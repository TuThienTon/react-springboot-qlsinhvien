import { Button, Grid } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import SSPaper from "../../../components/common/other/SSPaper";
import { filterKhoa } from "../../../shared/api/khoa.api";
import * as Yup from "yup";
import { msgErrorRequired } from "../../../shared/utils/error.util";
import { useAppDispatch } from "../../../app/hooks";
import { createMonhocAsync } from "../redux/monhoc.reducer";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { toast } from "react-toastify";

const CreateMonhoc = () => {
    const dispatch = useAppDispatch();
    
    const initialValues = {
        id: "",
        tenMh: "",
        soTiet: "",
    };
    const validationSchema = Yup.object({
        // id: Yup.string().max(2, "Không được quá 3 kí tự").nullable().required(msgErrorRequired("Mã khoa")),
        tenMh: Yup.string().nullable().required(msgErrorRequired("Tên khoa")),
        soTiet: Yup.number().nullable().required(msgErrorRequired("Số tiết")),
    });
    const handleSubmit = async (values: any, formik: any) => {
        const body = {
            ...values,
        };
        console.log(body);
        const res = await dispatch(createMonhocAsync(body));
        if (isFulfilledAction(res)) {
            toast.success("Thêm mới thành công", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            formik.resetForm();
        } else
            toast.error("Thêm mới không thành công", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
    };

    const handleReset = (formik: any) => (e: any) => {
        formik.resetForm();
    };
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {(formik) => (
                    <Form>
                        <SSPaper>
                            <Grid container justifyContent={"center"} rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                                <Grid item sm={5}>
                                    <TextFieldContainer
                                        variant="input"
                                        type="text"
                                        label="Tên môn học"
                                        name="tenMh"
                                        placeholder="Nhập tên môn học"
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={5}>
                                    <TextFieldContainer
                                        variant="input"
                                        type="number"
                                        label="Số tiết"
                                        name="soTiet"
                                        placeholder="Nhập số tiết"
                                        isRequired
                                    />
                                </Grid>
                            </Grid>
                        </SSPaper>
                        <SSPaper>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                                <Grid item sm={6} style={{ textAlign: "right" }}>
                                    <Button variant="contained" color="primary" type="submit" sx={{ width: "165px" }}>
                                        Lưu
                                    </Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        type="button"
                                        sx={{ width: "165px" }}
                                        onClick={handleReset(formik)}
                                    >
                                        Nhập lại
                                    </Button>
                                </Grid>
                            </Grid>
                        </SSPaper>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateMonhoc;
