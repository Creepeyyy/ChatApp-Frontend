import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userManagementService from "./userManagementService";

export const getUser = createAsyncThunk('getUser', async (token, thunkAPI) => {
    try {
        return await userManagementService.getUser(token);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteUser = createAsyncThunk('deleteUser', async (data, thunkAPI) => {
    try {
        return await userManagementService.deleteUser(data.token, data.userID);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const userManagementSlice = createSlice({
    name: "userManagement",
    initialState: {
        user: [],
        isError: false,
        isSuccess: false,
        isPending: false,
        message: '',
    },
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isPending = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.isPending = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isPending = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isPending = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.isPending = true;
            })
    },
});


export const { reset } = userManagementSlice.actions;

export default userManagementSlice.reducer;