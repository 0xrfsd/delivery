import React from "react";

import { View, Text, TextInput, TouchableOpacity, Picker } from "react-native";

import { AuthContext } from "../../Context";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import storeToken from "../../storeToken";

const RegisterScreen = () => {
  <storeToken />;

  const { isAuth, setIsAuth } = React.useContext(AuthContext);

  const [emailReq, setEmailReq] = React.useState(""); // email hook
  const [nomeReq, setNomeReq] = React.useState(""); // nome hook
  const [senhaReq, setSenhaReq] = React.useState(""); // senha hook
  const [error, setError] = React.useState("");
  const [tipoReq, setTipoReq] = React.useState("consumer");

  const nameTextInput = React.createRef();
  const emailTextInput = React.createRef();
  const passwordTextInput = React.createRef();

  const register = async () => {

    await axios
      .post("http://192.168.1.104:3000/register", {
        nome: nomeReq,
        email: emailReq,
        senha: senhaReq,
        tipo: tipoReq,
      })
      .then(async (response) => {
        if (response.status == 200) {
          if (response.data.data) {
            await storeToken(response.data.data);
            setIsAuth(true);
          } else {
            setError(response.data.error);
          }
        }
      });
  };

  return (
    <View style={{ flex: 1, width: "100%", height: "100%", display: "flex" }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TextInput
          autoCompleteType={"name"}
          autoCorrect={false}
          ref={nameTextInput}
          type="email"
          style={{
            fontSize: 18,
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
          style={{
            fontSize: 18,
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
          secureTextEntry={true}
          style={{
            width: "90%",
            fontSize: 18,
            margin: "5%",
            borderRadius: 10,
            color: "#333",
          }}
          placeholder="Senha"
          onChangeText={(senha) => {
            setSenhaReq(senha);
          }}
        />
        {error ? <Text>{error}</Text> : null}
        <TouchableOpacity
          style={{
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "2%",
            borderRadius: 10,
            color: "#333",
          }}
          onPress={register}
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
              Registrar agora
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
          onPress={register}
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
              Registrar com Google
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
          onPress={register}
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
            Registrar com Facebook
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default RegisterScreen;
