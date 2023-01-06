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

    @Query(value = " select * from qlsinhvien.ket_qua kq where  kq.ma_sv like concat('%', :masv,'%') " +
            "and  kq.ma_mh like  concat('%', :mamh, '%')", nativeQuery = true)
    List<KetQua> findByName(@Param("masv") String masv, @Param("mamh") String mamh);


    Optional<KetQua> findById(Integer id);
}
