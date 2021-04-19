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
  StatusBar,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import IntroScreen from "./screens/Intro";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";

import { AuthContext } from "./Context";

import HomeTab from "./HomeTab";

import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CommerceScreen from "./screens/Commerce/";
import CategoriaScreen from "./screens/Categoria/";

const NestedStack = createStackNavigator();

const IntroStack = () => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <NestedStack.Screen name="Login" component={LoginScreen} />
      <NestedStack.Screen name="Register" component={RegisterScreen} />
    </NestedStack.Navigator>
  );
};

const RootStack = createStackNavigator();

const App = () => {
  const [userData, setUserData] = React.useState({});
  const [userNome, setUserNome] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userTipo, setUserTipo] = React.useState("");
  const [loading, setLoading] = React.useState(true);

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

  const getData = async () => {
    try {
      await AsyncStorage.getItem("@token").then((valueData) => {
        var t = valueData.split('"').join("");

        var d = jwt_decode(t);
        setUserData(d);

        var n = d.nome.split('"').join("");
        setUserNome(n);

        var e = d.email.split('"').join("");
        setUserEmail(e);

        var t = d.tipo.split('"').join("");
        setUserTipo(t);
      });
    } catch (e) {
      // error reading value
    }
  };

  const Loading = () => {
    return (
      <View style={{ height: "100%", width: "100%", backgroundColor: "#333", justifyContent: "center", alignItems: "center"}}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Entrega +</Text>
      </View>
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    getToken();
    getData();
  }, []);

  const [isAuth, setIsAuth] = React.useState(null);

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}
      />
      {loading ? (
        <Loading />
      ) : (
        <NavigationContainer>
          <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <RootStack.Navigator>
              {isAuth ? (
                <>
                  <RootStack.Screen
                    name="Home"
                    component={HomeTab}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Commerce"
                    component={CommerceScreen}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Categoria"
                    component={CategoriaScreen}
                    options={{ headerShown: false }}
                  />
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
      )}
    </>
  );
};

export default App;
