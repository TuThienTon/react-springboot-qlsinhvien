package com.devmaster.sinhvien.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ket_qua")
public class KetQua {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ma_sv", nullable = false)
    public SinhVien ma_sv;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ma_mh", nullable = false)
    public MonHoc ma_mh;
    @Column(name = "diem")
    private Float diem;


}