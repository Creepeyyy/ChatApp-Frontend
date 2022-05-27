import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import userManagementService from "./forumManagementService";

export const createForum = createAsyncThunk('createForum', async (data, thunkAPI) => {
    try {
        return await userManagementService.createForum(data.token, data.forum);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateForum = createAsyncThunk('updateForum', async (data, thunkAPI) => {
    try {
        return await userManagementService.updateForum(data.token, data.forumID, data.updateData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const forumCreationSlice = createSlice({
    name: "forumCreation",
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
        .addMatcher(isAnyOf(createForum.pending, updateForum.pending), (state,action) => {
            state.isPending = true;
        })
        .addMatcher(isAnyOf(createForum.fulfilled, updateForum.fulfilled), (state, action) => {
            state.isPending = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload;
        })
        .addMatcher(isAnyOf(createForum.rejected, updateForum.rejected), (state, action) => {
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
    }
});

export const { reset } = forumCreationSlice.actions;
export default forumCreationSlice.reducer;