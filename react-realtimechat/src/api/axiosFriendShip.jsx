import axios from 'axios';

// Hàm tiện ích để lấy token từ localStorage
const getToken = () => {
    return localStorage.getItem("token"); // Có thể thay bằng sessionStorage nếu cần
};

// Tạo một instance của Axios với URL gốc của API
const instance = axios.create({
    baseURL: "https://localhost:7231/api", // Địa chỉ API gốc
});

// Thêm interceptor để tự động thêm Authorization header vào mỗi request
instance.interceptors.request.use(
    (config) => {
        const token = getToken(); // Lấy token từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header Authorization
        }
        return config;
    },
    (error) => Promise.reject(error) // Xử lý lỗi nếu có trong quá trình thêm header
);

export default instance;
