import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import userManagementService from "./forumManagementService";

export const getForums = createAsyncThunk('getForums', async (thunkAPI) => {
    try {
        return await userManagementService.getForums();
    } catch (e) {
        console.log(e);
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
            .addMatcher(isAnyOf(getForums.pending), (state, action) => {
                state.isPending = true;
            })
            .addMatcher(isAnyOf(getForums.fulfilled), (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                state.forums = action.payload;
            })
            .addMatcher(isAnyOf(getForums.rejected), (state, action) => {
                state.isPending = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
    },
});


export const { reset } = forumManagementSlice.actions;

export default forumManagementSlice.reducer;