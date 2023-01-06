import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {  getByIdStudent, updateStudent } from "../../../shared/api/student.api";
import { filterSvxs, findSvByMh } from "../../../shared/api/thongke.api";

const initialState: any = {
    loading: false,
    errorMessage: null,
    entities: null,
    entity: {},
    updating: false,
    updateSuccess: false,
    creating: false,
    createSuccess: false,
    pageSearch: 1,
    totalCount: 0,
};


export const searchSvxsEntitiesAsync = createAsyncThunk("student/searchSvxs", async (data: any) => {
    const res = await filterSvxs(data);
    return res;
});
export const findSvByMhEntitiesAsync = createAsyncThunk("student/findSvByMh", async (data: any) => {
    const res = await findSvByMh(data);
    return res;
});

export const getByIdStudentAsync = createAsyncThunk(
    "student/get-by-id",
    async (id: any) => {
        const res = await getByIdStudent(id);
        return res;
    }
);


const StudentSlice = createSlice({
    name: "Student",
    initialState,
    reducers: {
        reset(state, action) {
            return initialState;
        },
        changePageSearch(state, action) {
            return {
                ...state,
                pageSearch: action.payload,
            };
        },
        changeUpdateSuccess(state, action) {
            return {
                ...state,
                updateSuccess: action.payload,
            };
        },
        changeCreateSuccess(state, action) {
            return {
                ...state,
                createSuccess: action.payload,
            };
        },
    },
    extraReducers: (build) => {
        build
            
            .addCase(searchSvxsEntitiesAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    entities: action.payload.data,
                };
            })
            .addCase(findSvByMhEntitiesAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    entities: action.payload.data,
                };
            })
            
            .addCase(getByIdStudentAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    entity: action.payload.data,
                };
            })
            .addMatcher(
                isPending(
                    searchSvxsEntitiesAsync,
                    findSvByMhEntitiesAsync,
                ),
                (state, action) => {
                    return {
                        ...state,
                        loading: true,
                    };
                }
            )
            .addMatcher(
                isRejected(
                    searchSvxsEntitiesAsync,
                    findSvByMhEntitiesAsync,
                ),
                (state, action) => {
                    return {
                        ...state,
                        loading: false,
                    };
                }
            );
    },
});

export const { reset, changePageSearch, changeUpdateSuccess, changeCreateSuccess } = StudentSlice.actions;

export default StudentSlice.reducer;
