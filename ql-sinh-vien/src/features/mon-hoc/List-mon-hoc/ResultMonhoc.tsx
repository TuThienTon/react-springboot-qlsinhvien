import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SSPaper from "../../../components/common/other/SSPaper";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useAppDispatch } from "../../../app/hooks";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { toast } from "react-toastify";
import { deleteMonhocEntitiesAsync, searchMonhocEntitiesAsync } from "../redux/monhoc.reducer";
import * as Yup from "yup";
import { MONHOC_ROUTER } from "../../../shared/constants/router/monhoc-router.constant";

const ResultMonhoc = () => {
    const dispatch = useAppDispatch();

    const monhoc = useSelector((state: any) => state.monhoc?.entities);


    const initialValues = {
        id: "",
    };

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({});

    const handleUpdate = async (row: any) => {
        navigate(MONHOC_ROUTER.childrens.updateMonhoc.buildPath(row.id));
        console.log(row, row.id);
    };

    const handleDelete = async (row: any, formik: any) => {
        const id = row.id;

        const res = await dispatch(deleteMonhocEntitiesAsync(id));

        if (isFulfilledAction(res)) {
            dispatch(searchMonhocEntitiesAsync({ name: "" }));

            toast.success("Xóa thành công");
        } else toast.error("Xóa không thành công");
    };

    return (
        <div>
            {monhoc == null ? null : (
                <Formik initialValues={initialValues} onSubmit={handleDelete} validationSchema={validationSchema}>
                    {(formik) => (
                        <SSPaper>
                            {monhoc.length == 0 ? null : (
                                <div>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontSize: "1rem" }}>STT</TableCell>
                                                    {/* <TableCell sx={{ fontSize: "1rem" }}>Mã Môn học</TableCell> */}
                                                    <TableCell sx={{ textAlign: "center", fontSize: "1rem" }}>Môn học</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Số tiết</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Thao tác</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {monhoc.map((row: any, index: number) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell>{index + 1}</TableCell>
                                                        {/* <TableCell>{row.id}</TableCell> */}
                                                        <TableCell sx={{ textAlign: "center"}}>{row.tenMh}</TableCell>
                                                        <TableCell>{row.soTiet}</TableCell>
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

export default ResultMonhoc;
