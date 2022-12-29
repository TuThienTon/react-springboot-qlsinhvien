import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createStudent, deleteStudent, filterStudent, getByIdStudent, updateStudent } from "../../../shared/api/student.api";
// import { createUser, filterUser, getByIdUser, updateUser } from "../../../shared/apis/user.api";
// import { serializeAxiosError } from "../../../shared/utils/reducer.utils";

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

export const emptyStudentUntitiesAsync = createAsyncThunk(
    "student/empty",
    async (data: any) => {
        const res = "";
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const searchStudentEntitiesAsync = createAsyncThunk("student/search", async (data: any) => {
    const res = await filterStudent(data);
    return res;
});

export const createStudentAsync = createAsyncThunk(
    "student/create",
    async (data: any) => {
        const res = await createStudent(data);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const updateStudentAsync = createAsyncThunk(
    "student/update",
    async (data: any) => {
        const res = await updateStudent(data);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const getByIdStudentAsync = createAsyncThunk(
    "student/get-by-id",
    async (id: any) => {
        const res = await getByIdStudent(id);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);
export const deleteStudentEntitiesAsync = createAsyncThunk("student/delete", async (id: any) => {
    const res = await deleteStudent(id);
    return res;
});

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
            .addCase(emptyStudentUntitiesAsync.fulfilled, (state) => {
                return {
                    ...state,
                    entities: null,
                    loading: false,
                };
            })
            .addCase(searchStudentEntitiesAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    entities: action.payload.data,
                    // totalCount: parseInt(action.payload.headers[TOTAL_HEADER])
                };
            })
            .addCase(updateStudentAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    updateSuccess: true,
                };
            })
            .addCase(createStudentAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    createSuccess: true,
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
                    emptyStudentUntitiesAsync,
                    searchStudentEntitiesAsync,
                    createStudentAsync,
                    updateStudentAsync,
                    updateStudentAsync
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
                    emptyStudentUntitiesAsync,
                    searchStudentEntitiesAsync,
                    createStudentAsync,
                    updateStudentAsync,
                    updateStudentAsync
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
