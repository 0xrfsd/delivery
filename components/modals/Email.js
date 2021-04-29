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

export function EmailModal(props) {
  const [opened, setOpened] = useState(false);
  const [enviado, setEnviado] = useState(true)

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

  const [telefone, setTelefone] = React.useState("");
  const [error, setError] = React.useState("");

  const telefoneNumberInput = React.createRef();

  const validar = async () => {
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
            {enviado ? 'Enviamos um codigo de confirmação por email' : 'Alterar o seu endereço de email'}
          </Text>
        </View>
      </>
    );
  }, [telefone, enviado]);

  const renderContent = useCallback(() => {
    return (
      <>
        {enviado ? (
          <>
            <View
              style={{
                paddingHorizontal: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextInput
                maxLength={4}
                keyboardType="numeric"
                onFocus={() => {
                  setKeyboardAvoid(true);
                }}
                onBlur={() => {
                  setKeyboardAvoid(false);
                }}
                placeholder="Codigo"
                style={{ width: "90%", height: 30, marginLeft: 5 }}
              />
            </View>
            <Text
              style={{
                marginHorizontal: 20,
                textAlign: "center",
                color: "#555",
                marginTop: 20,
              }}
            >
              Você pode receber atualizações por email do{" "}
              <Text style={{ fontWeight: "bold" }}>Entrega +</Text> e pode
              cancelar o recebimento a qualquer momento.
            </Text>
          </>
        ) : (
          <>
            <View
              style={{
                paddingHorizontal: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextInput
                maxLength={11}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => {
                  setKeyboardAvoid(true);
                }}
                onBlur={() => {
                  setKeyboardAvoid(false);
                }}
                placeholder="Email"
                style={{ width: "90%", height: 30, marginLeft: 5 }}
              />
            </View>
            <Text
              style={{
                marginHorizontal: 20,
                textAlign: "center",
                color: "#555",
                marginTop: 20,
              }}
            >
              Você pode receber atualizações por email do{" "}
              <Text style={{ fontWeight: "bold" }}>Entrega +</Text> e pode
              cancelar o recebimento a qualquer momento.
            </Text>
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            setEnviado(!enviado)
          }}
          style={{
            marginTop: 20,
            height: 40,
            borderRadius: 5,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "5%",
            backgroundColor: "#333",
          }}
        >
          <Text style={{ color: "#fff" }}>{enviado ? 'Confirmar' : 'Avançar'}</Text>
        </TouchableOpacity>
      </>
    );
  }, [telefone, enviado]);

  const modalMarginI = Platform.OS === "ios" ? 0 : 15;
  const modalHeight = 250;
  const modalMargin = 210;

  return (
    <>
      <Modalize
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {
          handlerStateChange(false);
          setKeyboardAvoid(false);
          setError("");
        }}
        modalHeight={keyboardAvoid ? modalHeight + modalMargin + modalMarginI : modalHeight + modalMarginI}
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
