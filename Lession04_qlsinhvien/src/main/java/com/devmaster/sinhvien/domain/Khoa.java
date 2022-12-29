package com.devmaster.sinhvien.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "khoa")
public class Khoa {
    @Id
    @Column(name = "ma_kh", nullable = false, length = 2)
    private String id;

    @Column(name = "ten_kh", nullable = false, length = 50)
    private String tenKh;

}