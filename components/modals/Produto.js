import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Modalize } from "react-native-modalize";

import { Feather, Ionicons } from "@expo/vector-icons";
import ProdutoImage from "../../assets/rexona.png";

export function Produto(props) {
  const modalMargin = Platform.OS === "ios" ? 0 : 20;
  const paymentMargin = Platform.OS === "ios" ? 0 : 10;

  // alert(windowHeight);

  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState(0);

  const [adicionando, setAdicionando] = useState(true);

  const [produto, setProduto] = useState('');

  const modalizeRef = useRef(<Modalize />);

  // Função executada apenas quando o componente for montado pela primeira vez
  useEffect(() => {
    let { setModal, modal, modalIndex } = props;

    modal[modalIndex] = {
      openModal: () => openModal(),
      closeModal: () => closeModal(),
      scrollToTop: () => scrollToTop(),
      a: (d) => a(d)
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

  const a = (d) => {
    setProduto(d)
  }

  const scrollToTop = () => {
    modalizeRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const renderHeader = useCallback(() => {
    return (
      <>
        <View
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            height: 80,
            backgroundColor: "#fff",
            paddingBottom: 15,
            widht: "100%",
            padding: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 26, width: "100%" }}>
                {produto}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity onPress={() => closeModal()}>
                <Ionicons name="close" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }, [items, produto]);

  const renderContent = useCallback(() => {
    return (
      <>
        {adicionando ? (
          <>
            <View
              style={{
                height: 250,
                backgroundColor: "#fff",
                width: "100%",
                paddingHorizontal: 10,
              }}
            >
              <Image
                resizeMode="contain"
                source={ProdutoImage}
                style={{ height: 190, width: "100%" }}
              />
              <View
                style={{
                  height: 60,
                  display: "flex",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "#f9f9f9",
                  borderTopWidth: 1,
                  borderTopColor: "#f9f9f9",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 32, textAlign: "center" }}>
                  R$6,00
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 50,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                disabled={items > 0 ? false : true}
                onPress={() => {
                  if (items > 0) {
                    setItems(items - 1);
                  }
                }}
                style={{
                  height: 70,
                  width: "33%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontSize: 36, fontWeight: "bold" }}>-</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 70,
                  width: "33%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontSize: 36, fontWeight: "bold" }}>
                  {items}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setItems(items + 1)}
                style={{
                  height: 70,
                  width: "33%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontSize: 36, fontWeight: "bold" }}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  closeModal();
                }, 1000);
              }}
              style={{
                height: 50,
                backgroundColor: "blue",
                margin: "5%",
                width: "90%",
                borderRadius: 5,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{
                height: "100%",
                padding: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Loading</Text>
            </View>
          </>
        )}
      </>
    );
  }, [items, adicionando]);

  return (
    <>
      <Modalize
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {}}
        modalHeight={460}
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
