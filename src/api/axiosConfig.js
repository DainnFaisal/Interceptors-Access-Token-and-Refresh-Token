import axios from 'axios';

// Creating axios instance with the base URL for your API
const axiosInstance = axios.create({
    baseURL: 'https://api.storerestapi.com/auth', 
});

// Request interceptor to add the auth token 
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;  // Adding Authorization header
        }
        return config;
    },
    (error) => Promise.reject(error) 
);

// handling expired tokens and refresh tokens
axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        // If the token is expired and I haven't retrieved yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 

            try {

                // refresh-token
                const refreshResponse = await axios.post(
                    'https://api.storerestapi.com/auth/refresh',
                    
                );

                if (refreshResponse.status === 200) { 
                    const { token } = refreshResponse.data;

                    localStorage.setItem('token', token); 
                    originalRequest.headers.Authorization = `Bearer ${token}`;  // Updating the Authorization header

                    return axiosInstance(originalRequest); 
                }
                
            } catch (refreshError) {
                console.error("Token refresh failed", refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 
