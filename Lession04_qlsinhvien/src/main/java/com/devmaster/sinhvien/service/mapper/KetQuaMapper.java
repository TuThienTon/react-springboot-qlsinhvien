package com.devmaster.sinhvien.service.mapper;

import com.devmaster.sinhvien.domain.KetQua;
import com.devmaster.sinhvien.service.dto.KetQuaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class KetQuaMapper implements EntityMapper<KetQuaDTO, KetQua>{
    @Autowired
    SinhVienMapper sinhVienMapper;
    @Autowired
    MonHocMapper monHocMapper;

    @Override
    public KetQuaDTO toDo(KetQua entity) {
        KetQuaDTO dto = new KetQuaDTO();
        dto.setId(entity.getId());
        dto.setMa_sv(sinhVienMapper.toDo(entity.getMa_sv()));
        dto.setMa_mh(monHocMapper.toDo(entity.getMa_mh()));
//        dto.setMa_sv(ketQua.getMa_sv());
//        dto.setMa_mh(ketQua.getMa_mh());
        dto.setDiem(entity.getDiem());
        return dto;
    }

    @Override
    public KetQua toEntity(KetQuaDTO dto) {
        KetQua entity = new KetQua();
        entity.setId(dto.getId());
//        entity.setMa_sv(dto.getMa_sv());
//        entity.setMa_mh(dto.getMa_mh());
        entity.setDiem(dto.getDiem());
        return entity;
    }

    @Override
    public List<KetQuaDTO> toDo(List<KetQua> e) {
        List<KetQuaDTO> entity = new ArrayList<>();
        e.forEach(ketQua -> {
            KetQuaDTO dto = toDo(ketQua);
            entity.add(dto);
        });
        return entity;
    }

    @Override
    public List<KetQua> toEntity(List<KetQuaDTO> d) {
        return null;
    }
}
