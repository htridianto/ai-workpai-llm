
import { UserProfile } from '../types';

// Mock user data to simulate a database response
const MOCK_USER: UserProfile = {
  id: 'u-admin',
  name: 'Admin User',
  email: 'admin@local.host',
  role: 'admin',
  status: 'active',
  avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=f97316&color=fff'
};

const storage_auth_name = 'anything_llm_auth';
const storage_token_name = 'auth_token';

export const AuthService = {
  login: async (email: string, password: string): Promise<{ user: UserProfile, token: string }> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Keep client-side storage logic for now
      document.cookie = `${storage_token_name}=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem(storage_auth_name, 'true');
      
      return {
          user: data.user,
          token: data.token
      };

    } catch (error: any) {
        throw new Error(error.message || 'Network error');
    }
  },

  loginWithGoogle: async (): Promise<{ user: UserProfile, token: string }> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';
      const response = await fetch(`${baseUrl}/login-google`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Google login failed');
      }

      document.cookie = `${storage_token_name}=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem(storage_auth_name, 'true');
      
      return {
          user: data.user,
          token: data.token
      };

    } catch (error: any) {
        throw new Error(error.message || 'Google login error');
    }
  },

  loginDemo: async (): Promise<{ user: UserProfile, token: string }> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';
      const response = await fetch(`${baseUrl}/login-demo`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Demo login failed');
      }

      document.cookie = `${storage_token_name}=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem(storage_auth_name, 'true');
      
      return {
          user: data.user,
          token: data.token
      };

    } catch (error: any) {
        throw new Error(error.message || 'Demo login error');
    }
  },

  logout: () => {
      document.cookie = `${storage_token_name}=; path=/; max-age=0; SameSite=Lax`;
      localStorage.removeItem(storage_auth_name);
      window.location.href = '/login';
  }
};
