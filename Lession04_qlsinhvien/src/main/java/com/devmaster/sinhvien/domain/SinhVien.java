package com.devmaster.sinhvien.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "sinh_vien")
public class SinhVien {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_sv", nullable = false, length = 3)
    private String id;

    @Column(name = "ho_sv", nullable = false, length = 15)
    private String hoSv;

    @Column(name = "ten_sv", nullable = false, length = 7)
    private String tenSv;

    @Column(name = "phai", nullable = false)
    private Boolean phai = false;

    @Column(name = "ngay_sinh")
    private LocalDate ngaySinh;

    @Column(name = "noi_sinh", nullable = false, length = 100)
    private String noiSinh;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ma_kh", nullable = false)
    private Khoa maKh;

}