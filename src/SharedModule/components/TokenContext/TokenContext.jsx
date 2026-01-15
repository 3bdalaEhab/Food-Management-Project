import axios from 'axios';
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export let tokenContext = createContext(null);

export default function TokenContextProvider({ children }) {
  const [Token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(false);

  async function collLogin(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Login',
        values
      );
      setToken(data.token);
      localStorage.setItem('token', data.token);
      toast.success('Successfully logged in!', { duration: 2000 });
    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.", { duration: 800 });
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setToken(null);
    localStorage.removeItem('token');
  }

  return (
    <tokenContext.Provider value={{ collLogin, Token, setToken, isLoading, logout }}>
      {children}
    </tokenContext.Provider>
  );
}
