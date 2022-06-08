import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import accountManagementService from "./accountManagementService";

export const getAccount = createAsyncThunk('getAccount', async (data, thunkAPI) => {
    try {
        return await accountManagementService.getAccount(data.token, data.userID);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteAccount = createAsyncThunk('deleteAccount', async (data, thunkAPI) => {
    try {
        return await accountManagementService.deleteAccount(data.token, data.userID);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateAccount = createAsyncThunk('updateAccount', async (data, thunkAPI) => {
    try {
        return await accountManagementService.updateAccount(data.token, data.userID, data.updateData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const accountManagementSlice = createSlice({
    name: "accountManagement",
    initialState: {
        account: {},
        isPending: false,
        isSuccess: false,
        isError: false,
        isGetError: false,
        isGetSuccess: false,
        isGetPending: false,
        message: '',
    },
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isPending = false;
            state.message = '';
        },
        resetGet: (state) => {
            state.isGetError = false;
            state.isGetSuccess = false;
            state.isGetPending = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccount.rejected, (state, action) => {
                state.isGetPending = false;
                state.isGetSuccess = false;
                state.isGetError = true;
            })
            .addCase(getAccount.fulfilled, (state, action) => {
                state.isGetPending = false;
                state.isGetSuccess = true;
                state.isGetError = false;
                state.account = action.payload;
            })

            .addCase(getAccount.pending, (state, action) => {
                state.isGetPending = true;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                state.account = action.payload;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addMatcher(isAnyOf(updateAccount.pending, deleteAccount.pending), (state, action) => {
                state.isPending = true;
            })
            .addMatcher(isAnyOf(updateAccount.rejected, deleteAccount.rejected), (state, action) => {
                state.isPending = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
    },
});


export const { reset, resetGet } = accountManagementSlice.actions;

export default accountManagementSlice.reducer;