import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type User = {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
};

type AuthContextType = {
  user: User | null;
  signIn: (emailOrProvider: string | 'google' | 'github', password?: string) => Promise<{user?: User, error?: string} | void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate checking auth state
        // In a real app, you would check AsyncStorage or make an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // setUser({ id: '1', name: 'Test User', email: 'test@example.com', isVerified: true });
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (emailOrProvider: string | 'google' | 'github', password?: string) => {
    try {
      setLoading(true);
      
      if (typeof emailOrProvider === 'string' && password) {
        // Email/password login
        const response = await fetch('https://travelbudyy.vercel.app/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailOrProvider, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          return { error: data.message || 'Invalid email or password' };
        }

        setUser(data.user);
        return { user: data.user };
      } else if (emailOrProvider === 'google' || emailOrProvider === 'github') {
        // OAuth login
        // In a real app, you would use Expo AuthSession or similar
        Alert.alert('OAuth Login', `This would normally open ${emailOrProvider} login`);
        return { error: 'OAuth not implemented' };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Simulate sign out
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};