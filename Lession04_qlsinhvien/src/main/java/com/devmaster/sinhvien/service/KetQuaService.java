package com.devmaster.sinhvien.service;

import com.devmaster.sinhvien.domain.KetQua;
import com.devmaster.sinhvien.domain.Khoa;
import com.devmaster.sinhvien.domain.MonHoc;
import com.devmaster.sinhvien.domain.SinhVien;
import com.devmaster.sinhvien.respository.KetQuaRespository;
import com.devmaster.sinhvien.respository.KhoaRespository;
import com.devmaster.sinhvien.respository.MonHocRespository;
import com.devmaster.sinhvien.respository.SinhVienRespository;
import com.devmaster.sinhvien.service.dto.KetQuaDTO;
import com.devmaster.sinhvien.service.mapper.KetQuaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class KetQuaService {
    private final KetQuaRespository ketQuaRespository;
    private final KetQuaMapper ketQuaMapper;
    private final SinhVienRespository sinhVienRespository;
    private final KhoaRespository khoaRespository;
    private final MonHocRespository monHocRespository;

    public List<KetQuaDTO> findByName(String masv, String mamh) {
        List<KetQua> ketQua = ketQuaRespository.findByName(masv, mamh);
        List<KetQuaDTO> dto = ketQuaMapper.toDo(ketQua);
        return dto;
    }

    public List<KetQuaDTO> findAll() {
        List<KetQua> entity = ketQuaRespository.findAll();
        List<KetQuaDTO> dtos = ketQuaMapper.toDo(entity);
        return dtos;
    }

    public void create(KetQuaDTO dto) {
        Optional<KetQua> ketQuaOptional = ketQuaRespository.findById(dto.getId());
        if (ketQuaOptional.isPresent()){
            throw new RuntimeException("Đã có kết quả với id:" + dto.getId());
        };
        KetQua ketQua = ketQuaMapper.toEntity(dto);
        SinhVien sinhVien = sinhVienRespository.findById(dto.getMaSv()).orElse(null);
        MonHoc monHoc = monHocRespository.findById(String.valueOf(dto.getMaMh())).orElse(null);

        ketQua.setMa_sv(sinhVien);
        ketQua.setMa_mh(monHoc);
        ketQuaRespository.save(ketQua);
    }
    public void edit(Integer id, KetQuaDTO dto){
        Optional<KetQua> ketQuaOptional = ketQuaRespository.findById(dto.getId());
        if (!ketQuaOptional.isPresent()){
            throw new RuntimeException("Không tìm thấy kết quả với id:" + dto.getId());
        };
        KetQua ketQua = ketQuaMapper.toEntity(dto);
        SinhVien sinhVien = sinhVienRespository.findById(dto.getMaSv()).orElse(null);
        MonHoc monHoc = monHocRespository.findById(String.valueOf(dto.getMaMh())).orElse(null);
        ketQua.setMa_sv(sinhVien);
        ketQua.setMa_mh(monHoc);
        ketQua.setId(id);
        ketQuaRespository.save(ketQua);
    }
    public void delete(String id){
        ketQuaRespository.deleteById(id);
    }

    public KetQuaDTO getById(String id) {
        KetQua entity = ketQuaRespository.getById(id);
        KetQuaDTO dto = ketQuaMapper.toDo(entity);
        return dto;
    }
}
