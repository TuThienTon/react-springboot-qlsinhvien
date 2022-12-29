package com.devmaster.sinhvien.res;

import com.devmaster.sinhvien.service.KhoaService;
import com.devmaster.sinhvien.service.dto.KhoaDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/khoa")
@RequiredArgsConstructor
public class KhoaResources {
    private final KhoaService khoaService;

    //create
    @PostMapping("/create")
    public void create(@RequestBody KhoaDTO dto) {
        khoaService.create(dto);
    }

    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody KhoaDTO khoaDTO, @PathVariable("id") String id) {
        khoaService.edit(id, khoaDTO);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        khoaService.delete(id);
    }

    //Tìm kiếm theo tên
    @GetMapping("/filter")
    List<KhoaDTO> findByName(@RequestParam("name") String name) {
        return khoaService.findByName(name);
    }

    //Tìm kiếm theo id
    @GetMapping("/{id}")
    KhoaDTO findById(@PathVariable("id") String id) {
        KhoaDTO dto = khoaService.findById(id);
        return dto;
    }

    //Hiển thị ra một list
    @GetMapping("/findAll")
    public List<KhoaDTO> findAll() {
        List<KhoaDTO> khoaDTOS = khoaService.findAll();
        return khoaDTOS;
    }
}
