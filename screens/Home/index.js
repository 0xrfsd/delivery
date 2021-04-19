import React from "react";

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import CachedImage from 'react-native-expo-cached-image';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import storeCart from "../../storeCart";

import { Carousel } from "./Carousel";
import Commerces from "./Commerces";

import { Button } from "../../components/button/Button";

import ImageCardOne from "../../assets/verduras.jpg";
import ImageCardTwo from "../../assets/acougue.jpg";

import { Carrinho } from "../../components/modals/Carrinho";
import { Entrega } from "../../components/modals/Entrega";

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


  const [searchTerm, setSearchTerm] = React.useState("");
  const searchInput = React.createRef();

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

  React.useEffect(() => {
    getToken();
  }, []);

  const commerces = [
    {
      key: String(Math.random()),
      image: ImageCardOne,
      name: "Comercio A",
      rate: "5.0",
      location: "Av. Pres. Kennedy 290",
      timing: "10-30 min",
    },
    {
      key: String(Math.random()),
      image: ImageCardTwo,
      name: "Comercio B",
      rate: "5.0",
      location: "Av. Pres. Kennedy 290",
      timing: "10-30 min",
    },
    {
      key: String(Math.random()),
      image: ImageCardOne,
      name: "Comercio C",
      rate: "5.0",
      location: "Av. Pres. Kennedy 290",
      timing: "10-30 min",
    },
    {
      key: String(Math.random()),
      image: ImageCardTwo,
      name: "Comercio D",
      rate: "5.0",
      location: "Av. Pres. Kennedy 290",
      timing: "10-30 min",
    },
  ];

  const categorias = [
    {
      image: ImageCardOne,
      key: String(Math.random()),
      name: "Mercearia",
      mercados: ["Big", "Bog", "Bug"],
    },
    {
      image: ImageCardTwo,
      key: String(Math.random()),
      name: "Açougue",
      mercados: ["Big", "Bog", "Bug"],
    },
    {
      image: ImageCardOne,
      key: String(Math.random()),
      name: "Açougue",
      mercados: ["Big", "Bog", "Bug"],
    },
    {
      image: ImageCardTwo,
      key: String(Math.random()),
      name: "Açougue",
      mercados: ["Big", "Bog", "Bug"],
    },
  ];

  const modal = [];

  const renderCarrinho = () => {
    return (
      <TouchableOpacity
        onPress={() => modal[0].openModal()}
        style={{ marginTop: '-1.5%', display: "flex", flexDirection: "column", marginRight: 20 }}
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
      </TouchableOpacity>
    );
  };

  const renderEntrega = () => {
    return (
      <TouchableOpacity
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
        <FontAwesome5
          name="angle-down"
          size={15}
          style={{ marginTop: 5 }}
          color={"#333"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <View style={{ marginTop: 10, display: "flex", flexDirection: "row" }}>
          <TextInput
            onChangeText={(e) => {
              setShowFilter(true);
              setSearchTerm(e.toUpperCase());
            }}
            onBlur={() => {
              searchInput.current.clear();
              setShowFilter(false);
            }}
            ref={searchInput}
            placeholder="Pesquise por supermercados ou categorias"
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
          <TouchableOpacity
            onPress={() => {
              searchInput.current.clear();
              setShowFilter(!showFilter);
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
              <Fontisto name="shopping-store" size={20} color={"#fff"} />
            )}
          </TouchableOpacity>
        </View>
        {showFilter ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              paddingLeft: 5,
              display: "flex",
            }}
          >
            <Carousel>
              <Text>{searchTerm}</Text>
            </Carousel>
          </View>
        ) : null}
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
              <Text>Entregar em</Text>
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
              <Text>Prazo de entrega</Text>
              <View
                style={{ display: "flex", marginTop: 5, flexDirection: "row" }}
              >
                <Text style={{ display: "flex", marginLeft: "auto" }}>
                  10-25 min
                </Text>
                <FontAwesome5
                  name="clock"
                  size={15}
                  style={{ marginLeft: 5, marginTop: 0 }}
                  color={"#333"}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <Text style={{ marginLeft: "5%", marginTop: 10, fontSize: 22 }}>
          Compre por corredor
        </Text>
        <Carousel>
          {categorias.map((categoria, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Categoria", {
                      categoria: categoria.name,
                      mercados: categoria.mercados,
                    })
                  }
                >
                  <CachedImage 
                    key={categoria.key}
                    source={categoria.image}
                    style={{
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      height: 150,
                      width: 200,
                      marginRight: 10,
                    }}
                  />
                  <View
                    style={{
                      width: 200,
                      padding: 10,
                      height: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      backgroundColor: "#333",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>{categoria.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </Carousel>
        <View>
          <Text style={{ marginLeft: "5%", marginTop: 10, fontSize: 22 }}>
            Compre por supermercados
          </Text>
          {commerces.map((commerce, index) => {
            return (
              <View key={index} style={{ padding: 20 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Commerce", {
                      name: commerce.name,
                      rate: commerce.rate,
                      location: commerce.location,
                      time: commerce.time,
                    })
                  }
                >
                  <CachedImage 
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
                      backgroundColor: "#333",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 20 }}>
                      {commerce.name}
                    </Text>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ color: "#fff" }}>{commerce.rate}</Text>
                      <Text
                        style={{ color: "#fff", marginLeft: 5, marginRight: 5 }}
                      >
                        •
                      </Text>
                      <Text style={{ color: "#fff" }}>{commerce.location}</Text>
                      <Text
                        style={{ color: "#fff", marginLeft: 5, marginRight: 5 }}
                      >
                        •
                      </Text>
                      <Text style={{ color: "#fff" }}>{commerce.timing}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={{ height: 150, alignItems: "center" }} />
      </ScrollView>
        <Entrega
          ref={(el) => {
            modal[1] = el;
          }}
        />
    </SafeAreaView>
  );
};

export default HomeScreen;
