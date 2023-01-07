package com.devmaster.sinhvien.respository;

import com.devmaster.sinhvien.domain.SinhVien;
import com.devmaster.sinhvien.projection.MonHocInfo;
import com.devmaster.sinhvien.projection.SinhVienInfo;
import com.devmaster.sinhvien.service.dto.SinhVienDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SinhVienRespository extends JpaRepository<SinhVien, String> {

    @Query(value = " select sv.ho_sv as hoSv, " +
            " sv.ten_sv as tenSv, " +
            " sv.ngay_sinh as ngaySinh, " +
            " mh.ten_mh as tenMh, " +
            " kq.diem as diem " +
            " from sinh_vien sv " +
            " inner join ket_qua kq on sv.ma_sv = kq.ma_sv" +
            " inner join mon_hoc mh on kq.ma_mh = mh.ma_mh" +
            " where kq.ma_mh = :id ", nativeQuery = true)
    List<SinhVienInfo> findDiemByMonHoc(@Param("id") Long id);

    // Điểm tổng kết của sinh viên
    @Query(value = " select sv.ma_sv maSv, concat(sv.ho_sv, '' , sv.ten_sv) hoTen, " +
            " count(kq.ma_sv) as soMon, avg(kq.diem) as diemTB " +
            " from qlsinhvien.ket_qua kq " +
            " left join qlsinhvien.sinh_vien sv on kq.ma_sv = sv.ma_sv " +
            " group by sv.ma_sv ", nativeQuery = true)
    List<SinhVienInfo> getDiemTongKet();

    // Số môn tham gia của sinh viên + điểm trung bình
    @Query(value = " select sv.ma_sv maSv, concat(sv.ho_sv, '' , sv.ten_sv) hoTen, " +
            " count(kq.ma_sv) as soMon, avg(kq.diem) as diemTB " +
            " from qlsinhvien.ket_qua kq " +
            " left join qlsinhvien.sinh_vien sv on kq.ma_sv = sv.ma_sv " +
            " where kq.ma_sv = :maSv group by maSv having diemTB >= :diemTB ", nativeQuery = true)
    List<SinhVienInfo> getSoMonBySinhVien(@Param("maSv") String maSv, @Param("diemTB") Integer diemTB);

    //Hiển thị sinh vien xuất sắc diemTB >= 8
    @Query(value = " select sv.ma_sv maSv, sv.ho_sv hoSv, sv.ten_sv tenSv, sv.ngay_sinh ngaySinh, sv.ma_kh maKh, " +
            " count(kq.ma_sv) as soMon, avg(kq.diem) as diemTB \n" +
            " from qlsinhvien.ket_qua kq \n" +
            " left join qlsinhvien.sinh_vien sv on kq.ma_sv = sv.ma_sv\n" +
            " group by maSv  having diemTB >= 8 and maKh like concat('',:makh,'')", nativeQuery = true)
    List<SinhVienInfo> getSinhVienXuatSac(@Param("makh") String makh);

    @Query( value = " select sv from SinhVien sv where sv.tenSv like concat('%',:name,'%') " )
    List<SinhVien> findSinhVien(@Param("name") String name);

    @Query( value = " select  s from  SinhVien s " +
            " where concat(s.hoSv,' ',s.tenSv) like concat('%', :name, '%') " +
            " and s.maKh.id like concat('%',:makh,'%') ")
    List<SinhVien> findAllByTenSv(@Param("name") String name, @Param("makh") String makh);


    @Query(value = " select s from SinhVien s where concat(s.hoSv,' ',s.tenSv) like concat('%', :name, '%') " +
            "and s.maKh.id like concat('%', :maKh, '%')")
    List<SinhVien> findSinhVienByKhoa(@Param("maKh") String maKh, @Param("name") String name);
}
