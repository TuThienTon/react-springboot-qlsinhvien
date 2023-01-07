package com.devmaster.sinhvien.res;

import com.devmaster.sinhvien.projection.SinhVienInfo;
import com.devmaster.sinhvien.service.SinhVienService;
import com.devmaster.sinhvien.service.dto.SinhVienDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/sinhvien")
@RequiredArgsConstructor
public class SinhVienResources {
    private final SinhVienService sinhVienService;

    //Create
    @PostMapping("")
    public void create(@RequestBody SinhVienDTO dto) {
        sinhVienService.create(dto);
    }

    //Edit
    @PutMapping("{id}")
    public void edit(@RequestBody SinhVienDTO sinhVienDTO, @PathVariable("id") String id) {
        sinhVienService.edit(id, sinhVienDTO);
    }

    //Delete
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") String id) {
        sinhVienService.delete(id);
    }

    //Filter
    @GetMapping("/filter")
    List<SinhVienDTO> findSinhVien(@RequestParam("name") String name, @RequestParam("makh") String makh) {
        return sinhVienService.findAllByTenSv(name, makh);
    }

    //get by id
    @GetMapping("/{id}")
    SinhVienDTO getById(@PathVariable("id") String id) {
        SinhVienDTO dtos = sinhVienService.getById(id);
        return dtos;
    }

    // Get All
    @GetMapping("findAll")
    public List<SinhVienDTO> findAll() {
        List<SinhVienDTO> sinhVienDTOS = sinhVienService.findAll();
        return sinhVienDTOS;
    }

    @GetMapping("/findDiemByMonHoc")
    List<SinhVienInfo> findDiemByMonHoc(@RequestParam("id") Long id) {

        return sinhVienService.sinhVienInfoList(id);
    }

    // Tổng kết số môn học tham gia và điểm trung bình của sinh viên
    @GetMapping("/tongket")
    List<SinhVienInfo> getDiemTongKet() {
        List<SinhVienInfo> sinhVienInfos = sinhVienService.getDiemTongKet();
        return sinhVienInfos;
    }

    //Số môn mà sinh viên đó tham gia
    @GetMapping("/tongket/{maSv}/{diemTB}")
    List<SinhVienInfo> getSoMonBySinhVien(@PathVariable("maSv") String maSv, @PathVariable("diemTB") Integer diemTB) {
        return sinhVienService.getSoMonBySinhVien(maSv, diemTB);
    }

    // Hiển thị sinh viên xuất sắc có diemTB các môn >= 8
    @GetMapping("/tongket/sv-vip")
    List<SinhVienInfo> getSinhVienXuatSac(@RequestParam("makh") String makh) {
        return sinhVienService.getSinhVienXuatSac(makh);
    }

    @GetMapping("findSvByKhoa")
    List<SinhVienDTO> findSinhVienByKhoa(@RequestParam("maKh") String maKh, @RequestParam("name") String name) {
        return sinhVienService.findSinhVienByKhoa(maKh, name);
    }
}
