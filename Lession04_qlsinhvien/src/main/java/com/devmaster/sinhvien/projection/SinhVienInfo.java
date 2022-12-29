package com.devmaster.sinhvien.projection;

import java.time.LocalDate;

public interface SinhVienInfo {
    String getHoSv();

    LocalDate getNgaySinh();

    String getTenSv();

    String getTenMh();

    Double getDiem();

    Double getDiemTB();

    Integer getSoMon();
}
