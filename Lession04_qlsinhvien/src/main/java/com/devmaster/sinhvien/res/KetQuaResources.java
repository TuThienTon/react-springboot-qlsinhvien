package com.devmaster.sinhvien.res;

import com.devmaster.sinhvien.domain.KetQua;
import com.devmaster.sinhvien.respository.KetQuaRespository;
import com.devmaster.sinhvien.service.KetQuaService;
import com.devmaster.sinhvien.service.dto.KetQuaDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ketqua")
@RequiredArgsConstructor
public class KetQuaResources {
    private final KetQuaService ketQuaService;
    private final KetQuaRespository ketQuaRespository;


    @PostMapping("")
    public void create(@RequestBody KetQuaDTO dto){
        ketQuaService.create(dto);
    }
    @PutMapping("/{id}")
    public void edit(@RequestBody KetQuaDTO ketQuaDTO, @PathVariable("id") Integer id){
        ketQuaService.edit(id,ketQuaDTO);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id){
        ketQuaService.delete(id);
    }

    @GetMapping("/filter")
    List<KetQuaDTO> findByName(@RequestParam("name") String name){
        List<KetQuaDTO> dto = ketQuaService.findByName(name);
        return dto;
    }
    @GetMapping("/{id}")
    KetQuaDTO getById(@PathVariable("id") String id){
        KetQuaDTO dto = ketQuaService.getById(id);
        return dto;
    }
    @GetMapping("/findAll")
    public List<KetQuaDTO> findAll(){
        List<KetQuaDTO> ketQuaDTOS = ketQuaService.findAll();
        return ketQuaDTOS;
    }
}

