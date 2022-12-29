package com.devmaster.sinhvien.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "mon_hoc")
public class MonHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_mh", nullable = false)
    private Integer id;

    @Column(name = "ten_mh", length = 50)
    private String tenMh;

    @Column(name = "so_tiet")
    private Integer soTiet;

}