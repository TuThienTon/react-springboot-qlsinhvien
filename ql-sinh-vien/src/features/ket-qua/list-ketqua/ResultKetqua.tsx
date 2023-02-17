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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

    //Xử lý sự kiện dialog xác nhận xoá
    const [open, setOpen] = React.useState(false);
    const [dialogId, setDialogId] = React.useState(null);
    const handleClickOpen = (row: any) => {
        setDialogId(row.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        const id = dialogId;

        const res = await dispatch(deleteKetquaEntitiesAsync(id));

        if (isFulfilledAction(res)) {
            toast.success("Xóa thành công");
            dispatch(
                searchKetquaEntitiesAsync({
                    masv: "",
                    mamh: "",
                })
            );
        } else toast.error("Xóa không thành công");
        setOpen(false);
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
                                                        <TableCell>
                                                            {row.ma_sv.hoSv} {row.ma_sv.tenSv}
                                                        </TableCell>
                                                        <TableCell>{row.ma_mh.tenMh}</TableCell>
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
                                                                onClick={() => handleClickOpen(row)}
                                                            >
                                                                Delete
                                                            </Button>
                                                            <Dialog
                                                                open={open}
                                                                onClose={handleClose}
                                                                aria-labelledby="alert-dialog-title"
                                                                aria-describedby="alert-dialog-description"
                                                            >
                                                                <DialogTitle id="alert-dialog-title">
                                                                    {"Xác nhận xoá?"}
                                                                </DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText id="alert-dialog-description">
                                                                        Bạn có muốn xoá sinh viên có mã: <b>{dialogId}</b> không?
                                                                    </DialogContentText>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={handleClose}>No</Button>
                                                                    <Button onClick={handleDelete} autoFocus>
                                                                        Yes
                                                                    </Button>
                                                                </DialogActions>
                                                            </Dialog>
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
