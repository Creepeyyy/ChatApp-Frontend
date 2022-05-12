import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authenticationSlice";
import userCreationReducer from "../features/userCreationSlice";
import userManagementReducer from "../features/userManagementSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        userManagement: userManagementReducer,
        userCreation: userCreationReducer,
    },
});