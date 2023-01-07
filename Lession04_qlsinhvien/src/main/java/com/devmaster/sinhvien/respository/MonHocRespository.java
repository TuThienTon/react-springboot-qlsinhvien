package com.devmaster.sinhvien.respository;

import com.devmaster.sinhvien.domain.MonHoc;
import com.devmaster.sinhvien.projection.MonHocInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonHocRespository extends JpaRepository<MonHoc, String> {
//    @Query(value = "select mh from MonHoc mh where mh.tenMh like concat('%',:name,'%') or mh.soTiet =  ")
    @Query(value = " SELECT * FROM qlsinhvien.mon_hoc mh " +
            " where mh.ten_mh like concat('%',:name,'%') or mh.so_tiet " +
            " like concat('',:name,'')", nativeQuery = true)
    List<MonHoc> findByName(@Param("name") String name);

    @Query(value = "select  mh from MonHoc mh where mh.id = :id")
    MonHoc findById(@Param("id") Integer id);

    @Query(value = "select mh from MonHoc mh where mh.soTiet >= :dk ")
    List<MonHoc> findByDk(@Param("dk") Integer dk);

    //hiển thị điểm trung bình môn học.;
    @Query(value = " select avg(diem) as diemTB from KetQua where ma_mh = :id")
    MonHocInfo diemTB(@Param("id") Integer id);

    //Hiển thị Thông tin sinh viên học môn học đó
    @Query(value = " select sv.ma_sv as maSv, concat( sv.ho_sv , ' ' ,sv.ten_sv) as hoTen, " +
            " mh.ma_mh as MaMh, mh.ten_mh as tenMh, kq.diem as diem " +
            " from qlsinhvien.ket_qua kq " +
            " join qlsinhvien.sinh_vien sv on sv.ma_sv = kq.ma_sv " +
            " join qlsinhvien.mon_hoc mh on mh.ma_mh = kq.ma_mh " +
            " where mh.ma_mh like concat('%', :ma_mh, '%') ", nativeQuery = true)
    List<MonHocInfo> findSinhVienByMonHoc(@Param("ma_mh") String ma_mh);

}
