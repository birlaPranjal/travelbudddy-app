import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from '@/app/components/AuthLayout';
import SignInScreen from './(auth)/signin';
import HomeScreen from '@/app/(app)/index';
import ProfileScreen from '@/app/(app)/profile';
import FindPeopleScreen from '@/app/(app)/find-people';
import ItinerariesScreen from '@/app/(app)/itineraries';
import ResetPasswordScreen from '@/app/(auth)/reset-password';
import VerifyEmailScreen from '@/app/(auth)/verify-email';
import { RootStackParamList, RootDrawerParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="FindPeople" component={FindPeopleScreen} />
      <Stack.Screen name="Itineraries" component={ItinerariesScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthLayout>
          <MainStack />
        </AuthLayout>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;