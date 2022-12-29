import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createKhoa, deleteKhoa, filterKhoa, updateKhoa } from "../../../shared/api/khoa.api";

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

export const emptyKhoaUntitiesAsync = createAsyncThunk(
    "khoa/empty",
    async (data: any) => {
        const res = "";
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const searchKhoaEntitiesAsync = createAsyncThunk("khoa/search", async (data: any) => {
    const res = await filterKhoa(data);
    return res;
});

export const createKhoaAsync = createAsyncThunk(
    "khoa/create",
    async (data: any) => {
        const res = await createKhoa(data);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const updateKhoaAsync = createAsyncThunk(
    "khoa/update",
    async (data: any) => {
        const res = await updateKhoa(data);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const deleteKhoaEntitiesAsync = createAsyncThunk("khoa/delete", async (id: any) => {
    const res = await deleteKhoa(id);
    return res;
});

const KhoaSlice = createSlice({
    name: "Khoa",
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
            .addCase(emptyKhoaUntitiesAsync.fulfilled, (state) => {
                return {
                    ...state,
                    entities: null,
                    loading: false,
                };
            })
            .addCase(searchKhoaEntitiesAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    entities: action.payload.data,
                    // totalCount: parseInt(action.payload.headers[TOTAL_HEADER])
                };
            })
            .addCase(updateKhoaAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    updateSuccess: true,
                };
            })
            .addCase(createKhoaAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    createSuccess: true,
                };
            })
            .addMatcher(
                isPending(emptyKhoaUntitiesAsync, searchKhoaEntitiesAsync, createKhoaAsync, updateKhoaAsync, updateKhoaAsync),
                (state, action) => {
                    return {
                        ...state,
                        loading: true,
                    };
                }
            )
            .addMatcher(
                isRejected(emptyKhoaUntitiesAsync, searchKhoaEntitiesAsync, createKhoaAsync, updateKhoaAsync, updateKhoaAsync),
                (state, action) => {
                    return {
                        ...state,
                        loading: false,
                    };
                }
            );
    },
});

export const { reset, changePageSearch, changeUpdateSuccess, changeCreateSuccess } = KhoaSlice.actions;

export default KhoaSlice.reducer;
