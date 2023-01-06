package com.devmaster.sinhvien.service;

import com.devmaster.sinhvien.domain.MonHoc;
import com.devmaster.sinhvien.projection.MonHocInfo;
import com.devmaster.sinhvien.respository.MonHocRespository;
import com.devmaster.sinhvien.service.dto.MonHocDTO;
import com.devmaster.sinhvien.service.mapper.MonHocMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MonHocService {
    private final MonHocRespository monHocRespository;
    private final MonHocMapper monHocMapper;
    public List<MonHocDTO> findByName(String name){
        List<MonHoc> monHocs = monHocRespository.findByName(name);
        List<MonHocDTO> dto = monHocMapper.toDo(monHocs);
        return dto;
    }

    public MonHocDTO findById(Integer id){
        MonHoc entity = monHocRespository.findById(id);
        MonHocDTO dto = monHocMapper.toDo(entity);
        return dto;
    }
    @Transactional(readOnly = true)
    public List<MonHocDTO> findAll(){
        List<MonHoc> monHocs = monHocRespository.findAll();
        List<MonHocDTO> monHocDTOS = monHocMapper.toDo(monHocs);
        return monHocDTOS;
    }

    @Transactional(readOnly = true)
    public List<MonHocDTO> findByDk(Integer dk){
        List<MonHoc> monHocs = monHocRespository.findByDk(dk);
        List<MonHocDTO> monHocDTOS = monHocMapper.toDo(monHocs);
        return monHocDTOS;
    }
    public void create(MonHocDTO monHocDTO){
        MonHoc monHoc = monHocMapper.toEntity(monHocDTO);
        monHocRespository.save(monHoc);
    }
    @Transactional
    public void edit(Integer id, MonHocDTO monHocDTO){
        MonHoc monHoc = monHocMapper.toEntity(monHocDTO);
        monHoc.setId(id);
        monHocRespository.save(monHoc);
    }

    @Transactional
    public void delete(int id) {
        monHocRespository.deleteById(String.valueOf(id));
    }

    public MonHocInfo diemTB(Integer id){
        MonHocInfo monHocInfo = monHocRespository.diemTB(id);
        return monHocInfo;
    }
    public List<MonHocInfo> findSinhVienByMonHoc(String ma_mh){
        List<MonHocInfo> monHocInfos = monHocRespository.findSinhVienByMonHoc(ma_mh);
        return monHocInfos;
    }



}
