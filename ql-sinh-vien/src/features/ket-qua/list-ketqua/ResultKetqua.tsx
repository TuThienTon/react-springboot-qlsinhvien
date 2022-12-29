import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SSPaper from "../../../components/common/other/SSPaper";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { KETQUA_ROUTER } from "../../../shared/constants/router/ketqua-router.constant";
import { deleteKetquaEntitiesAsync, searchKetquaEntitiesAsync } from "../redux/ketqua.reducer";
const ResultKetqua = () => {
    const dispatch = useAppDispatch();

    const ketqua = useSelector((state: any) => state.ketqua.entities);

    const navigate = useNavigate();

    const handleUpdate = async (row: any) => {
        navigate(KETQUA_ROUTER.childrens.updateKetqua.buildPath(row.id));
        console.log(row, row.id);
    };

    const initialValues = {
        id: "",
    };

    const validationSchema = Yup.object().shape({});

    const handleDelete = async (row: any, formik: any) => {
        const id = row.id;
        console.log(id);

        const res = await dispatch(deleteKetquaEntitiesAsync(id));

        if (isFulfilledAction(res)) {
            toast.success("Xóa thành công");
            dispatch(
                searchKetquaEntitiesAsync({
                    name: "",
                })
            );
        } else toast.error("Xóa không thành công");
    };

    return (
        <div>
            {ketqua == null ? null : (
                <Formik initialValues={initialValues} onSubmit={handleDelete} validationSchema={validationSchema}>
                    {(formik) => (
                        <SSPaper>
                            {ketqua.length == 0 ? null : (
                                <div>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontSize: "1rem" }}>STT</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Mã sinh viên</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Mã môn học</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Điểm</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Thao tác</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {ketqua.map((row: any, index: number) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row.ma_sv.id}</TableCell>
                                                        <TableCell>{row.ma_mh.id}</TableCell>
                                                        <TableCell>{row.diem}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={() => {
                                                                    handleUpdate(row);
                                                                }}
                                                            >
                                                                Cập nhật
                                                            </Button>
                                                            &nbsp;
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={() => {
                                                                    handleDelete(row, formik);
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            )}
                        </SSPaper>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default ResultKetqua;
