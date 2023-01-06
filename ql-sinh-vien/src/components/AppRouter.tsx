import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CreateKetqua from "../features/ket-qua/create-ketqua/CreateKetqua";
import ListKetqua from "../features/ket-qua/list-ketqua/ListKetqua";
import UpdateKetqua from "../features/ket-qua/update-ketqua/UpdateKetqua";
import CreateKhoa from "../features/khoa/create-khoa/CreateKhoa";
import Khoa from "../features/khoa/danh-sach-khoa/Khoa";
import UpdateKhoa from "../features/khoa/update-khoa/UpdateKhoa";
import CreateMonhoc from "../features/mon-hoc/Create-mon-hoc/CreateMonhoc";
import ListMonhoc from "../features/mon-hoc/List-mon-hoc/ListMonhoc";
import UpdateMonhoc from "../features/mon-hoc/update-mon-hoc/UpdateMonhoc";
import CreateStudent from "../features/Students/create-student/CreateStudent";
import ListStudent from "../features/Students/List-Student/ListStudent";
import ListSvXuatSac from "../features/thongke/List-Student-XuatSac/ListSvXuatSac";
import UpdateStudent from "../features/Students/update-student/UpdateStudent";
import Layout from "../layout/Layout";
import { APP_ROUTER_CONST } from "../shared/constants/router/app-router.constant";
import { KETQUA_ROUTER } from "../shared/constants/router/ketqua-router.constant";
import { KHOA_ROUTER } from "../shared/constants/router/khoa-router.constant";
import { MONHOC_ROUTER } from "../shared/constants/router/monhoc-router.constant";
import { STUDENT_ROUTER } from "../shared/constants/router/student-router.constant";
import { THONGKE_ROUTER } from "../shared/constants/router/thongke-router.constant";
import ListSvByMh from "../features/thongke/FindSvByMh/ListSvByMh";
function AppRouter() {
    // const navigate = useNavigate();
    return (
        <div>
            <Routes>
                <Route path={APP_ROUTER_CONST.layout.path} element={<Layout />}>
                    <Route path="/" element={<Navigate to="/students/list" replace={true} />}></Route>

                    <Route path={STUDENT_ROUTER.childrens.listUser.path} element={<ListStudent />}></Route>
                    <Route path={STUDENT_ROUTER.childrens.createUser.path} element={<CreateStudent />}></Route>
                    <Route path={STUDENT_ROUTER.childrens.updateUser.path} element={<UpdateStudent />}></Route>
                    

                    <Route path={KHOA_ROUTER.childrens.listKhoa.path} element={<Khoa />}></Route>
                    <Route path={KHOA_ROUTER.childrens.createKhoa.path} element={<CreateKhoa />}></Route>
                    <Route path={KHOA_ROUTER.childrens.updateKhoa.path} element={<UpdateKhoa />}></Route>

                    <Route path={MONHOC_ROUTER.childrens.listMonhoc.path} element={<ListMonhoc />}></Route>
                    <Route path={MONHOC_ROUTER.childrens.createMonhoc.path} element={<CreateMonhoc />}></Route>
                    <Route path={MONHOC_ROUTER.childrens.updateMonhoc.path} element={<UpdateMonhoc />}></Route>

                    <Route path={KETQUA_ROUTER.childrens.listKetqua.path} element={<ListKetqua />}></Route>
                    <Route path={KETQUA_ROUTER.childrens.createKetqua.path} element={<CreateKetqua />}></Route>
                    <Route path={KETQUA_ROUTER.childrens.updateKetqua.path} element={<UpdateKetqua />}></Route>

                    <Route path={THONGKE_ROUTER.childrens.listSvXuatSac.path} element={<ListSvXuatSac />}></Route>
                    <Route path={THONGKE_ROUTER.childrens.listSvByMh.path} element={<ListSvByMh />}></Route>


                </Route>

                {/* <Route path={APP_ROUTER_CONST.nonfound.path} element={<NonFound />} />
        <Route path={APP_ROUTER_CONST.login.path} element={<Login />} /> */}
            </Routes>
        </div>
    );
}

export default AppRouter;
