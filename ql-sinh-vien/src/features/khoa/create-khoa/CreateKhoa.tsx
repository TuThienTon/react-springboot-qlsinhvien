import { Button, Grid } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import SSPaper from "../../../components/common/other/SSPaper";
import { filterKhoa } from "../../../shared/api/khoa.api";
import * as Yup from "yup";
import { msgErrorRequired } from "../../../shared/utils/error.util";
import { useAppDispatch } from "../../../app/hooks";
import { createKhoaAsync } from "../redux/khoa.reducer";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { toast } from "react-toastify";

const CreateKhoa = () => {
    const dispatch = useAppDispatch();
    const item = {
        label: "Chọn khoa",
        value: "",
    };
    // const [dataKhoa, setDataKhoa] = useState([item]);
    // useEffect(() => {
    //     filterKhoa("").then((res) => {
    //         return res.data.map((item: any) => ({ label: item.tenKh, value: item.id }));
    //     });
    // }, []);
    const initialValues = {
        id: "",
        tenKh: "",
    };
    const validationSchema = Yup.object({
        id: Yup.string().max(2, "Không được quá 3 kí tự").nullable().required(msgErrorRequired("Mã khoa")),
        tenKh: Yup.string().nullable().required(msgErrorRequired("Tên khoa")),
    });
    const handleSubmit = async (values: any, formik: any) => {
        const body = {
            ...values,
        };
        console.log(body);
        const res = await dispatch(createKhoaAsync(body));
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
                                        label="Mã khoa"
                                        name="id"
                                        placeholder="Nhập mã khoa"
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={5}>
                                    <TextFieldContainer
                                        variant="input"
                                        type="text"
                                        label="Khoa"
                                        name="tenKh"
                                        placeholder="Nhập tên khoa"
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

export default CreateKhoa;
