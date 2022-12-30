package com.devmaster.sinhvien.service;

import com.devmaster.sinhvien.domain.Khoa;
import com.devmaster.sinhvien.domain.SinhVien;
import com.devmaster.sinhvien.projection.MonHocInfo;
import com.devmaster.sinhvien.projection.SinhVienInfo;
import com.devmaster.sinhvien.respository.KhoaRespository;
import com.devmaster.sinhvien.respository.SinhVienRespository;
import com.devmaster.sinhvien.service.dto.SinhVienDTO;
import com.devmaster.sinhvien.service.mapper.SinhVienMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SinhVienService {
    private final SinhVienRespository sinhVienRespository;
    private final SinhVienMapper sinhVienMapper;
    private final KhoaRespository khoaRepository;

    public List<SinhVienInfo> sinhVienInfoList(Long id){
        List<SinhVienInfo> sinhVienInfos = sinhVienRespository.findDiemByMonHoc(id);
        return sinhVienInfos;
    }

    public List<SinhVienDTO> findAll() {
        List<SinhVien> sinhViens = sinhVienRespository.findAll();
        List<SinhVienDTO> sinhVienDTOS = sinhVienMapper.toDo(sinhViens);
        return sinhVienDTOS;
    }

    public void create(SinhVienDTO dto) {
        // get tất cả các id đã có
        Optional<SinhVien> sinhVienOptional = sinhVienRespository.findById(dto.getId());
        // Nếu id nhập vào đã có thì thông báo đã có id và hủy sự sự kiện create
        if (sinhVienOptional.isPresent()){
            throw new RuntimeException("Đã có id :" + dto.getId());
        };
        SinhVien sinhVien =  sinhVienMapper.toEntity(dto);
        Khoa khoa = khoaRepository.findById(dto.getMaKh()).orElse(null);

        sinhVien.setMaKh(khoa);
        sinhVienRespository.save(sinhVien);
    }

    public void edit(String id, SinhVienDTO dto) {
        Optional<SinhVien> sinhVienOptional = sinhVienRespository.findById(id);
        if (!sinhVienOptional.isPresent()){
            throw new RuntimeException("Không tồn tại sinh viên có id: " + id);
        }
        SinhVien sinhVien = sinhVienMapper.toEntity(dto);
        Khoa khoa = khoaRepository.findById(dto.getMaKh()).orElse(null);
        sinhVien.setId(id);
        sinhVien.setMaKh(khoa);
        sinhVienRespository.save(sinhVien);
    }

    public void delete(String id) {
        sinhVienRespository.deleteById(id);
    }

    public List<SinhVienDTO> findAllByTenSv(String name) {
        List<SinhVien> sinhVien = sinhVienRespository.findAllByTenSv(name);
        List<SinhVienDTO> sinhVienDTO = sinhVienMapper.toDo(sinhVien);
        return sinhVienDTO;
    }

    public List<SinhVienInfo> getDiemTongKet() {
        List<SinhVienInfo> sinhVienInfos = sinhVienRespository.getDiemTongKet();
        return sinhVienInfos;
    }
    public List<SinhVienInfo> getSoMonBySinhVien(String maSv, Integer diemTB) {
        List<SinhVienInfo> sinhVienInfos = sinhVienRespository.getSoMonBySinhVien(maSv, diemTB);
        return sinhVienInfos;
    }
    public List<SinhVienInfo> getSinhVienXuatSac(){
        List<SinhVienInfo> sinhVienInfos = sinhVienRespository.getSinhVienXuatSac();
        return sinhVienInfos;
    }

    public SinhVienDTO getById(String id) {
        SinhVien entity = sinhVienRespository.getById(id);
        SinhVienDTO dtos = sinhVienMapper.toDo(entity);
        return dtos;
    }

    public List<SinhVienDTO> findSinhVienByKhoa(String maKh, String name) {
        List<SinhVien> entity = sinhVienRespository.findSinhVienByKhoa(maKh, name);
        List<SinhVienDTO> dto = sinhVienMapper.toDo(entity);
        return dto;
    }
}
