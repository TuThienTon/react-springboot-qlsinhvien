package com.devmaster.sinhvien.service;

import com.devmaster.sinhvien.domain.Khoa;
import com.devmaster.sinhvien.respository.KhoaRespository;
import com.devmaster.sinhvien.service.dto.KhoaDTO;
import com.devmaster.sinhvien.service.mapper.KhoaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class KhoaService {
    private final KhoaRespository khoaRespository;
    private final KhoaMapper khoaMapper;
    public List<KhoaDTO> findByName(String name){
        List<Khoa> khoa = khoaRespository.findByName(name);
        List<KhoaDTO> dto = khoaMapper.toDo(khoa);
        return dto;
    }
    public KhoaDTO findById (String id){
        Optional<Khoa> khoaOptional = khoaRespository.findById(id);
        if (khoaOptional.isPresent()){
            KhoaDTO dto = khoaMapper.toDo(khoaOptional.get());
            return dto;
        }
        return null;
    }
    public void create(KhoaDTO dto){
        Optional<Khoa> khoaOptional = khoaRespository.findById(dto.getId());
        if (khoaOptional.isPresent()){
            throw new RuntimeException("Đã có khoa với id: "+ dto.getId());
        }
        Khoa khoa = khoaMapper.toEntity(dto);
        khoaRespository.save(khoa);
    }
    public void edit(String id, KhoaDTO khoaDTO){
        Khoa khoa = khoaMapper.toEntity(khoaDTO);
        khoa.setId(id);
        khoaRespository.save(khoa);
    }
    public void delete(String id){
        khoaRespository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public List<KhoaDTO> findAll(){
        List<Khoa> khoas = khoaRespository.findAll();
        List<KhoaDTO> khoaDTOS = khoaMapper.toDo(khoas);
        return khoaDTOS;
    }

}
