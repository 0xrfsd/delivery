import React from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { AuthContext } from "../../Context";
import axios from "axios";

import storeToken from "../../storeToken";

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
          autoCompleteType="email"
          style={{
            fontSize: 18,
            width: "90%",
            margin: "5%",
            borderBottomColor: "#333",
            borderRadius: 10,
            color: "#333",
          }}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <TextInput
          ref={passwordTextInput}
          autoCompleteType="password"
          secureTextEntry={true}
          style={{
            fontSize: 18,
            width: "90%",
            margin: "5%",
            color: "#333",
          }}
          placeholder="Senha"
          onChangeText={(senha) => setSenha(senha)}
        />
        {error ? <Text>{error}</Text> : null}
        <TouchableOpacity
          style={{
            fontSize: 18,
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "2%",
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
        <TouchableOpacity
          style={{
            fontSize: 18,
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: 10,
            borderRadius: 10,
            color: "#333",
          }}
          onPress={login}
        >
          <View
            style={{
              backgroundColor: "#fff",
              widht: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              margin: "0%",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#333" }}>
              Entrar com Google
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            fontSize: 18,
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: 10,
            borderRadius: 10,
            color: "#333",
          }}
          onPress={login}
        >
          <View
            style={{
              backgroundColor: "#4267B2",
              widht: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              margin: "0%",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              Entrar com Facebook
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default LoginScreen;
