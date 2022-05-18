import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import userManagementService from "./userManagementService";

export const createUser = createAsyncThunk('createUser', async (data, thunkAPI) => {
    try {
        return await userManagementService.createUser(data.token, data.user);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateUser = createAsyncThunk('updateUser', async (data, thunkAPI) => {
    try {
        return await userManagementService.updateUser(data.token, data.userID, data.updateData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const userCreationSlice = createSlice({
    name: "userCreation",
    initialState: {
        isError: false,
        isSuccess: false,
        isPending: false,
        message: ''
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
        .addMatcher(isAnyOf(createUser.pending, updateUser.pending), (state,action) => {
            state.isPending = true;
        })
        .addMatcher(isAnyOf(createUser.fulfilled, updateUser.fulfilled), (state, action) => {
            state.isPending = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload;
        })
        .addMatcher(isAnyOf(createUser.rejected, updateUser.rejected), (state, action) => {
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
    }
});

export const { reset } = userCreationSlice.actions;
export default userCreationSlice.reducer;