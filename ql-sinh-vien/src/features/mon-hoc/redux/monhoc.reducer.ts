import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createMonhoc, deleteMonhoc, filterMonhoc, updateMonhoc } from "../../../shared/api/monhoc.api";

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

export const emptyMonhocUntitiesAsync = createAsyncThunk(
    "monhoc/empty",
    async (data: any) => {
        const res = "";
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const searchMonhocEntitiesAsync = createAsyncThunk("monhoc/filter", async (data: any) => {
    const res = await filterMonhoc(data);
    return res;
});

export const createMonhocAsync = createAsyncThunk(
    "monhoc/create",
    async (data: any) => {
        const res = await createMonhoc(data);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const updateMonhocAsync = createAsyncThunk(
    "monhoc/update",
    async (data: any) => {
        const res = await updateMonhoc(data);
        return res;
    },
    {
        // serializeError: serializeAxiosError,
    }
);

export const deleteMonhocEntitiesAsync = createAsyncThunk("monhoc/delete", async (id: any) => {
    const res = await deleteMonhoc(id);
    return res;
});

const MonhocSlice = createSlice({
    name: "Monhoc",
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
            .addCase(emptyMonhocUntitiesAsync.fulfilled, (state) => {
                return {
                    ...state,
                    entities: null,
                    loading: false,
                };
            })
            .addCase(searchMonhocEntitiesAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    entities: action.payload.data,
                    // totalCount: parseInt(action.payload.headers[TOTAL_HEADER])
                };
            })
            .addCase(updateMonhocAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    updateSuccess: true,
                };
            })
            .addCase(createMonhocAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    createSuccess: true,
                };
            })
            .addMatcher(
                isPending(
                    emptyMonhocUntitiesAsync,
                    searchMonhocEntitiesAsync,
                    createMonhocAsync,
                    updateMonhocAsync,
                    updateMonhocAsync
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
                    emptyMonhocUntitiesAsync,
                    searchMonhocEntitiesAsync,
                    createMonhocAsync,
                    updateMonhocAsync,
                    updateMonhocAsync
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

export const { reset, changePageSearch, changeUpdateSuccess, changeCreateSuccess } = MonhocSlice.actions;

export default MonhocSlice.reducer;
