import { Button, Grid } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import SSPaper from "../../../components/common/other/SSPaper";
import * as Yup from "yup";
import { msgErrorRequired } from "../../../shared/utils/error.util";
import { useAppDispatch } from "../../../app/hooks";
import { createKetquaAsync } from "../redux/ketqua.reducer";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { toast } from "react-toastify";
import { filterMonhoc } from "../../../shared/api/monhoc.api";
import { filterStudent } from "../../../shared/api/student.api";

const CreateKetqua = () => {
    const dispatch = useAppDispatch();
    const itemSv = {
        label: "Chọn Sinh viên",
        value: "",
    };
    const itemMh = {
        label: "Chọn môn học",
        value: "",
    };
    const name= '';
    const [dataSinhvien, setDataSinhvien] = useState([itemSv]);
    const [dataMonhoc, setDataMonhoc] = useState([itemMh]);
    useEffect(() => {
        filterStudent({name})
            .then((res) => {
                return res.data.map((itemSv: any) => ({ label: itemSv.hoSv + " " + itemSv.tenSv, value: itemSv.id }));
            })
            .then((data) => {
                setDataSinhvien([itemSv, ...data]);
            });
        filterMonhoc({name})
            .then((res) => {
                return res.data.map((itemMh: any) => ({ label: itemMh.tenMh, value: itemMh.id }));
            })
            .then((data) => {
                setDataMonhoc([itemMh, ...data]);
            });
    }, []);
    const initialValues = {
        id: "",
        maSv: "",
        maMh: "",
        diem: "",
    };
    const validationSchema = Yup.object({
        // maSv: Yup.string().nullable().required(msgErrorRequired("Mã sinh viên")),
        // maMh: Yup.string().nullable().required(msgErrorRequired("Mã môn học")),
        // diem: Yup.number().nullable().required(msgErrorRequired("Điểm")),
        
    });
    const handleSubmit = async (values: any, formik: any) => {
        const res = await dispatch(createKetquaAsync(values));
        console.log(values);
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
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {(formik) => (
                    <Form>
                        <SSPaper>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="select"
                                        type="text"
                                        label="Sinh viên"
                                        name="maSv"
                                        options={dataSinhvien}
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="select"
                                        type="text"
                                        label="Môn học"
                                        name="maMh"
                                        options={dataMonhoc}
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="input"
                                        type="number"
                                        label="Điểm"
                                        name="diem"
                                        placeholder="Nhập điểm"
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
                                        nhập lại
                                    </Button>
                                </Grid>
                            </Grid>
                        </SSPaper>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateKetqua;
