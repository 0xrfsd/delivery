import * as React from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "./Context";

import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@token", jsonValue).then(() =>
      console.log("Token stored.")
    );
  } catch (e) {
    // saving error
  }
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const LoginScreen = () => {
  const { isAuth, setIsAuth } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState("");

  const usernameTextInput = React.createRef();
  const passwordTextInput = React.createRef();

  const login = async () => {
    await axios
      .post("http://192.168.1.104:3000/login", {
        email: email,
        senha: senha,
      })
      .then((response) => {
        if (response.status == 200) {
          if (response.data.status === "ok") {
            storeToken(response.data.data).then(() => setIsAuth(true));
          } else {
            setError(response.data.error);
          }
        }
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      {error ? <Text>{error}</Text> : null}
      <TextInput
        ref={usernameTextInput}
        autoCorrect={false}
        autoCompleteType={"email"}
        onBlur={Keyboard.dismiss}
        style={{
          width: "90%",
          margin: "5%",
          borderBottomColor: "#333",
          borderRadius: 10,
          color: "#333",
        }}
        placeholder="Email ou Telefone"
        autoCapitalize="none"
        onChangeText={(email) => {
          setEmail(email);
        }}
      />
      <TextInput
        ref={passwordTextInput}
        onBlur={Keyboard.dismiss}
        secureTextEntry={true}
        style={{ width: "90%", margin: "5%", borderRadius: 10, color: "#333" }}
        placeholder="Senha"
        onChangeText={(senha) => setSenha(senha)}
      />
      <TouchableOpacity
        style={{ width: "90%", margin: "5%", borderRadius: 10, color: "#333" }}
        onPress={login}
      >
        <Text style={{ fontWeight: "bold", color: "#fff" }}>Entrar agora</Text>
      </TouchableOpacity>
    </View>
  );
};

const RegisterScreen = () => {
  const { isAuth, setIsAuth } = React.useContext(AuthContext);

  const [emailReq, setEmailReq] = React.useState(""); // email hook
  const [nomeReq, setNomeReq] = React.useState(""); // nome hook
  const [senhaReq, setSenhaReq] = React.useState(""); // senha hook
  const [error, setError] = React.useState("");

  const nameTextInput = React.createRef();
  const emailTextInput = React.createRef();
  const passwordTextInput = React.createRef();

  const register = async () => {
    await axios
      .post("http://192.168.1.104:3000/register", {
        nome: nomeReq,
        email: emailReq,
        senha: senhaReq,
      })
      .then((response) => {
        if (response.status == 200) {
          if (response.data.data) {
            storeToken(response.data.data);
            setIsAuth(true);
          } else {
            setError(response.data.error);
          }
        }
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      {error ? <Text>{error}</Text> : null}
      <TextInput
        autoCompleteType={"name"}
        autoCorrect={false}
        ref={nameTextInput}
        onBlur={Keyboard.dismiss}
        style={{
          width: "90%",
          margin: "5%",
          borderBottomColor: "#333",
          borderRadius: 10,
          color: "#333",
        }}
        placeholder="Nome e Sobrenome"
        autoCapitalize="none"
        onChangeText={(name) => {
          setNomeReq(name);
        }}
      />
      <TextInput
        autoCompleteType={"email"}
        autoCorrect={false}
        ref={emailTextInput}
        onBlur={Keyboard.dismiss}
        style={{
          width: "90%",
          margin: "5%",
          borderBottomColor: "#333",
          borderRadius: 10,
          color: "#333",
        }}
        placeholder="Email ou Telefone"
        autoCapitalize="none"
        onChangeText={(email) => {
          setEmailReq(email);
        }}
      />
      <TextInput
        ref={passwordTextInput}
        onBlur={Keyboard.dismiss}
        secureTextEntry={true}
        style={{
          width: "90%",
          margin: "5%",
          borderRadius: 10,
          color: "#333",
        }}
        placeholder="Senha"
        onChangeText={(senha) => {
          setSenhaReq(senha);
        }}
      />
      <TouchableOpacity
        style={{ width: "90%", margin: "5%", borderRadius: 10, color: "#333" }}
        onPress={register}
      >
        <Text style={{ fontWeight: "bold", color: "#fff" }}>Entrar agora</Text>
      </TouchableOpacity>
    </View>
  );
};

const Intro = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text onPress={() => navigation.navigate("Login")}>Login</Text>
      <Text onPress={() => navigation.navigate("Register")}>Register</Text>
    </View>
  );
};

const NestedStack = createStackNavigator();

const IntroScreen = () => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="Intro" component={Intro} />
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
    <NavigationContainer>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <RootStack.Navigator>
          {isAuth ? (
            <RootStack.Screen name="Home" component={HomeScreen} />
          ) : (
            <RootStack.Screen
              name="Intro"
              component={IntroScreen}
              options={{ headerShown: false }}
            />
          )}
        </RootStack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;
