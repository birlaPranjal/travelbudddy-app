import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './components/_layout';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import FindPeopleScreen from './screens/FindPeopleScreen';
import ItinerariesScreen from './screens/ItinerariesScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
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