package com.devmaster.sinhvien.projection;

import java.time.LocalDate;

public interface SinhVienInfo {

    String getMaSv();

    String getHoSv();

    LocalDate getNgaySinh();

    String getTenSv();

    String getTenMh();
    String getmaKh();

    Double getDiem();

    Double getDiemTB();

    Integer getSoMon();
}
