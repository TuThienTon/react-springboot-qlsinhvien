import HTTP_AUTH from "../../configs/axios-auth.config";
import API_ENTRY from "../constants/api-entry.constant";

export const createKhoa = (body: any) => {
    return HTTP_AUTH.post(API_ENTRY.khoa.create, body);
};

export const updateKhoa = (body: any) => {
    return HTTP_AUTH.put(API_ENTRY.khoa.update(body.id), body);
};

export const getByIdKhoa = (id: any) => {
    return HTTP_AUTH.get(API_ENTRY.khoa.getById(id));
};

export const filterKhoa = (params: any) => {
    return HTTP_AUTH.get(API_ENTRY.khoa.filter, { params });
};

export const deleteKhoa = (id: any) => {
    return HTTP_AUTH.delete(API_ENTRY.khoa.delete(id));
};
