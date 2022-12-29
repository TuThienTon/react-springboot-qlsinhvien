import { Button, Grid } from "@mui/material";
import { log } from "console";
import { parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "../../../app/hooks";
import TextFieldContainer from "../../../components/common/form/TextFieldContainer";
import SSPaper from "../../../components/common/other/SSPaper";
import { getByIdKetqua } from "../../../shared/api/ketqua.api";
import { filterMonhoc } from "../../../shared/api/monhoc.api";
import { filterStudent } from "../../../shared/api/student.api";
import { KETQUA_ROUTER } from "../../../shared/constants/router/ketqua-router.constant";
import { msgErrorRequired } from "../../../shared/utils/error.util";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { updateKetquaAsync } from "../redux/ketqua.reducer";


const UpdateKetqua = () => {

    const params = useParams();
    const name = ''; 

    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        id: "",
        maSv: { value: "", label: "" },
        maMh: { value: "", label: "" },
        diem: "",
    });

    // console.log('test1');
    // console.log(initialValues);

    const dispatch = useAppDispatch();

    const itemSv = {
        label: "Chọn sinh viên",
        value: "",
    };
    const itemMh = {
        label: "Chọn Môn học",
        value: "",
    };
    const [dataSv, setDataSv] = useState([itemSv]);
    const [dataMh, setDataMh] = useState([itemMh]);

    const [sinhvien, setSv] = useState({
        label: "",
        value: "",
    });
    const [monhoc, setMh] = useState({
        label: "",
        value: "",
    });

    useEffect(() => {
        filterStudent({name})
            .then((res) => {
                return res.data.map((item: any) => ({ label: item.tenSv, value: item.id }));
            })

            .then((data) => {
                setDataSv([itemSv, ...data]);
            });
        filterMonhoc({name})
            .then((res) => {
                return res.data.map((item: any) => ({ label: item.tenMh, value: item.id }));
            })

            .then((data) => {
                setDataMh([itemMh, ...data]);
            });

        getByIdKetqua(params.id).then((res) => {

            setInitialValues({
                id: res.data.id,
                diem: res.data.diem,
                maSv: res.data.ma_sv.id,
                maMh: res.data.ma_mh.id,
            });

            setSv({
                value: res.data.ma_sv.id,
                label: res.data.ma_sv.hoSv + ' '+ res.data.ma_sv.tenSv,
            });
            setMh({
                value: res.data.ma_mh.id,
                label: res.data.ma_mh.tenMh,
            });

        });
    }, []);

    const validationSchema = Yup.object({
        maSv: Yup.string().nullable().required(msgErrorRequired("Sinh viên")),
        maMh: Yup.string().nullable().required(msgErrorRequired("Môn học")),
        diem: Yup.number().nullable().required(msgErrorRequired("Điểm")),
    });

    const handleSubmit = async (values: any, formik: any) => {
        // console.log(values);

        
        // console.log(body);

        const res = await dispatch(updateKetquaAsync(values));
        if (isFulfilledAction(res)) {
            toast.success("Cập nhật thành công");
            // formik.resetForm();
            navigate(KETQUA_ROUTER.childrens.listKetqua.path);
        } else toast.error("Cập nhật không thành công");
    };
    
    const handleBack = () => {
        navigate(KETQUA_ROUTER.childrens.listKetqua.path);
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
                                            variant="select"
                                            type="text"
                                            label="Sinh viên"
                                            name="maSv"
                                            values={sinhvien}
                                            options={dataSv}
                                            isRequired
                                        />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextFieldContainer
                                            variant="select"
                                            type="text"
                                            label="Môn học"
                                            name="maMh"
                                            values={monhoc}
                                            options={dataMh}
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
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            sx={{ width: "165px" }}
                                        >
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

export default UpdateKetqua;
