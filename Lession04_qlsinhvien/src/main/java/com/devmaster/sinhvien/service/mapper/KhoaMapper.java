package com.devmaster.sinhvien.service.mapper;

import com.devmaster.sinhvien.domain.Khoa;
import com.devmaster.sinhvien.service.dto.KhoaDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class KhoaMapper implements EntityMapper<KhoaDTO, Khoa> {
    @Override
    public KhoaDTO toDo(Khoa khoa) {
        KhoaDTO dto = new KhoaDTO();
        dto.setId(khoa.getId());
        dto.setTenKh(khoa.getTenKh());
        return dto;
    }

    @Override
    public Khoa toEntity(KhoaDTO dto) {
        Khoa entity = new Khoa();
        entity.setId(dto.getId());
        entity.setTenKh(dto.getTenKh());
        return entity;
    }

    @Override
    public List<KhoaDTO> toDo(List<Khoa> e) {
        List<KhoaDTO> khoaDTOS = new ArrayList<>();
        e.forEach(khoa -> {
            KhoaDTO dto = toDo(khoa);
            khoaDTOS.add(dto);
        });
        return khoaDTOS;
    }

    @Override
    public List<Khoa> toEntity(List<KhoaDTO> d) {
        return null;
    }
}
