import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  withCredentials: false, // This is the default
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// SSR-safe localStorage access
const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
};

const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh_token');
};

const setAccessToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', token);
};

const removeTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Request interceptor to add token to headers
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && getRefreshToken()) {
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          return Promise.reject(error);
        }
        const response = await apiClient.post('/token/refresh/', { refresh: refreshToken });
        setAccessToken(response.data.access);
        error.config.headers['Authorization'] = `Bearer ${response.data.access}`;
        return apiClient.request(error.config); // Retry the failed request
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (refreshError) {
        removeTokens();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;