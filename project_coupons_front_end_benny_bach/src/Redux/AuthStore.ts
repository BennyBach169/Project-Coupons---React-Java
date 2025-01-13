import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { ClientType } from "../models/ClientType";
import { showSuccessToast } from "../Components/ToastNotifications";

interface AuthState{
    userName: string;
    clientType: string;
    token: string;
}

interface JwtUser{
    userName:string
    clientType: string;
}

const initState = {
    clientType: sessionStorage.getItem("token")? jwtDecode<JwtUser>(sessionStorage.getItem("token")!).clientType:"",
    userName: sessionStorage.getItem("token")? jwtDecode<JwtUser>(sessionStorage.getItem("token")!).userName:"",
    token: sessionStorage.getItem("token") || ""
}

export const authSlice = createSlice({
    name:"authSlice",
    initialState:initState,
    reducers:{
        login: (state: AuthState, action: PayloadAction<string>) => {
            state.token = action.payload;
            const decodedToken: JwtUser = jwtDecode<JwtUser>(sessionStorage.getItem("token")!);
            state.clientType = decodedToken.clientType;
            state.userName = decodedToken.userName;
        },
        logOut: (state: AuthState) =>{
            state.token = "";
            state.userName = "";
            state.clientType ="";
            sessionStorage.removeItem("token");
        }
    }
});

export const {login,logOut} = authSlice.actions;
export const authStore = configureStore({
    reducer:authSlice.reducer
})
