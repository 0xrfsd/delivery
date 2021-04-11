import React from "react";
import axios from "axios";

import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { AuthContext } from "../../Context";
import storeToken from "../../storeToken";

import * as Google from 'expo-google-app-auth';

const IOS_CLIENT_ID = "your-ios-client-id";
const ANDROID_CLIENT_ID = "your-android-client-id";


const Google = () => {

  const signInWithGoogle = async ({ navigation }) => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        success: ["profile", "email"]
      });
  
      if (result.type === "success") {
        console.log('Login', result.user.givenName);
        await setIsAuth(true);
        navigation.navigate('Profile', {
          username: result.user.givenName
        }); // after Google login redirect to Profile
        return result.acessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('Login', e);
      return {error: true};
    }
  } 

  return (
    <>
    <View>
      <TouchableOpacity onPress={() => signInWithGoogle } style={{ height: 50, width: 200, backgroundColor: '#333' }}>
        <Text>Login with Google</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const LoginScreen = () => {
  <storeToken />;

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
    <View style={{ flex: 1, width: "100%", height: "100%", display: "flex" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          marginBottom: "auto",
        }}
      >
        <TextInput
          ref={usernameTextInput}
          autoCorrect={false}
          autoCompleteType={"email"}
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
          secureTextEntry={true}
          style={{
            width: "90%",
            margin: "5%",
            borderRadius: 10,
            color: "#333",
          }}
          placeholder="Senha"
          onChangeText={(senha) => setSenha(senha)}
        />
        {error ? <Text>{error}</Text> : null}
        <TouchableOpacity
          style={{
            width: "90%",
            margin: "5%",
            borderRadius: 10,
            color: "#333",
          }}
          onPress={login}
        >
          <View
            style={{
              backgroundColor: "#333",
              widht: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              margin: "0%",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              Entrar agora
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
