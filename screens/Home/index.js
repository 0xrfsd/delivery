import React from "react";

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
  Image,
  Pressable,
  Keyboard,
  ImageBackground,
  LogBox,
} from "react-native";

import Picache from "picache2";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import storeCart from "../../storeCart";

import { Carousel } from "./Carousel";
import Commerces from "./Commerces";

import { Button } from "../../components/button/Button";

import Atendente from "../../assets/tumb.jpg";
import Background from "../../assets/grocery.png";

import { Carrinho } from "../../components/modals/Carrinho";
import { Entrega } from "../../components/modals/Entrega";
import { Endereco } from "../../components/modals/Endereco";

import { Permissions } from "expo";

import {
  Fontisto,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = React.useState({});
  const [userNome, setUserNome] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

  const [showFilter, setShowFilter] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const searchInput = React.createRef();

  const [modal, setModal] = React.useState([]);

  const searchHandler = (e) => {
    setSearchTerm(e);
    if (e !== "") {
      e = e.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
      e = e.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
      e = e.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
      e = e.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
      e = e.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
      e = e.replace(new RegExp("[Ç]", "gi"), "c");
      const resultItems = commerces.filter((commerce) => {
        return Object.values(commerce)
          .join(" ")
          .toLowerCase()
          .includes(e.toLowerCase());
      });
      setSearchResults(resultItems);
    } else {
      setSearchResults(commerces);
    }
  };

  const formatData = (commerces, numColumns) => {
    const totalRows = Math.floor(commerces.length / numColumns);
    let totalLastRow = commerces.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      commerces.push({ key: "blank", empty: true });
      commerces++;
    }
    return commerces;
  };

  const WIDTH = Dimensions.get("window").width;
  const numColumns = 2;

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token").then((valueData) => {
        var t = valueData.split('"').join("");

        var d = jwt_decode(t);
        setUserData(d);

        var n = d.nome.split('"').join("");
        setUserNome(n);

        var e = d.email.split('"').join("");
        setUserEmail(e);

        var i = d.id.split('"').join("");
        setUserId(i);
      });
    } catch (e) {
      // error reading value
    }
  };

  // const cart = async () => {

  //   await axios
  //     .post("http://192.168.1.104:3000/cart", {
  //       userId: userId,
  //       qtd: qtd,
  //       items: items,
  //       total: items.item.price * items.item.qtd
  //     })
  //     .then(async (response) => {
  //       if (response.status == 200) {
  //         if (response.data.data) {
  //           await storeCart(response.data.data);
  //           setIsAuth(true);
  //         } else {
  //           setError(response.data.error);
  //         }
  //       }
  //     });
  // };

  LogBox.ignoreLogs([
    `"requestPermissionsAsync" is now deprecated. Please, use "requestForegroundPermissionsAsync" or "requestBackgroundPermissionsAsync" instead.`,
    `Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`,
  ]);

  React.useEffect(() => {
    getToken();
    _getLocation();
  }, []);

  const _getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation(location);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }

  const commerces = [
    {
      key: String(Math.random()),
      image: require("../../assets/baratao.jpg"),
      name: "Mercado Da Terra Hortifruti",
      rate: "5.0",
      location: "Av. Pres. Kennedy 290",
      timing: "10-30 min",
    },
    {
      key: String(Math.random()),
      image: require("../../assets/pegpag.jpg"),
      name: "Geni Mercado",
      rate: "5.0",
      location: "Av. Pres. Kennedy 290",
      timing: "10-30 min",
    },
    {
      key: String(Math.random()),
      image: require("../../assets/baratao.jpg"),
      name: "Mercadinho Peg Menos",
      rate: "5.0",
      location: "Av. Pres. Kennedy 290",
      timing: "10-30 min",
    },
    {
      key: String(Math.random()),
      image: require("../../assets/pegpag.jpg"),
      name: "Mercadinho Peg Menos",
      rate: "5.0",
      location: "Av. Pres. Kennedy 290",
      timing: "10-30 min",
    },
  ];

  const categorias = [
    {
      image: require("../../assets/baratao.jpg"),
      key: String(Math.random()),
      name: "Mercearia",
      mercados: ["Big", "Bog", "Bug"],
    },
    {
      image: require("../../assets/pegpag.jpg"),
      key: String(Math.random()),
      name: "Açougue",
      mercados: ["Big", "Bog", "Bug"],
    },
    {
      image: require("../../assets/baratao.jpg"),
      key: String(Math.random()),
      name: "Açougue",
      mercados: ["Big", "Bog", "Bug"],
    },
    {
      image: require("../../assets/pegpag.jpg"),
      key: String(Math.random()),
      name: "Açougue",
      mercados: ["Big", "Bog", "Bug"],
    },
  ];

  const renderCarrinho = () => {
    return (
      <Pressable
        onPress={() => modal[0].openModal()}
        style={{
          marginTop: "-1.5%",
          display: "flex",
          flexDirection: "column",
          marginRight: 20,
        }}
      >
        <FontAwesome5
          key={1}
          style={{ marginTop: 1 }}
          name="shopping-cart"
          size={20}
          color={"#333"}
        />
        <View
          style={{
            marginLeft: 25,
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#333",
            padding: 3,
            paddingRight: 3.5,
            paddingBottom: 3.5,
            height: "auto",
            width: 25,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>{counter}</Text>
        </View>
      </Pressable>
    );
  };

  const renderEntrega = () => {
    return (
      <Pressable
        onPress={() => modal[1].openModal()}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginRight: 5,
            marginTop: 5,
            fontSize: 14,
            textDecorationLine: "underline",
          }}
        >
          Av. Pres. Kennedy 289
        </Text>
        <FontAwesome5 name="sort-down" size={15} color={"#333"} />
      </Pressable>
    );
  };

  return (
    <>
      <ImageBackground
        source={Background}
        style={{ height: "auto", width: "100%" }}
      >
        <View style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
          <TextInput
            value={searchTerm}
            onChangeText={(e) => {
              if (e.length > 0) {
                setShowFilter(true);
              } else {
                Keyboard.dismiss();
                setShowFilter(false);
              }
              searchHandler(e);
            }}
            onBlur={() => {
              Keyboard.dismiss();
            }}
            ref={searchInput}
            placeholder="Encontre seu mercado"
            style={{
              borderRadius: 5,
              padding: 10,
              width: "75%",
              marginLeft: "5%",
              marginRight: "2%",
              marginBottom: "5%",
              backgroundColor: "#fff",
              height: 50,
            }}
          />
          <Pressable
            onPress={() => {
              searchInput.current.clear();
              if (showFilter === true) {
                setShowFilter(!showFilter);
              }
              setSearchTerm("");
              Keyboard.dismiss();
            }}
            style={{
              width: "15%",
              height: 50,
              borderRadius: 5,
              backgroundColor: "#333",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showFilter ? (
              <MaterialIcons name="close" size={20} color={"#fff"} />
            ) : (
              <Fontisto name="search" size={20} color={"#fff"} />
            )}
          </Pressable>
        </View>
        <View>
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              height: "auto",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 20,
              }}
            >
              <View
                style={{
                  height: "auto",
                  paddingLeft: 20,
                  paddingBottom: 15,
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Entregar em</Text>
                {renderEntrega()}
              </View>
              <View
                style={{
                  height: "auto",
                  paddingLeft: 20,
                  paddingBottom: 15,
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Prazo de entrega</Text>
                <View
                  style={{
                    display: "flex",
                    marginTop: 5,
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ display: "flex", marginLeft: "auto" }}>
                    Em até 60 min
                  </Text>
                  <FontAwesome5
                    name="clock"
                    size={15}
                    style={{ marginLeft: 5 }}
                    color={"#333"}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView style={{ backgroundColor: "#FCF8F5" }}>
        {showFilter ? null : (
          <>
            <ImageBackground
              source={Atendente}
              opacity={0.5}
              imageStyle={{ borderRadius: 5 }}
              style={{
                backgroundColor: "#333",
                width: "auto",
                justifyContent: "space-between",
                paddingBottom: 5,
                borderRadius: 5,
                marginHorizontal: "5%",
                height: 160,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  fontSize: 18,
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Fazer suas compras de supermercado ficou mais fácil!
              </Text>
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  marginRight: 8,
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                1º Escolha o seu{" "}
                <Text style={{ fontWeight: "bold" }}>mercado</Text>
              </Text>
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                2º Monte seu{" "}
                <Text style={{ fontWeight: "bold" }}>carrinho</Text>{" "}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                3º Faça seu <Text style={{ fontWeight: "bold" }}>pedido</Text>{" "}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 5,
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                4º Receba suas compras{" "}
                <Text style={{ fontWeight: "bold" }}>na sua casa!</Text>
              </Text>
            </ImageBackground>
            <Text
              style={{
                marginLeft: 20,
                marginBottom: "-3%",
                marginTop: "5%",
                fontSize: 20,
              }}
            >
              Mercados perto de você
            </Text>
            <Carousel>
              {commerces.map((commerce, index) => {
                return (
                  <View key={index}>
                    <Pressable
                      style={{
                        backgroundColor: "transparent",
                        height: "auto",
                        width: 120,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("Commerce", {
                          name: commerce.name,
                          rate: commerce.rate,
                          location: commerce.location,
                          timing: commerce.timing,
                        })
                      }
                    >
                      <Picache
                        key={commerce.key}
                        source={commerce.image}
                        style={{
                          borderRadius: 5,
                          height: 120,
                          width: 120,
                          marginVertical: 5,
                          marginHorizontal: 5,
                          marginRight: 10,
                        }}
                      />
                      <View
                        style={{
                          borderBottomLeftRadius: 5,
                          borderBottomRightRadius: 5,
                          paddingHorizontal: 10,
                          height: "auto",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <Text style={{ color: "#333" }}>{commerce.name}</Text>
                      </View>
                    </Pressable>
                  </View>
                );
              })}
            </Carousel>
            <Text
              style={{ marginLeft: "5%", marginBottom: "-3%", fontSize: 20 }}
            >
              Mais pedidos na sua região
            </Text>
            <Carousel>
              {commerces.map((commerce, index) => {
                return (
                  <View key={index}>
                    <Pressable
                      style={{
                        backgroundColor: "transparent",
                        height: "auto",
                        width: 120,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("Commerce", {
                          name: commerce.name,
                          rate: commerce.rate,
                          location: commerce.location,
                          timing: commerce.timing,
                        })
                      }
                    >
                      <Picache
                        key={commerce.key}
                        source={commerce.image}
                        style={{
                          borderRadius: 5,
                          height: 120,
                          width: 120,
                          marginVertical: 5,
                          marginHorizontal: 5,
                          marginRight: 10,
                        }}
                      />
                      <View
                        style={{
                          borderBottomLeftRadius: 5,
                          borderBottomRightRadius: 5,
                          paddingHorizontal: 10,
                          height: "auto",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <Text style={{ color: "#333" }}>{commerce.name}</Text>
                      </View>
                    </Pressable>
                  </View>
                );
              })}
            </Carousel>
          </>
        )}
        <View>
          {showFilter ? (
            <Text style={{ marginLeft: "5%", marginTop: 10, fontSize: 22 }}>
              Veja o que encontramos
            </Text>
          ) : (
            <Text style={{ marginLeft: "5%", marginTop: 10, fontSize: 22 }}>
              Mercados pertos de você
            </Text>
          )}
          {searchTerm ? (
            <>
              {searchResults.map((commerce, index) => {
                return (
                  <View key={index} style={{ padding: 20 }}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Commerce", {
                          name: commerce.name,
                          rate: commerce.rate,
                          location: commerce.location,
                          time: commerce.time,
                        })
                      }
                    >
                      <Picache
                        key={commerce.key}
                        source={commerce.image}
                        style={{
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          height: 100,
                          width: "100%",
                          marginRight: 10,
                        }}
                      />
                      <View
                        style={{
                          width: "100%",
                          padding: 10,
                          height: "auto",
                          justifyContent: "center",
                          display: "flex",
                          backgroundColor: "#fff",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}
                      >
                        <Text style={{ color: "#333", fontSize: 20 }}>
                          {commerce.name}
                        </Text>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Text style={{ color: "#333" }}>{commerce.rate}</Text>
                          <Text
                            style={{
                              color: "#333",
                              marginLeft: 5,
                              marginRight: 5,
                            }}
                          >
                            •
                          </Text>
                          <Text style={{ color: "#333" }}>
                            {commerce.location}
                          </Text>
                          <Text
                            style={{
                              color: "#333",
                              marginLeft: 5,
                              marginRight: 5,
                            }}
                          >
                            •
                          </Text>
                          <Text style={{ color: "#333" }}>
                            {commerce.timing}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                );
              })}
            </>
          ) : null}

          {!searchTerm ? (
            <>
              {commerces.map((commerce, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      height: "auto",
                      width: "90%",
                      marginHorizontal: "5%",
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Commerce", {
                          name: commerce.name,
                          rate: commerce.rate,
                          location: commerce.location,
                          time: commerce.time,
                        })
                      }
                    >
                      <Picache
                        resizeMode="stretch"
                        key={commerce.key}
                        source={commerce.image}
                        style={{
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          height: 170,
                          width: "100%",
                          marginRight: 10,
                        }}
                      />
                      <View
                        style={{
                          width: "100%",
                          padding: 10,
                          height: "auto",
                          justifyContent: "center",
                          display: "flex",
                          backgroundColor: "#fff",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#333", fontSize: 20 }}>
                            {commerce.name}
                          </Text>
                          <Text style={{ color: "#333", fontSize: 20 }}>
                            {commerce.rate}
                          </Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Text style={{ color: "#333" }}>
                            {commerce.location}
                          </Text>
                          <Text
                            style={{
                              color: "#333",
                              marginLeft: 5,
                              marginRight: 5,
                            }}
                          >
                            •
                          </Text>
                          <Text style={{ color: "#333" }}>
                            {commerce.timing}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                );
              })}
            </>
          ) : null}
        </View>
      </ScrollView>
      <Carrinho
        ref={(el) => {
          modal[0] = el;
        }}
      />
      <Endereco modal={modal} setModal={setModal} modalIndex={1} />
    </>
  );
};

export default HomeScreen;
