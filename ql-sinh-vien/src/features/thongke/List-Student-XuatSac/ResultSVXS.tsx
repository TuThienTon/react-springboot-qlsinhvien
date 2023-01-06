import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SSPaper from "../../../components/common/other/SSPaper";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { Formik } from "formik";
import * as Yup from "yup";
const ResultSVXS = () => {
    const dispatch = useAppDispatch();

    const students = useSelector((state: any) => state.thongke.entities);

    const navigate = useNavigate();

    const initialValues = {
        id: "",
    };

    const validationSchema = Yup.object().shape({});

    const handleDelete = async (row: any, formik: any) => {};

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
                                                    <TableCell sx={{ fontSize: "1rem" }}>Năm sinh</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Số môn học</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Điểm TB</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {students.map((row: any, index: number) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row.maSv}</TableCell>
                                                        <TableCell>
                                                            {row.hoSv} {row.tenSv}
                                                        </TableCell>
                                                        <TableCell>{row.ngaySinh}</TableCell>
                                                        <TableCell>{row.soMon}</TableCell>
                                                        <TableCell>{row.diemTB}</TableCell>
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

export default ResultSVXS;
