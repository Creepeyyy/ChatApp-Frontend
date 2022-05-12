import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userManagementService from "./userManagementService";

export const createUser = createAsyncThunk('createUser', async (data, thunkAPI) => {
    try {
        return await userManagementService.createUser(data.token, data.user);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const userCreationSlice = createSlice({
    name: "userCreation",
    initialState: {
        user: '',
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
        .addCase(createUser.pending, (state, action) => {
            state.isPending = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.isPending = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload;
        })
        .addCase(createUser.rejected, (state, action) => {
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
    }
});

export const { reset } = userCreationSlice.actions;
export default userCreationSlice.reducer;