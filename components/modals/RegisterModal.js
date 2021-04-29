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

export function RegisterModal(props) {
  const modalMargin = Platform.OS === "ios" ? -10 : 40;
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

  const [emailReq, setEmailReq] = React.useState(""); // email hook
  const [nomeReq, setNomeReq] = React.useState(""); // nome hook
  const [senhaReq, setSenhaReq] = React.useState(""); // senha hook
  const [error, setError] = React.useState("");
  const [tipoReq, setTipoReq] = React.useState("consumer");

  const nameTextInput = React.createRef();
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

  const renderHeader = useCallback(() => {
    return (
      <>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#333", fontSize: 20, fontWeight: "bold" }}>
            Crie sua conta e comece a pedir agora!
          </Text>
          <Text style={{ color: "#333", fontSize: 14 }}>
            Isso vai levar menos de um minuto
          </Text>
        </View>
      </>
    );
  }, []);

  const renderContent = useCallback(() => {
    return (
      <>
        <View style={{ marginTop: '-4%' }}>
          <TextInput
            onFocus={() => {
              setKeyboardAvoid(true);
            }}
            onSubmitEditing={() => {
              setKeyboardAvoid(false);
            }}
            autoCompleteType={"name"}
            autoCorrect={false}
            ref={nameTextInput}
            type="email"
            style={{
              fontSize: 18,
              width: "90%",
              marginVertical: 15,
              marginHorizontal: 20,
              borderBottomColor: "#333",
              borderRadius: 10,
              color: "#333",
            }}
            placeholder="Nome e Sobrenome"
            onChangeText={(name) => {
              setNomeReq(name);
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
            onSubmitEditing={() => {
              setKeyboardAvoid(false);
            }}
            autoCompleteType={"email"}
            keyboardType="email-address"
            autoCorrect={false}
            ref={emailTextInput}
            style={{
              fontSize: 18,
              width: "90%",
              marginVertical: 15,
              marginHorizontal: 20,
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
              width: "90%",
              fontSize: 18,
              marginVertical: 15,
              marginHorizontal: 20,
              borderRadius: 10,
              color: "#333",
            }}
            placeholder="Senha"
            onChangeText={(senha) => {
              setSenhaReq(senha);
            }}
          />
          <View
            style={{
              marginTop: 5,
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
                Termos de serviço
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
                Criar agora
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
                marginTop: '-1%',
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
      </>
    );
  }, [emailReq, senhaReq, tipoReq, nomeReq, error]);

  return (
    <>
      <Modalize
        handlePosition="inside"
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {
          setError('');
          setKeyboardAvoid(false);
          handlerStateChange(false);
        }}
        modalHeight={
          keyboardAvoid ? 380 + modalMargin + keyboardHeight - 30 : 380 + modalMargin
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
