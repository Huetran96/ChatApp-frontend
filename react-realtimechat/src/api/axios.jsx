import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5065/api",

})
//const { auth } = useContext(AuthContext);
//const token = auth.token;

instance.interceptors.request.use(function (config) {

    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {

    let res = {}
    if (response) {
        res.message = response.data;
        res.statusCode = response.status;
    }
    return res;
}, function (error) {
    let res = {}
    if (error.response) {
        res.message = error.response.data;
        res.statusCode = error.response.status;
        res.headers = error.response.headers;


    } else if (error.request) {
        console.log(error.request);

    } else {
        console.log("Error: ", error.message);

    }
    return res;

}
)

export default instance;