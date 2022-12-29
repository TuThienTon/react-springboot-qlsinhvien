import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SSPaper from "../../../components/common/other/SSPaper";
import { useNavigate } from "react-router-dom";
import { STUDENT_ROUTER } from "../../../shared/constants/router/student-router.constant";
import { useAppDispatch } from "../../../app/hooks";
import { deleteStudentEntitiesAsync, searchStudentEntitiesAsync } from "../redux/student.reducer";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
const ResultStudent = () => {
    const dispatch = useAppDispatch();

    const students = useSelector((state: any) => state.student.entities);

    const navigate = useNavigate();

    const handleUpdate = async (row: any) => {
        navigate(STUDENT_ROUTER.childrens.updateUser.buildPath(row.id));
        console.log(row, row.id);
    };

    const initialValues = {
        id: "",
    };

    const validationSchema = Yup.object().shape({});

    const handleDelete = async (row: any, formik: any) => {
        const id = row.id;
        console.log(id);

        const res = await dispatch(deleteStudentEntitiesAsync(id));

        if (isFulfilledAction(res)) {
            toast.success("Xóa thành công");
            dispatch(
                searchStudentEntitiesAsync({
                    name: "",
                })
            );
        } else toast.error("Xóa không thành công");
    };

    return (
        <div>
            {students == null ? null : (
                <Formik initialValues={initialValues} onSubmit={handleDelete} validationSchema={validationSchema}>
                    {(formik) => (
                        <SSPaper>
                            {students.length == 0 ? null : (
                                <div>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontSize: "1rem" }}>STT</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Mã sinh viên</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Họ và tên</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Nơi sinh</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Năm sinh</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Giới tính</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Khoa</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Thao tác</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {students.map((row: any, index: number) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row.id}</TableCell>
                                                        <TableCell>
                                                            {row.hoSv} {row.tenSv}
                                                        </TableCell>
                                                        <TableCell>{row.noiSinh}</TableCell>
                                                        <TableCell>{row.ngaySinh}</TableCell>
                                                        <TableCell>{row.phai == true ? "Nam" : "Nữ"}</TableCell>
                                                        <TableCell>{row.khoa.tenKh}</TableCell>
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

export default ResultStudent;
