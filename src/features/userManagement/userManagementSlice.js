import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
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

export const userManagementSlice = createSlice({
    name: "userManagement",
    initialState: {
        user: [],
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
            .addCase(getUser.rejected, (state, action) => {
                state.isGetPending = false;
                state.isGetSuccess = false;
                state.isGetError = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isGetPending = false;
                state.isGetSuccess = true;
                state.isGetError = false;
                state.user = action.payload;
            })
            .addCase(isAnyOf(getUser.pending), (state, action) => {
                state.isGetPending = true;
            })
            .addMatcher(isAnyOf(createUser.pending, updateUser.pending, deleteUser.pending), (state,action) => {
                state.isPending = true;
            })
            .addMatcher(isAnyOf(createUser.fulfilled, updateUser.fulfilled, deleteUser.fulfilled), (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addMatcher(isAnyOf(createUser.rejected, updateUser.rejected, deleteUser.rejected), (state, action) => {
                state.isPending = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
    },
});


export const { reset, resetGet } = userManagementSlice.actions;

export default userManagementSlice.reducer;