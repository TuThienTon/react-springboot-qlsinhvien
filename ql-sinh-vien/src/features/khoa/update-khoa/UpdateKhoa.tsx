import { Button, Grid } from "@mui/material";
import { log } from "console";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "../../../app/hooks";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import SSPaper from "../../../components/common/other/SSPaper";
import { getByIdKhoa } from "../../../shared/api/khoa.api";
import { KHOA_ROUTER } from "../../../shared/constants/router/khoa-router.constant";
import { msgErrorRequired } from "../../../shared/utils/error.util";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { updateKhoaAsync } from "../redux/khoa.reducer";

const UpdateKhoa = () => {
    const params = useParams();

    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        id: "",
        tenKh: "",
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        getByIdKhoa(params.id).then((res) => {
            setInitialValues({
                id: res.data.id,
                tenKh: res.data.tenKh,
            });
        });
    }, []);

    const validationSchema = Yup.object({
        id: Yup.string().max(2, "Không được quá 2 kí tự").nullable().required(msgErrorRequired("Mã khoa")),
        tenKh: Yup.string().nullable().required(msgErrorRequired("Tên khoa")),
    });

    const handleSubmit = async (values: any, formik: any) => {
        // console.log(values);

        const body = {
            ...values,
        };
        // console.log(body);

        const res = await dispatch(updateKhoaAsync(body));
        if (isFulfilledAction(res)) {
            toast.success("Cập nhật thành công");
            formik.resetForm();
            navigate(KHOA_ROUTER.childrens.listKhoa.path);
        } else toast.error("Cập nhật không thành công");
    };

    const handleBack = () => {
        navigate(KHOA_ROUTER.childrens.listKhoa.path);
    };
    return (
        <div>
            {initialValues.id != "" ? (
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {(formik) => (
                        <Form>
                            <SSPaper>
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                                    <Grid item sm={4}>
                                        <TextFieldContainer
                                            variant="input"
                                            type="text"
                                            label="Mã khoa"
                                            name="id"
                                            placeholder="Nhập mã khoa"
                                            isRequired
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextFieldContainer
                                            variant="input"
                                            type="text"
                                            label="Tên khoa"
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
                                            onClick={handleBack}
                                        >
                                            Quay lại
                                        </Button>
                                    </Grid>
                                </Grid>
                            </SSPaper>
                        </Form>
                    )}
                </Formik>
            ) : null}
        </div>
    );
};

export default UpdateKhoa;
