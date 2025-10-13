import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/+shared/stores/useAuthStore';
import { fetcher } from '@/+shared/libs/fetch';
import { User, useUserStore } from '@/auth/apis/auth';

// API 응답 타입
interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    participant: {
      id: string;
      email: string;
      role: string;
      participantId: string;
    };
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const { login: setAuthToken } = useAuthStore();
  const { setUser } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetcher<LoginResponse>({
        url: '/auth/participant/login',
        method: 'post',
        body: { email, password },
      });

      if (response.resultCode === 200 && response.result?.success) {
        const { accessToken, refreshToken } = response.result.data;
        
        localStorage.setItem('refreshToken', refreshToken);
        setAuthToken(accessToken);

        try {
          const userData = await fetcher<User>({
            url: '/auth/me',
            method: 'get',
          });

          if (userData.resultCode === 200 && userData.result) {
            const user = userData.result;
            setUser(user);
          }
        } catch (err) {
          setError('Failed to get user data.');
        }
        
        navigate('/dashboard');
      } else {
        setError('Failed to login. Please check your email and password.');
      }
    } catch (err) {
      setError('Failed to login. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    error,
    isLoading,
    handleSubmit,
  };
}