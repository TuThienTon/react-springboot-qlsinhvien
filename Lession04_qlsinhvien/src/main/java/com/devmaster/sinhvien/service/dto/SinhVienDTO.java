package com.devmaster.sinhvien.service.dto;

import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;

@Data
public class SinhVienDTO {
    private String id;

    private String hoSv;

    private String tenSv;

    private Boolean phai = false;

    private LocalDate ngaySinh;

    private String noiSinh;

    private String maKh;
    private KhoaDTO khoa;

}