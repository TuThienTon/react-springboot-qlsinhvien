import HTTP_AUTH from "../../configs/axios-auth.config";
import API_ENTRY from "../constants/api-entry.constant";

export const createMonhoc = (body: any) => {
    return HTTP_AUTH.post(API_ENTRY.monhoc.create, body);
};

export const updateMonhoc = (body: any) => {
    return HTTP_AUTH.put(API_ENTRY.monhoc.update(body.id), body);
};

export const getByIdMonhoc = (id: any) => {
    return HTTP_AUTH.get(API_ENTRY.monhoc.getById(id));
};

export const filterMonhoc = (params: any) => {
    return HTTP_AUTH.get(API_ENTRY.monhoc.filter, { params });
};

export const deleteMonhoc = (id: any) => {
    return HTTP_AUTH.delete(API_ENTRY.monhoc.delete(id));
};
