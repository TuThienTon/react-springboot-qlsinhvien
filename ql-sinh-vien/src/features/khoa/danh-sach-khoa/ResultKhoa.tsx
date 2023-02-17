import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SSPaper from "../../../components/common/other/SSPaper";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useAppDispatch } from "../../../app/hooks";
import { isFulfilledAction } from "../../../shared/utils/reducer.utils";
import { toast } from "react-toastify";
import { deleteKhoaEntitiesAsync, searchKhoaEntitiesAsync } from "../redux/khoa.reducer";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { KHOA_ROUTER } from "../../../shared/constants/router/khoa-router.constant";

const ResultKhoa = () => {
    const dispatch = useAppDispatch();

    const khoa = useSelector((state: any) => state.khoa.entities);
    // console.log(khoa);
    const initialValues = {
        id: "",
    };

    const navigate = useNavigate();

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

    const handleUpdate = async (row: any) => {
        navigate(KHOA_ROUTER.childrens.updateKhoa.buildPath(row.id));
        console.log(row, row.id);
    };

    const handleDelete = async () => {
        const id = dialogId;
        // console.log(id);

        const res = await dispatch(deleteKhoaEntitiesAsync(id));

        if (isFulfilledAction(res)) {
            dispatch(searchKhoaEntitiesAsync({name:""}));

            toast.success("Xóa thành công");
        } else toast.error("Xóa không thành công");
        setOpen(false);
    };

    return (
        <div>
            {khoa == null ? null : (
                <Formik initialValues={initialValues} onSubmit={handleDelete} validationSchema={validationSchema}>
                    {(formik) => (
                        <SSPaper>
                            {khoa.length == 0 ? null : (
                                <div>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontSize: "1rem" }}>STT</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Mã Khoa</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Tên khoa</TableCell>
                                                    <TableCell sx={{ fontSize: "1rem" }}>Thao tác</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {khoa.map((row: any, index: number) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row.id}</TableCell>
                                                        <TableCell>{row.tenKh}</TableCell>
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

export default ResultKhoa;
