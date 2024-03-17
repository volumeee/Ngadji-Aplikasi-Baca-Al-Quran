import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import useAuth from '../hooks/useAuth';
import tw from '../utils/tailwind';
import {
  IconBahasa,
  IconHome,
  IconSearch,
  IconUser,
} from '../components/customIcons';
import {TouchableOpacity} from 'react-native';
import LanguageScreen from '../screens/LanguageScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useNavigation} from '@react-navigation/native';
import QuranListScreen from '../screens/QuranListScreen';
import SplashScreen from '../screens/SplashScreen';
import QuranDetailScreen from '../screens/QuranDetailScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...tw`rounded-t-7 absolute bg-bgbottom h-17 p-5 justify-center items-center flex-1`,
        },
      }}>
      <BottomTab.Screen
        name="BottomTabHome"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarButton: ({}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BottomTabHome')}
              style={tw`mx-7.6`}>
              <IconHome />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          headerShown: false,
          tabBarButton: ({}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Language')}
              style={tw`mx-7.6`}>
              <IconBahasa />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarButton: ({}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              style={tw`mx-7.6`}>
              <IconSearch />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarButton: ({}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={tw`mx-7.6`}>
              <IconUser />
            </TouchableOpacity>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const StackNavigator = () => {
  const {user} = useAuth();

  if (user) {
    return (
      <Stack.Navigator initialRouteName="StackNavigatorHome">
        <Stack.Screen
          name="StackNavigatorHome"
          component={BottomTabNavigator}
          options={{headerShown: false}}
          screenOptions={{
            animation: 'slide_from_left',
            animationDuration: 1000,
          }}
        />
        <Stack.Screen
          name="QuranList"
          component={QuranListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuranDetail"
          component={QuranDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          animation: 'slide_from_left',
          animationDuration: 2000,
        }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
};

export default StackNavigator;
