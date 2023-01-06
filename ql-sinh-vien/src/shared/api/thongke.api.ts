import HTTP_AUTH from "../../configs/axios-auth.config";
import API_ENTRY from "../constants/api-entry.constant";
// import { SearchUserReqModel } from '../models/user.model';


export const filterSvxs = (params: any) => {
    return HTTP_AUTH.get(API_ENTRY.thongke.filterSvxs, { params });
};
export const findSvByMh = ( params: any) => {
    return HTTP_AUTH.get(API_ENTRY.thongke.findSvByMh, { params });
};
