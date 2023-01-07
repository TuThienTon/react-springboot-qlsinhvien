package com.devmaster.sinhvien.respository;

import com.devmaster.sinhvien.domain.KetQua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KetQuaRespository extends JpaRepository<KetQua, String> {

    @Query(value = " SELECT kq.id, kq.ma_sv, kq.ma_mh, sv.ho_sv, sv.ten_sv, mh.ten_mh, mh.so_tiet, diem " +
            " FROM qlsinhvien.ket_qua kq " +
            " join qlsinhvien.sinh_vien sv on kq.ma_sv = sv.ma_sv " +
            " join qlsinhvien.mon_hoc mh on kq.ma_mh = mh.ma_mh  " +
            " where  concat(sv.ho_sv, sv.ten_sv) like concat('%', :masv,'%') " +
            " and  kq.ma_mh like  concat('%', :mamh, '%') order by id desc", nativeQuery = true)
    List<KetQua> findByName(@Param("masv") String masv, @Param("mamh") String mamh);

    Optional<KetQua> findById(Integer id);
}
