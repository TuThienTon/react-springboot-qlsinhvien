import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createKetqua, deleteKetqua, filterKetqua, getByIdKetqua, updateKetqua } from "../../../shared/api/ketqua.api";
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

export const emptyKetquaUntitiesAsync = createAsyncThunk(
    "ketqua/empty",
    async (data: any) => {
        const res = "";
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const searchKetquaEntitiesAsync = createAsyncThunk("ketqua/search", async (data: any) => {
    const res = await filterKetqua(data);
    return res;
});

export const createKetquaAsync = createAsyncThunk(
    "ketqua/create",
    async (data: any) => {
        const res = await createKetqua(data);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const updateKetquaAsync = createAsyncThunk(
    "ketqua/update",
    async (data: any) => {
        const res = await updateKetqua(data);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const getByIdKetquaAsync = createAsyncThunk(
    "ketqua/get-by-id",
    async (id: any) => {
        const res = await getByIdKetqua(id);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);
export const deleteKetquaEntitiesAsync = createAsyncThunk("ketqua/delete", async (id: any) => {
    const res = await deleteKetqua(id);
    return res;
});

const KetquaSlice = createSlice({
    name: "Ketqua",
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
            .addCase(emptyKetquaUntitiesAsync.fulfilled, (state) => {
                return {
                    ...state,
                    entities: null,
                    loading: false,
                };
            })
            .addCase(searchKetquaEntitiesAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    entities: action.payload.data,
                    // totalCount: parseInt(action.payload.headers[TOTAL_HEADER])
                };
            })
            .addCase(updateKetquaAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    updateSuccess: true,
                };
            })
            .addCase(createKetquaAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    createSuccess: true,
                };
            })
            .addCase(getByIdKetquaAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    entity: action.payload.data,
                };
            })
            .addMatcher(
                isPending(
                    emptyKetquaUntitiesAsync,
                    searchKetquaEntitiesAsync,
                    createKetquaAsync,
                    updateKetquaAsync,
                    updateKetquaAsync
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
                    emptyKetquaUntitiesAsync,
                    searchKetquaEntitiesAsync,
                    createKetquaAsync,
                    updateKetquaAsync,
                    updateKetquaAsync
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

export const { reset, changePageSearch, changeUpdateSuccess, changeCreateSuccess } = KetquaSlice.actions;

export default KetquaSlice.reducer;
