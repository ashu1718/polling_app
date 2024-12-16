import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/surveys/', // Your API base URL
});

// Function to refresh the access token using the refresh token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refreshToken,
    });
    const { access, refresh } = response.data;

    // Store the new access and refresh tokens in localStorage
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh || refreshToken); // New refresh token, if returned

    return access; // Return the new access token
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null; // Return null if the refresh fails (user should log in again)
  }
};

// Add Axios request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const decoded = token ? jwtDecode(token) : null;

    // If the access token is expired
    if (decoded && decoded.exp < Date.now() / 1000) {
      // Try refreshing the token
      const newAccessToken = await refreshAccessToken();
      
      if (newAccessToken) {
        // If the token was refreshed successfully, attach the new token to the request
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log('token refreshed successfully');
      } else {
        // If the refresh token also failed, redirect to login
        window.location.href = '/login'; // Or show a modal, etc.
        return Promise.reject('Token refresh failed');
      }
    } else {
      // Attach the current access token if it's not expired
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
