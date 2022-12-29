package com.devmaster.sinhvien.service.dto;

import lombok.Data;

@Data
public class KetQuaDTO {
    private Integer id;
    private SinhVienDTO ma_sv;
    private MonHocDTO ma_mh;
    private Float diem;
    private String maSv;
    private Integer maMh;
}