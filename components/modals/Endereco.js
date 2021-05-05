import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  Dimensions,
  Keyboard,
} from "react-native";
import { Modalize } from "react-native-modalize";

import { AuthContext } from "../../Context";
import axios from "axios";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import storeToken from "../../storeToken";

import * as Google from "expo-google-app-auth";

import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export function Endereco(props) {
  const [opened, setOpened] = useState(false);
  const [enviado, setEnviado] = useState(true);

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

  const [definir, setDefinir] = React.useState(false);
  const [error, setError] = React.useState("");
  const [setAddress, address] = React.useState("");

  const telefoneNumberInput = React.createRef();

  const windowHeight = Dimensions.get("window").height - 100;

  const renderHeader = useCallback(() => {
    return (
      <>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: "#333",
              fontSize: 20,
              marginTop: 5,
              fontWeight: "bold",
            }}
          >
            Endereço de Entrega
          </Text>
        </View>
      </>
    );
  }, []);

  const renderContent = useCallback(() => {
    return (
      <>
        <View style={s.content}>
          <View
            style={{
              width: "100%",
              height: "auto",
              marginTop: 20,
              marginBottom: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MaterialIcons
                name="location-on"
                style={{ marginLeft: "-2%", marginRight: "1%" }}
                size={20}
                color="black"
              />
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ fontSize: 16 }}>Av. Pres. Kennedy 289</Text>
                <Text style={{ fontSize: 16, color: "#555" }}>
                  - Jardim Alexandrina, ...
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Entrega");
                  setTimeout(() => {
                    closeModal();
                  }, 2000);
                }}
                style={{
                  width: 100,
                  height: 50,
                  marginLeft: 10,
                  borderRadius: 5,
                  backgroundColor: "#333",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Alterar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }, [definir]);

  const modalMarginI = Platform.OS === "ios" ? 0 : 15;
  const modalHeight = 160;
  const modalMargin = 300;

  return (
    <>
      <Modalize
        ref={modalizeRef}
        handlePosition="inside"
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {
          handlerStateChange(false);
          setKeyboardAvoid(false);
          setError("");
        }}
        modalHeight={modalHeight}
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
