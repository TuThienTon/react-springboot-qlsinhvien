import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SSPaper from "../../../components/common/other/SSPaper";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { Formik } from "formik";
import * as Yup from "yup";
const Result = () => {
    const dispatch = useAppDispatch();

    const thongke = useSelector((state: any) => state.thongke.entities);

    const navigate = useNavigate();

    const initialValues = {
        id: "",
    };

    const validationSchema = Yup.object().shape({});

    const handleView = async (row: any, formik: any) => {};

    return (
        <div>
            {thongke == null ? null : (
                <Formik initialValues={initialValues} onSubmit={handleView} validationSchema={validationSchema}>
                    {(formik) => (
                        <SSPaper>
                            {thongke.length == 0 ? null : (
                                <div>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontSize: "1rem" }}>STT</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Mã sinh viên</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Họ và tên</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Tên Môn</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Điểm</TableCell>
                                                    {/* <TableCell sx={{ fontSize: "1rem" }}>Thao tác</TableCell> */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {thongke.map((row: any, index: number) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row.maSv}</TableCell>
                                                        <TableCell>{row.hoTen}</TableCell>
                                                        <TableCell>{row.tenMh}</TableCell>
                                                        <TableCell>{row.diem}</TableCell>

                                                        {/* <TableCell>
                                                            &nbsp;
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={() => {
                                                                    handleView(row, formik);
                                                                }}
                                                            >
                                                                Chi Tiết
                                                            </Button>
                                                        </TableCell> */}
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

export default Result;
