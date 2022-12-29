package com.devmaster.sinhvien.service.mapper;

import com.devmaster.sinhvien.domain.Khoa;
import com.devmaster.sinhvien.domain.SinhVien;
import com.devmaster.sinhvien.service.dto.SinhVienDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SinhVienMapper implements EntityMapper<SinhVienDTO, SinhVien> {
    @Autowired
    KhoaMapper khoaMapper;
    @Override
    public SinhVienDTO toDo(SinhVien entity) {
        SinhVienDTO dto = new SinhVienDTO();
        dto.setId(entity.getId());
        dto.setHoSv(entity.getHoSv());
        dto.setTenSv(entity.getTenSv());
        dto.setPhai(entity.getPhai());
        dto.setNgaySinh(entity.getNgaySinh());
        dto.setNoiSinh((entity.getNoiSinh()));
//        dto.setMaKh(khoaMapper.toEntity(entity.getMaKh()));
        dto.setKhoa(khoaMapper.toDo(entity.getMaKh()));
        return dto;
    }

    @Override
    public SinhVien toEntity(SinhVienDTO dto) {
        SinhVien entity = new SinhVien();
        entity.setId(dto.getId());
        entity.setHoSv(dto.getHoSv());
        entity.setTenSv(dto.getTenSv());
        entity.setPhai(dto.getPhai());
        entity.setNgaySinh(dto.getNgaySinh());
        entity.setNoiSinh(dto.getNoiSinh());
//        entity.setMaKh(khoaMapper.toEntity(dto.getKhoa()));
        return entity;
    }

    @Override
    public List<SinhVienDTO> toDo(List<SinhVien> e) {
        List<SinhVienDTO> entity = new ArrayList<>();
        e.forEach(sinhVien -> {
            SinhVienDTO dto = toDo(sinhVien);
            entity.add(dto);
        });
        return entity;
    }

    @Override
    public List<SinhVien> toEntity(List<SinhVienDTO> d) {
        return null;
    }
}
