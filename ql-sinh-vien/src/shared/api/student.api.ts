import HTTP_AUTH from "../../configs/axios-auth.config";
import API_ENTRY from "../constants/api-entry.constant";
// import { SearchUserReqModel } from '../models/user.model';

export const createStudent = (body: any) => {
    return HTTP_AUTH.post(API_ENTRY.student.create, body);
};

export const updateStudent = (body: any) => {
    return HTTP_AUTH.put(API_ENTRY.student.update(body.id), body);
};

export const getByIdStudent = (id: any) => {
    return HTTP_AUTH.get(API_ENTRY.student.getById(id));
};

export const filterStudent = (params: any) => {
    return HTTP_AUTH.get(API_ENTRY.student.filter, { params });
};

export const deleteStudent = (id: any) => {
    return HTTP_AUTH.delete(API_ENTRY.student.delete(id));
};
