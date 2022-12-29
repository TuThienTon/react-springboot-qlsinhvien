package com.devmaster.sinhvien.service.mapper;

import com.devmaster.sinhvien.domain.MonHoc;
import com.devmaster.sinhvien.service.dto.MonHocDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MonHocMapper implements EntityMapper<MonHocDTO, MonHoc> {

    @Override
    public MonHocDTO toDo(MonHoc monHoc) {
        MonHocDTO dto = new MonHocDTO();
        dto.setId(monHoc.getId());
        dto.setTenMh(monHoc.getTenMh());
        dto.setSoTiet(monHoc.getSoTiet());
        return dto;
    }

    @Override
    public MonHoc toEntity(MonHocDTO monHocDTO) {
        MonHoc monHoc = new MonHoc();
        monHoc.setId(monHocDTO.getId());
        monHoc.setTenMh(monHocDTO.getTenMh());
        monHoc.setSoTiet(monHocDTO.getSoTiet());
        return monHoc;
    }

    @Override
    public List<MonHocDTO> toDo(List<MonHoc> e) {
        List<MonHocDTO> monHocDTOS = new ArrayList<>();
        e.forEach(monHoc -> {
            MonHocDTO dto = toDo(monHoc);
            monHocDTOS.add(dto);
        });
        return monHocDTOS;
    }

    @Override
    public List<MonHoc> toEntity(List<MonHocDTO> d) {
        
        return null;
    }
}
