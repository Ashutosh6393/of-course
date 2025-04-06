
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAIL = "admin@example.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login - in a real app, this would call an API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const newUser = {
            id: Math.random().toString(36).substring(2),
            email,
            name: email.split('@')[0],
            isAdmin: email.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
          };
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          toast({ title: 'Login successful!', description: 'Welcome back!' });
          resolve(newUser);
        } else {
          toast({ 
            title: 'Login failed', 
            description: 'Invalid credentials', 
            variant: 'destructive' 
          });
          reject(new Error('Invalid credentials'));
        }
      }, 800); // Simulate network delay
    });
  };

  const signup = (email, password, name) => {
    // Simulate signup - in a real app, this would call an API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const newUser = {
            id: Math.random().toString(36).substring(2),
            email,
            name,
            isAdmin: email.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
          };
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          toast({ title: 'Sign up successful!', description: 'Your account has been created.' });
          resolve(newUser);
        } else {
          toast({ 
            title: 'Sign up failed', 
            description: 'Please fill all required fields', 
            variant: 'destructive' 
          });
          reject(new Error('Invalid input'));
        }
      }, 800); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({ title: 'Logged out', description: 'You have been logged out successfully.' });
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
