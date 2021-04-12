import React from "react";

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import { Carousel } from "./Carousel";
import Commerces from "./Commerces";

import ImageCardOne from "../../assets/verduras.jpg";
import ImageCardTwo from "../../assets/acougue.jpg";

import {
  Fontisto,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = React.useState({});
  const [userNome, setUserNome] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [counter, setCounter] = React.useState(0);

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
      });
    } catch (e) {
      // error reading value
    }
  };

  const Greet = () => {
    return (
      <>
        <Text style={{ color: "#333", fontSize: 26 }}>Seja bem vindo!</Text>
        <Text
          style={{ color: "#333", fontSize: 26, fontWeight: "bold" }}
          onPress={() => navigation.navigate("Profile")}
        >
          {userNome}
        </Text>
      </>
    );
  };

  React.useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            width: "100%",
            height: "auto",
            padding: 10,
            backgroundColor: "transparent",
            justifyContent: "space-around",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          around
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginLeft: "-5%",
            }}
          >
            <FontAwesome5 name="map-pin" size={15} color={"#333"} />
            <Text
              style={{
                marginLeft: 5,
                marginTop: 5,
                fontSize: 14,
                textDecorationLine: "underline",
              }}
            >
              Av. Presidente Kennedy 289
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <FontAwesome5 name="shopping-cart" size={20} color={"#333"} />
            <View
              style={{
                marginLeft: 25,
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#333",
                height: 20,
                width: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>{counter}</Text>
            </View>
          </View>
        </View>
        <TextInput
          placeholder="Pesquise por produtos"
          style={{
            borderRadius: 10,
            padding: 10,
            width: "90%",
            margin: "5%",
            backgroundColor: "#fff",
            height: 50,
          }}
        />
      </View>
      <ScrollView>
        <Carousel>
          <ImageBackground
            source={ImageCardOne}
            imageStyle={{ borderRadius: 10 }}
            style={{
              height: 200,
              width: 250,
              marginRight: 10,
            }}
          >
            <View
              style={{
                height: "20%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: "auto",
                backgroundColor: "#333",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Mercearia</Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={ImageCardTwo}
            imageStyle={{ borderRadius: 10 }}
            style={{
              height: 200,
              width: 250,
              marginRight: 10,
            }}
          >
            <View
              style={{
                height: "20%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: "auto",
                backgroundColor: "#333",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Açougue</Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={ImageCardOne}
            imageStyle={{ borderRadius: 10 }}
            style={{
              height: 200,
              width: 250,
              marginRight: 10,
            }}
          >
            <View
              style={{
                height: "20%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: "auto",
                backgroundColor: "#333",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Mercearia</Text>
            </View>
          </ImageBackground>
          <ImageBackground
            source={ImageCardTwo}
            imageStyle={{ borderRadius: 10 }}
            style={{
              height: 200,
              width: 250,
              marginRight: 10,
            }}
          >
            <View
              style={{
                height: "20%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: "auto",
                backgroundColor: "#333",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Açougue</Text>
            </View>
          </ImageBackground>
        </Carousel>
        <Text style={{ marginLeft: "5%", fontSize: 22 }}>
          Compre por categorias
        </Text>
        <Carousel>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <Fontisto name="shopping-store" size={20} color={"#fff"} />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Mercearia
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons
                name="food-drumstick"
                size={20}
                color={"#fff"}
              />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Açougue
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <FontAwesome5 name="bread-slice" size={20} color={"#fff"} />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Padaria
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons
                name="fruit-cherries"
                size={20}
                color={"#fff"}
              />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Hortifruti
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons
                name="bottle-wine"
                size={20}
                color={"#fff"}
              />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Bebidas
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name="cow" size={20} color={"#fff"} />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Latícineos
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <MaterialIcons name="clean-hands" size={20} color={"#fff"} />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Higíene
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <MaterialIcons
                name="cleaning-services"
                size={20}
                color={"#fff"}
              />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Limpeza
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons
                name="soy-sauce"
                size={20}
                color={"#fff"}
              />
            </View>
            <Text style={{ height: 60, marginLeft: -10, marginTop: 5 }}>
              Condimentos
            </Text>
          </View>
        </Carousel>
        <Commerces />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
