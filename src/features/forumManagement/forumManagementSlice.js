import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import Forum from "./forumManagementService";

export const getForums = createAsyncThunk('getForums', async (thunkAPI) => {
    try {
        return await Forum.getForums();
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteForum = createAsyncThunk('deleteForum', async (data, thunkAPI) => {
    try {
        return await Forum.deleteForum(data.token, data.forumID);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const createForum = createAsyncThunk('createForum', async (data, thunkAPI) => {
    try {
        return await Forum.createForum(data.token, data.forum);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateForum = createAsyncThunk('updateForum', async (data, thunkAPI) => {
    try {
        return await Forum.updateForum(data.token, data.forumID, data.updateData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const forumManagementSlice = createSlice({
    name: "forumManagement",
    initialState: {
        forums: [],
        isError: false,
        isSuccess: false,
        isPending: false,
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
        .addCase(getForums.rejected, (state, action) => {
            state.isGetPending = false;
            state.isGetSuccess = false;
            state.isGetError = true;
        })
        .addCase(getForums.fulfilled, (state, action) => {
            state.isGetPending = false;
            state.isGetSuccess = true;
            state.isGetError = false;
            state.forums = action.payload;
        })
        .addCase(isAnyOf(getForums.pending), (state, action) => {
            state.isGetPending = true;
        })
        .addMatcher(isAnyOf(createForum.pending, updateForum.pending, deleteForum.pending), (state,action) => {
            state.isPending = true;
        })
        .addMatcher(isAnyOf(createForum.fulfilled, updateForum.fulfilled, deleteForum.fulfilled), (state, action) => {
            state.isPending = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload;
        })
        .addMatcher(isAnyOf(createForum.rejected, updateForum.rejected, deleteForum.rejected), (state, action) => {
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
    },
});


export const { reset, resetGet } = forumManagementSlice.actions;

export default forumManagementSlice.reducer;