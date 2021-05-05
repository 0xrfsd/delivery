import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { Modalize } from "react-native-modalize";

import { AuthContext } from "../../Context";
import axios from "axios";

import storeToken from "../../storeToken";

import * as Google from "expo-google-app-auth";

import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export function LoginModal(props) {
  const modalMargin = Platform.OS === "ios" ? -15 : 20;
  const paymentMargin = Platform.OS === "ios" ? 0 : 10;
  const keyboardHeight = 190;

  const [opened, setOpened] = useState(false);

  const [keyboardAvoid, setKeyboardAvoid] = useState(false);

  const modalizeRef = useRef(<Modalize />);

  // Função executada apenas quando o componente for montado pela primeira vez
  useEffect(() => {
    let { setModal, modal, modalIndex } = props;

    modal[modalIndex] = {
      openModal: () => openModal(),
      closeModal: () => closeModal(),
    };

    setModal(modal);
  }, []);

  const handlerStateChange = (state) => {
    setOpened(state);
  };

  const openModal = () => {
    modalizeRef.current.open();
  };

  const closeModal = () => {
    modalizeRef.current.close();
  };

  const navigation = useNavigation();

  <storeToken />;

  const { isAuth, setIsAuth } = React.useContext(AuthContext);

  const [esqueceu, setEsqueceu] = React.useState(false);
  const [esqueceuEmail, setEsqueceuEmail] = React.useState("");
  const [esqueceuEnviado, setEsqueceuEnviado] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState("");

  const usernameTextInput = React.createRef();
  const emailTextInput = React.createRef();
  const passwordTextInput = React.createRef();

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "382490770664-2omdh7rb4jt6ch9346aluoho1po475ut.apps.googleusercontent.com",
        androidClientId:
          "382490770664-ls428icid88tjf5bimgbvpit3v1ocobm.apps.googleusercontent.com",
        success: ["profile", "email"],
      });
      if (result.type === "success") {
        await axios
          .post("http://192.168.1.104:3000/logingoogle", {
            id: result.user.id,
            email: result.user.email,
            photoUrl: result.user.photoUrl,
            nome: result.user.name,
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
        return result.acessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("Login", e);
      return { error: true };
    }
  };

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

  const renderHeader = useCallback(() => {
    return (
      <>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#333", fontSize: 20, fontWeight: "bold" }}>
            {esqueceu
              ? "É normal você esquecer sua senha não se preocupe!"
              : "Entre em sua conta e comece a pedir agora!"}
          </Text>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {esqueceu
              ? "Leva menos de dois minutos para você redefinir"
              : "Isso vai levar menos de um minuto"}
          </Text>
        </View>
      </>
    );
  }, [esqueceu]);

  const renderContent = useCallback(() => {
    return (
      <>
        {esqueceu ? (
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            {esqueceuEnviado ? (
              <View>
                <Text style={{ color: "#333", fontWeight: "bold" }}>
                  Enviamos um email com o link para você redefinir sua senha{" "}
                </Text>
                <Text style={{ color: "#333" }}>
                  Consulte sua caixa de entrada e de spam{" "}
                </Text>
                <View
                  style={{
                    paddingTop: 10,
                    widht: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check-bold"
                    size={45}
                    color="green"
                  />
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    width: "100%",
                    borderRadius: 10,
                    color: "#333",
                  }}
                  onPress={() => {
                    setEsqueceu(false);
                  }}
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
                    <Text style={{ color: "#fff" }}>
                      Redefiniu sua senha?
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        {" "}
                        Peça agora!
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={esqueceuEnviado ? true : false}
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    width: "100%",
                    borderRadius: 10,
                    color: "#333",
                  }}
                  onPress={() => {
                    setKeyboardAvoid(false);
                    setEsqueceuEnviado(true);
                  }}
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
                    <Text style={{ color: "#333" }}>
                      Enviar email de recuperação
                      <Text style={{ fontWeight: "bold", color: "#333" }}>
                        {" "}
                        {esqueceuEnviado ? 60 : null}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {email ? (
                  <Text style={{ color: "#333", fontWeight: "bold" }}>
                    {email}
                  </Text>
                ) : (
                  <Text style={{ color: "#333", fontWeight: "bold" }}>
                    Qual é o seu email?
                  </Text>
                )}
                <Text style={{ color: "#333" }}>
                  Iremos enviar um email com o link para você redefinir sua
                  senha
                </Text>
                {email ? null : (
                  <TextInput
                    onFocus={() => {
                      setKeyboardAvoid(true);
                    }}
                    onBlur={() => {
                      setKeyboardAvoid(false);
                    }}
                    keyboardType="email-address"
                    ref={emailTextInput}
                    autoCorrect={false}
                    style={{
                      fontSize: 18,
                      width: "90%",
                      marginTop: "5%",
                      marginBottom: "5%",
                      borderBottomColor: "#333",
                      borderRadius: 10,
                      color: "#333",
                    }}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(email) => {
                      setEsqueceuEmail(email);
                      setError("");
                    }}
                  />
                )}
                {error.length > 1 ? (
                  <Text style={{ color: "red" }}>{error}</Text>
                ) : null}
                <TouchableOpacity
                  disabled={esqueceuEnviado ? true : false}
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    width: "100%",
                    borderRadius: 10,
                    color: "#333",
                  }}
                  onPress={() => {
                    setKeyboardAvoid(false);
                    // validar no server se email existe
                    setEsqueceuEnviado(true);
                    setError("");
                    // setError("Insira um email inválido");
                  }}
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
                    <Text style={{ color: "#fff" }}>
                      Enviar email de recuperação
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    width: "100%",
                    borderRadius: 10,
                    color: "#333",
                  }}
                  onPress={() => {
                    setEmail("");
                    setKeyboardAvoid(false);
                    if (usernameTextInput.length > 0) {
                      setError("");
                      usernameTextInput.current.clear();
                    } else {
                      setError("");
                    }
                    if (emailTextInput.length > 0) {
                      setError("");
                      emailTextInput.current.clear();
                    } else {
                      setError("");
                    }
                  }}
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
                    <Text style={{ color: "#333" }}>
                      Este não é seu endereço de email?
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : (
          <View style={{ marginTop: "-1%" }}>
            <TextInput
              onFocus={() => {
                setKeyboardAvoid(true);
              }}
              onSubmitEditing={() => {
                setKeyboardAvoid(false);
              }}
              ref={emailTextInput}
              autoCorrect={false}
              style={{
                fontSize: 18,
                width: "90%",
                marginHorizontal: 20,
                marginVertical: 15,
                borderBottomColor: "#333",
                borderRadius: 10,
                color: "#333",
              }}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(email) => {
                setEmail(email);
                setEsqueceuEnviado(false);
                setError("");
              }}
            />
            <TextInput
              onFocus={() => {
                if (keyboardAvoid === false) {
                  setKeyboardAvoid(true);
                } else {
                  setKeyboardAvoid(true);
                }
              }}
              onBlur={() => {
                setKeyboardAvoid(false);
              }}
              ref={passwordTextInput}
              secureTextEntry={true}
              style={{
                fontSize: 18,
                width: "90%",
                marginHorizontal: 20,
                marginVertical: 15,
                color: "#333",
              }}
              onEndEditing={() => setKeyboardAvoid(false)}
              placeholder="Senha"
              onChangeText={(senha) => {
                setError("");
                setSenha(senha);
              }}
            />
            <View
              style={{
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
              <TouchableOpacity
                onPress={() => {
                  setError("");
                  setKeyboardAvoid(false);
                  setEsqueceu(true);
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    textDecorationLine: "underline",
                  }}
                >
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
            </View>
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
              onPress={signInWithGoogle}
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
                <Text style={{ color: "#333" }}>
                  Continuar com
                  <Text style={{ fontWeight: "bold", color: "#333" }}>
                    {" "}
                    Google
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }, [email, senha, error, esqueceu, esqueceuEnviado]);

  const modalHeight = 360 + modalMargin;
  const esqueceuMargin = Platform.OS === "ios" ? 5 : -5;
  const esqueceuMarginII = Platform.OS === "ios" ? -5 : -5;

  return (
    <>
      <Modalize
        handlePosition="inside"
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {
          setError("");
          setEsqueceu(false);
          setKeyboardAvoid(false);
          handlerStateChange(false);
        }}
        modalHeight={
          error
            ? email
              ? esqueceu
                ? keyboardAvoid
                  ? modalHeight - 20 - 50 + keyboardHeight
                  : modalHeight - 30 - 50
                : keyboardAvoid
                ? modalHeight + keyboardHeight
                : modalHeight
              : esqueceu
              ? keyboardAvoid
                ? modalHeight - 20 + keyboardHeight
                : modalHeight - 20 + 10
              : keyboardAvoid
              ? modalHeight + keyboardHeight
              : modalHeight
            : email
            ? esqueceu
              ? keyboardAvoid
                ? modalHeight - 20 - 50 + keyboardHeight
                : modalHeight - 30 - 50 + esqueceuMargin
              : keyboardAvoid
              ? modalHeight + keyboardHeight
              : modalHeight
            : esqueceu
            ? keyboardAvoid
              ? modalHeight - 20 + keyboardHeight
              : modalHeight - 20 + esqueceuMarginII
            : keyboardAvoid
            ? modalHeight + keyboardHeight
            : modalHeight
        }
        HeaderComponent={() => renderHeader()}
      >
        {renderContent()}
      </Modalize>
    </>
  );
}

const s = StyleSheet.create({
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: "200",
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",

    paddingVertical: 15,

    height: 60,

    borderBottomColor: "#f9f9f9",
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: "hidden",

    backgroundColor: "#eee",
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: "center",
    justifyContent: "center",

    marginVertical: 20,
  },
});
