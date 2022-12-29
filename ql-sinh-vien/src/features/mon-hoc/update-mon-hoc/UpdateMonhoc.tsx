import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "../../../app/hooks";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import SSPaper from "../../../components/common/other/SSPaper";
import { getByIdMonhoc } from "../../../shared/api/monhoc.api";
import { MONHOC_ROUTER } from "../../../shared/constants/router/monhoc-router.constant";
import { msgErrorRequired } from "../../../shared/utils/error.util";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { updateMonhocAsync } from "../redux/monhoc.reducer";

const UpdateMonhoc = () => {
    const params = useParams();

    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        id: "",
        tenMh: "",
        soTiet: "",
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        getByIdMonhoc(params.id).then((res) => {
            setInitialValues({
                id: res.data.id,
                tenMh: res.data.tenMh,
                soTiet: res.data.soTiet
            });
        });
    }, []);

    const validationSchema = Yup.object({
        tenMh: Yup.string().nullable().required(msgErrorRequired("Tên khoa")),
        soTiet: Yup.string().nullable().required(msgErrorRequired("Số tiết"))
    });

    const handleSubmit = async (values: any, formik: any) => {

        const res = await dispatch(updateMonhocAsync(values));
        if (isFulfilledAction(res)) {
            toast.success("Cập nhật thành công");
            formik.resetForm();
            navigate(MONHOC_ROUTER.childrens.listMonhoc.path);
        } else toast.error("Cập nhật không thành công");
    };

    const handleBack = () => {
        navigate(MONHOC_ROUTER.childrens.listMonhoc.path);
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
                                            label="Tên môn"
                                            name="tenMh"
                                            placeholder="Nhập tên khoa"
                                            isRequired
                                        />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextFieldContainer
                                            variant="input"
                                            type="text"
                                            label="Số tiết"
                                            name="soTiet"
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

export default UpdateMonhoc;
