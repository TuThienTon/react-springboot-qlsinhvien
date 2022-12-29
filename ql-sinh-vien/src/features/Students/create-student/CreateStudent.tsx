import { Button, Grid } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import SSPaper from "../../../components/common/other/SSPaper";
import { filterKhoa } from "../../../shared/api/khoa.api";
import * as Yup from "yup";
import moment from "moment";
import { msgErrorRequired } from "../../../shared/utils/error.util";
import { DATE_FORMAT } from "../../../shared/constants/date-time.constant";
import { dateTimeToDateStr } from "../../../shared/utils/data-time.util";
import { useAppDispatch } from "../../../app/hooks";
import { createStudentAsync } from "../redux/student.reducer";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { toast } from "react-toastify";
import { searchKhoaEntitiesAsync } from "../../khoa/redux/khoa.reducer";
const optionsPhai = [
    {
        value: true,
        key: "Nam",
    },
    {
        value: false,
        key: "Nữ",
    },
];
const name = '';

const CreateStudent = () => {
    const dispatch = useAppDispatch();
    const item = {
        label: "Chọn khoa",
        value: "",
    };
    const [dataKhoa, setDataKhoa] = useState([item]);
    useEffect(() => {
        filterKhoa({name})
            .then((res) => {
                return res.data.map((item: any) => ({ label: item.tenKh, value: item.id }));
            })
            .then((data) => {
                setDataKhoa([item, ...data]);
            });
    }, []);
    const initialValues = {
        id: "",
        hoSv: "",
        tenSv: "",
        ngaySinh: new Date(),
        noiSinh: "",
        phai: true,
        maKh: "",
    };
    const validationSchema = Yup.object({
        id: Yup.string().max(3, "Không được quá 3 kí tự").nullable().required(msgErrorRequired("Mã sinh viên")),
        hoSv: Yup.string().nullable().required(msgErrorRequired("Họ sinh viên")),
        tenSv: Yup.string().nullable().required(msgErrorRequired("Tên sinh viên")),
        ngaySinh: Yup.date().nullable().required(msgErrorRequired("Ngày sinh")),
        noiSinh: Yup.string().nullable().required(msgErrorRequired("Nơi sinh")),
        maKh: Yup.string().nullable().required(msgErrorRequired("Khoa")),
    });
    const handleSubmit = async (values: any, formik: any) => {
        const body = {
            ...values,
            ngaySinh: dateTimeToDateStr(values.ngaySinh),
        };
        console.log(body);
        const res = await dispatch(createStudentAsync(body));
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
    const handeChangePhai = (formik: any) => (e: any) => {
        const value = e.target.value;
        formik.setFieldValue("phai", value === "true" ? true : false);
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
                                        variant="input"
                                        type="text"
                                        label="Mã sinh viên"
                                        name="id"
                                        placeholder="Nhập mã sinh viên"
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="input"
                                        type="text"
                                        label="Họ sinh viên"
                                        name="hoSv"
                                        placeholder="Nhập họ sinh viên"
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="input"
                                        type="text"
                                        label="Tên sinh viên"
                                        name="tenSv"
                                        placeholder="Nhập tên sinh viên"
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="date"
                                        className="form-control"
                                        placeholderText={DATE_FORMAT}
                                        type="text"
                                        label="Ngày sinh"
                                        name="ngaySinh"
                                        placeholder="Nhập ngày sinh"
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="input"
                                        type="text"
                                        label="Nơi sinh"
                                        name="noiSinh"
                                        placeholder="Nhập nơi sinh"
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="select"
                                        type="text"
                                        label="Khoa"
                                        name="maKh"
                                        options={dataKhoa}
                                        isRequired
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextFieldContainer
                                        variant="radio"
                                        name="phai"
                                        options={optionsPhai}
                                        onChange={handeChangePhai(formik)}
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

export default CreateStudent;
