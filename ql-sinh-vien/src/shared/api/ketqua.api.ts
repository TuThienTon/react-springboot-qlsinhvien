import HTTP_AUTH from "../../configs/axios-auth.config";
import API_ENTRY from "../constants/api-entry.constant";
// import { SearchUserReqModel } from '../models/user.model';

export const createKetqua = (body: any) => {
    return HTTP_AUTH.post(API_ENTRY.ketqua.create, body);
};

export const updateKetqua = (body: any) => {
    return HTTP_AUTH.put(API_ENTRY.ketqua.update(body.id), body);
};

export const getByIdKetqua = (id: any) => {
    return HTTP_AUTH.get(API_ENTRY.ketqua.getById(id));
};

export const filterKetqua = (params: any) => {
    return HTTP_AUTH.get(API_ENTRY.ketqua.filter, { params });
};

export const deleteKetqua = (id: any) => {
    return HTTP_AUTH.delete(API_ENTRY.ketqua.delete(id));
};
