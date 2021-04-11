import * as React from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
  Pressable,
  StatusBar
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import IntroScreen from './screens/Intro';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';

import { AuthContext } from "./Context";

import HomeTab from './HomeTab';

import AsyncStorage from "@react-native-async-storage/async-storage";

const NestedStack = createStackNavigator();

const IntroStack = () => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
      <NestedStack.Screen name="Login" component={LoginScreen} />
      <NestedStack.Screen name="Register" component={RegisterScreen} />
    </NestedStack.Navigator>
  );
};

const RootStack = createStackNavigator();

const App = () => {
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        setIsAuth(true);
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    // setTimeout(() => {
    //   setIsLoading(!isLoading)
    // }, 1000)
    getToken();
  }, []);

  const [isAuth, setIsAuth] = React.useState(null);

  return (
    <>
    <StatusBar barStyle={"dark-content"} />
    <NavigationContainer>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <RootStack.Navigator>
          {isAuth ? (
            <>
            <RootStack.Screen name="Home" component={HomeTab} options={{ headerShown: false }}/>
            </>
          ) : (
            <RootStack.Screen
              name="Intro"
              component={IntroStack}
              options={{ headerShown: false }}
            />
          )}
        </RootStack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
    </>
  );
};

export default App;
