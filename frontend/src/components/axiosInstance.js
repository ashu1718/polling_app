import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/surveys/', 
});


const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refreshToken,
    });
    const { access, refresh } = response.data;

    
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh || refreshToken); 

    return access; 
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};


axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const decoded = token ? jwtDecode(token) : null;

   
    if (decoded && decoded.exp < Date.now() / 1000) {
      
      const newAccessToken = await refreshAccessToken();
      
      if (newAccessToken) {
        
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log('token refreshed successfully');
      } else {
       
        window.location.href = '/login'; 
        return Promise.reject('Token refresh failed');
      }
    } else {
      
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log("Token not expired yet!");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
