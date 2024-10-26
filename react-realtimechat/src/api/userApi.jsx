import axios from './axios';

const END_POINT = {
    REGISTER: "User/register",
    LOGIN: "User/login",
    LOGOUT: "User/logout",
    VERIFIED: "User/verified-token",
    MYPROFILE: "User/my-profile",
    PROFILE: "User/friend-profile",
    UPDATE_PROFILE: "User/my-profile/update",
    ACCOUNT: "User/account",
    UPDATE_ACCOUNT: "User/account/update",
    CREATE_TRIAL: "User/create-trial",
    CREATE_PRO: "User/create-pro",
    GAME_CENTER: "User/game-center",

    GETALL_USERS: "User/user-list"

};

const registerAPI = (user) => {
    return axios.post(`${END_POINT.REGISTER}`, user);
}
const loginAPI = (user) => {
    return axios.post(`${END_POINT.LOGIN}`, user);
}
const logoutAPI = () => {
    return axios.get(`${END_POINT.LOGOUT}`);
}

const verifiedAPI = () => {
    return axios.get(`${END_POINT.VERIFIED}`);
}

const myProfileAPI = () => {
    return axios.get(`${END_POINT.MYPROFILE}`);
}
const friendProfileAPI = (userId) => {
    return axios.get(`${END_POINT.PROFILE}/${userId}`);
}

const updateProfileAPI = (data) => {
    return axios.put(`${END_POINT.UPDATE_PROFILE}`, data);
}
const getAccountAPI = () => {
    return axios.get(`${END_POINT.ACCOUNT}`);

}
const updateAccountAPI = (data) => {
    return axios.put(`${END_POINT.UPDATE_ACCOUNT}`, data);

}

const createTrialAPI = () => {
    return axios.get(`${END_POINT.CREATE_TRIAL}`);

}
const createProAPI = () => {

}
const verifiedGameCenterAPI = () => {
    return axios.get(`${END_POINT.GAME_CENTER}`);
}
const getAllUsersAPI = () => {
    return axios.get(`${END_POINT.GETALL_USERS}`);

}


export {
    registerAPI, loginAPI, logoutAPI, verifiedAPI, myProfileAPI, friendProfileAPI, updateProfileAPI,
    createTrialAPI, createProAPI, verifiedGameCenterAPI, getAccountAPI, updateAccountAPI,
    getAllUsersAPI
};