import { CredentialsType, UserDataType } from '@/utils/types';
import apiClient from './api';
import { UserStore } from '@/stores/userStore';


const authService = {
  async login(credentials: CredentialsType, store: UserStore) {
    try {
      const response = await apiClient.post('/api/token/', credentials);
      const userResponse = await apiClient.get<UserDataType>('/api/users/me/', {
        headers: {
          'Authorization': `Bearer ${response.data.access}`
        }
      });

      localStorage.setItem('access_token', response.data.access);
      console.log('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      store.setAuthentication(true)
      store.setUser(userResponse.data)
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await apiClient.post('/api/token/refresh/', { refresh: refreshToken });
      localStorage.setItem('access_token', response.data.access);
      return response.data;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  },

  async signup(credentials: CredentialsType) {
    try {
      const response = await apiClient.post('/api/signup/', credentials);
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
 },
  //  async logout() {
  //   try {
//        localStorage.removeItem('access_token');
//        localStorage.removeItem('refresh_token');
//        localStorage.removeItem('user_data');
//        store.isAuthenticated = false;
//        store.user = null;
//    } catch (error) {
//        console.error('Logout failed:', error);
//        throw error;
//    }
//  },

  // async logout() {
  //   try {
  //     store.dispatch('logout');
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //     throw error;
  //   }
  // },

  // async isAuthenticated() {
  //   console.log(store.state.isAuthenticated);
  //   return store.state.isAuthenticated;
    
  // },
};

export default authService;
