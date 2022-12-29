package com.devmaster.sinhvien.res;

import com.devmaster.sinhvien.projection.MonHocInfo;
import com.devmaster.sinhvien.service.MonHocService;
import com.devmaster.sinhvien.service.dto.MonHocDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/monhoc")
@RequiredArgsConstructor
public class MonHocResources {
    public final MonHocService monHocService;

    //create
    @PostMapping("/create")
    public void create(@RequestBody MonHocDTO monHocDTO ){
        monHocService.create(monHocDTO);
    }

    //edit
    @PutMapping("/update/{id}")
    //Sửa
    public void edit(@RequestBody MonHocDTO monHocDTO, @PathVariable("id") Integer id){
        monHocService.edit(id, monHocDTO);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Integer id ){
        monHocService.delete(id);
    }
    //Tìm kiếm theo tên
    @GetMapping("/filter")
    public List<MonHocDTO> findByName(@RequestParam("name") String name){
        List<MonHocDTO> dto = monHocService.findByName(name);
        return dto;
    }
    //Tìm kiếm theo id
    @GetMapping("/{id}")
    public MonHocDTO findById(@PathVariable("id") Integer id){
        MonHocDTO dto = monHocService.findById(id);
        return dto;
    }
    //Hiển thị ra một list
    @GetMapping("/findAll")
    public List<MonHocDTO> findAll(){
        List<MonHocDTO> monHocDTOS = monHocService.findAll();
        return monHocDTOS;
    }
    //Hiển thị có điều kiện
    //localhost:8085/monhocs/dk?dk=2
    @GetMapping("/dk")
    public List<MonHocDTO> findByDk(@RequestParam("dk") Integer dk){
        List<MonHocDTO> monHocDTOS = monHocService.findByDk(dk);
        return monHocDTOS;
    }

    //Điểm trung bình của môn học
    @GetMapping("/dtb/{id}")
    MonHocInfo diemTB(@PathVariable("id") Integer id){
         return monHocService.diemTB(id);

    }
    //Các sinh viên theo học môn học where = ma_mh
    @GetMapping("/sinhvien/{ma_mh}")
    List<MonHocInfo> findSinhVienByMonHoc(@PathVariable("ma_mh") Integer ma_mh){
        return monHocService.findSinhVienByMonHoc(ma_mh);
    }






    //Sinhvien xuất sắc where diem tb >= 8

}
