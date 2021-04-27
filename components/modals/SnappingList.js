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
// import { Button } from "../button/Button";

export function SnappingList(props) {
  const modalMargin = Platform.OS === "ios" ? 0 : 20;
  const paymentMargin = Platform.OS === "ios" ? 0 : 10;

  // alert(windowHeight);

  const [opened, setOpened] = useState(false);
  const [cart, setCart] = useState(["",'','','','']);
  const [payment, setPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [addCard, setAddCard] = useState(false);

  const [keyboardAvoid, setKeyboardAvoid] = useState(false);

  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  const modalizeRef = useRef(<Modalize />);

  // Função executada apenas quando o componente for montado pela primeira vez
  useEffect(() => {
    let { setModal, modal, modalIndex } = props;

    modal[modalIndex] = {
      openModal: () => openModal(),
      closeModal: () => closeModal(),
      scrollToTop: () => scrollToTop(),
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

  const scrollToTop = () => {
    modalizeRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const renderHeader = useCallback(() => {
    return (
      <>
        {payment ? (
          <View
            style={{
              height: 90,
              paddingLeft: 20,
              paddingRight: 20,
              padding: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {addCard ? (
              <TouchableOpacity
                onPress={() => {
                  setAddCard(false);
                  setKeyboardAvoid(false);
                }}
              >
                <Text
                  style={{
                    marginBottom: 2,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#ccc",
                  }}
                >
                  Voltar ao pagamento
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setPayment(false)}>
                <Text
                  style={{
                    marginBottom: 2,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#ccc",
                  }}
                >
                  Voltar ao carrinho
                </Text>
              </TouchableOpacity>
            )}

            {cart.length > 0 ? (
              <Text
                style={{
                  marginBottom: 2,
                  fontSize: 22,
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                {addCard
                  ? "Adicionar novo cartão de crédito ou débito"
                  : "Selecione o seu metodo de pagamento"}
              </Text>
            ) : (
              <Text
                style={{
                  marginBottom: 2,
                  fontSize: 22,
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Seu carrinho está vazio
              </Text>
            )}
          </View>
        ) : (
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              padding: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                marginBottom: 2,
                fontSize: 16,
                fontWeight: "600",
                color: "#ccc",
              }}
            >
              Carrinho
            </Text>

            {cart.length > 0 ? (
              <View
                style={{ display: "flex", width: "100%", flexDirection: "row" }}
              >
                <Text
                  style={{
                    marginBottom: 2,
                    fontSize: 22,
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Seu carrinho possui {cart.length} items
                </Text>
                <TouchableOpacity
                  onPress={() => closeModal()}
                  style={{
                    marginTop: 2,
                    display: "flex",
                    marginLeft: "auto",
                    height: 20,
                    width: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#000",
                    borderRadius: 100,
                  }}
                >
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold" }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text
                style={{
                  marginBottom: 2,
                  fontSize: 22,
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Seu carrinho está vazio
              </Text>
            )}
          </View>
        )}
      </>
    );
  }, [cart, payment, addCard]);

  const renderContent = useCallback(() => {
    return (
      <>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 50 }}
            color="#333"
          />
        ) : (
          <View style={{}}>
            {payment ? (
              <View style={{ width: "100%" }}>
                {addCard ? (
                  <View
                    style={{
                      height: 255,
                      width: "100%",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <TextInput
                      editable={true}
                      style={{
                        width: "100%",
                        height: 45,
                        borderBottomColor:
                          cardHolderName.length > 0 ? "#3654d0" : "#f9f9f9",
                        borderBottomWidth: 2,
                      }}
                      placeholder="Titular do cartão"
                      autoCompleteType="cc-csc"
                      keyboardType="default"
                      onFocus={() => setKeyboardAvoid(true)}
                      onChangeText={(e) => {
                        setCardHolderName(e);
                      }}
                    />
                    <TextInput
                      style={{
                        width: "100%",
                        height: 45,
                        borderBottomColor:
                          cardNumber.length > 0 ? "#3654d0" : "#f9f9f9",
                        borderBottomWidth: 2,
                      }}
                      placeholder="Numero do cartão (0000 0000 0000 0000)"
                      autoCompleteType="cc-number"
                      keyboardType="number-pad"
                      maxLength={16}
                      onFocus={() => setKeyboardAvoid(true)}
                      onChangeText={(e) => {
                        setCardNumber(e);
                      }}
                    />
                    <View
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        style={{
                          width: "48%",
                          height: 45,
                          borderBottomColor:
                            expDate.length > 0 ? "#3654d0" : "#f9f9f9",
                          borderBottomWidth: 2,
                        }}
                        placeholder="Validade (MM/AA)"
                        autoCompleteType="cc-exp"
                        keyboardType="number-pad"
                        maxLength={4}
                        onFocus={() => setKeyboardAvoid(true)}
                        onChangeText={(e) => {
                          setExpDate(e);
                        }}
                      />
                      <TextInput
                        style={{
                          width: "48%",
                          height: 45,
                          borderBottomColor:
                            cvc.length > 0 ? "#3654d0" : "#f9f9f9",
                          borderBottomWidth: 2,
                        }}
                        placeholder="CVV (000)"
                        autoCompleteType="cc-csc"
                        keyboardType="number-pad"
                        maxLength={3}
                        onFocus={() => setKeyboardAvoid(true)}
                        onBlur={() => {
                          Keyboard.dismiss();
                          setKeyboardAvoid(false);
                        }}
                        onChangeText={(e) => {
                          setCvc(e);
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setPayment(true);
                      }}
                      style={{
                        width: "100%",
                        marginTop: 25,
                        backgroundColor: "#333",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        height: 50,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Adicionar Cartão
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ height: 255 }}>
                    <TouchableOpacity
                      onPress={() => setSelected(!selected)}
                      style={{
                        height: 60,
                        width: "100%",
                        paddingVertical: 10,
                        borderBottomColor: "#f9f9f9",
                        borderBottomWidth: 1,
                      }}
                    >
                      <View
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View style={s.content__avatar}>

                        </View>

                        <Text
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            color: "#333",
                            fontWeight: "bold",
                          }}
                        >
                          Mastercard *3154
                        </Text>
                        {selected ? (
                          <Text
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              color: "#333",
                            }}
                          >
                            {" "}
                            (Selecionado)
                          </Text>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setAddCard(true)}
                      style={{
                        height: 60,
                        width: "100%",
                        paddingVertical: 10,
                        borderBottomColor: "#f9f9f9",
                        borderBottomWidth: 1,
                      }}
                    >
                      <View
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: 38,
                            height: 38,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              width: "100%",
                              height: "100%",
                              marginTop: "-15%",
                              fontSize: 33,
                            }}
                          >
                            +
                          </Text>
                        </View>

                        <Text
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            color: "#333",
                            fontWeight: "bold",
                          }}
                        >
                          Adicionar Cartão de Credito
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {cart.length > 0 ? (
                      <View
                        style={{
                          width: "100%",
                          height: "auto",
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>Taxa de serviço</Text>
                          <Text style={{ fontSize: 16 }}>R$5</Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>Taxa de entrega</Text>
                          <Text style={{ fontSize: 16 }}>R$10</Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Total
                          </Text>
                          <Text style={{ fontSize: 16 }}>R$100</Text>
                        </View>
                      </View>
                    ) : null}
                    <TouchableOpacity
                      onPress={() => {
                        setPayment(true);
                      }}
                      style={{
                        width: "90%",
                        backgroundColor: "#333",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        marginLeft: "5%",
                        marginRight: "5%",
                        height: 50,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Concluir pedido!
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <>
                {cart.length > 0 ? (
                  <ScrollView style={s.content}>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <TouchableOpacity
                          onPress={() => setProductOpen(true)}
                          style={s.content__row}
                          key={i}
                        >
                          <View
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <View style={s.content__avatar}>

                            </View>

                            <Text
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                color: "#333",
                                fontWeight: "bold",
                              }}
                            >
                              Nome
                            </Text>
                            <Text
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                color: "#333",
                                fontWeight: "bold",
                              }}
                            >
                              (2)
                            </Text>
                          </View>
                          <Text>R$99,99</Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                ) : null}
                {cart.length > 0 ? (
                  <View
                    style={{
                      width: "100%",
                      height: "auto",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>Taxa de serviço</Text>
                      <Text style={{ fontSize: 16 }}>R$5</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>Taxa de entrega</Text>
                      <Text style={{ fontSize: 16 }}>R$10</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Total
                      </Text>
                      <Text style={{ fontSize: 16 }}>R$100</Text>
                    </View>
                  </View>
                ) : null}
                {cart.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setPayment(true);
                    }}
                    style={{
                      marginBottom: 10,
                      width: "90%",
                      backgroundColor: "#333",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      marginLeft: "5%",
                      marginRight: "5%",
                      height: 50,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Concluir pedido!
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => closeModal()}
                    style={{
                      marginTop: "auto",
                      width: "90%",
                      backgroundColor: "#333",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      marginLeft: "5%",
                      marginRight: "5%",
                      height: 50,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Seu carrinho está vazio!
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}
      </>
    );
  }, [
    cart,
    payment,
    selected,
    loading,
    addCard,
    cardHolderName,
    cardNumber,
    expDate,
    cvc,
  ]);

  return (
    <>
      <Modalize
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {
          setKeyboardAvoid(false);
          handlerStateChange(false);
        }}
        panGestureEnabled={cart.length > 0 ? true : false}
        modalHeight={
          keyboardAvoid
            ? 345 + paymentMargin + 180
            : payment
            ? 345 + paymentMargin
            : cart.length > 3
            ? 180 + 200 + modalMargin
            : cart.length > 0
            ? cart.length * 60 + 200 + modalMargin
            : 140
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
