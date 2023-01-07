package com.devmaster.sinhvien.respository;

import com.devmaster.sinhvien.domain.Khoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhoaRespository extends JpaRepository<Khoa, String> {

    @Query(value = "select k from Khoa k where k.tenKh like concat('%',:name,'%') or k.id like concat('%',:name,'%') ")
    List<Khoa> findByName(@Param("name") String name);

}
