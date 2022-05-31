import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import userManagementReducer from "../features/userManagement/userManagementSlice";
import forumManagementReducer from "../features/forumManagement/forumManagementSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        userManagement: userManagementReducer,
        forumManagement: forumManagementReducer,
    },
});