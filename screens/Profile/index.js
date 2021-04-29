import React from "react";

import { View, Text, Pressable, ScrollView, SafeAreaView } from "react-native";

import { AuthContext, UserDataContext } from "../../Context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import { FontAwesome5 } from "@expo/vector-icons";

import removeToken from "../../removeToken";

const ProfileScreen = ({ navigation }) => {
  const { isAuth, setIsAuth } = React.useContext(AuthContext);

  const [userData, setUserData] = React.useState({});
  const [userNome, setUserNome] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userTipo, setUserTipo] = React.useState("");

  const nomeSobrenome = userNome.split(" ");
  const inicialNome = nomeSobrenome[0].slice(0,1);

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

        var t = d.tipo.split('"').join("");
        setUserTipo(t);
      });
    } catch (e) {
      // error reading value
    }
  };

  const settings = [
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Convidar amigos",
      subTitle: "Ganhe até R$20",
    },
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Endereços",
      subTitle: "Meus endereços de entrega",
    },
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Formas de pagamento",
      subTitle: "Minhas formas de pagamento",
    },
  ];

  const helpers = [
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Ajuda",
    },
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Configurações",
    },
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Privacidade",
    },
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Cresca conosco",
    },
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Gostaria de sugerir algo pra gente?",
    },
    {
      key: Math.floor(Math.random() * 10) + 1,
      title: "Gostaria de receber uma renda extra?",
    },
  ];

  React.useEffect(() => {
    getToken();
  }, []);

  <removeToken />;

  const logout = async () => {
    await removeToken();
    setIsAuth(false);
  };

  // React.useEffect(() => {
  //     logout()
  // }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        onPress={() =>
          navigation.navigate("Setting", {
            type: "Editar",
            nome: userNome,
            inicialNome: inicialNome,
            email: userEmail,
          })
        }
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          height: 70,
          backgroundColor: "transparent",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
        <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 50,
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#d3d3d3',
              backgroundColor: "#d3d3d3",
            }}
          >
              <Text style={{ fontWeight: "bold"}}>{inicialNome}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#333", fontSize: 18, fontWeight: "bold" }}>
              {userNome}
            </Text>
            <Text style={{ color: "#333" }}>Editar perfil</Text>
          </View>
        </View>
        <View>
          <FontAwesome5
            name="angle-right"
            size={30}
            style={{ marginTop: 2, marginRight: 10 }}
            color={"#333"}
          />
        </View>
      </Pressable>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        {settings.map((setting, i) => {
          return (
            <View key={i}>
              <Pressable
                onPress={() => navigation.navigate('Setting', {
                  type: settings[i].title
                })}
                style={{
                  padding: 15,
                  borderBottomColor: "#f9f9f9",
                  height: 65,
                  backgroundColor: "#fff",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: "#333",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {setting.title}
                    </Text>
                    <Text style={{ color: "#333" }}>{setting.subTitle}</Text>
                  </View>
                </View>
                <View>
                  <FontAwesome5
                    name="angle-right"
                    size={30}
                    style={{ marginTop: 2, marginRight: 10 }}
                    color={"#333"}
                  />
                </View>
              </Pressable>
            </View>
          );
        })}
        {helpers.map((helper, i) => {
          return (
            <View key={i}>
              <Pressable
                onPress={() => navigation.navigate("Setting", {
                  type: helper.title
                })}
                style={{
                  width: "100%",
                  height: "auto",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderBottomColor: "#f9f9f9",
                  borderBottomWidth: 1,
                }}
              >
                <Text style={{ color: "#333", fontSize: 16 }}>
                  {helper.title}
                </Text>
              </Pressable>
            </View>
          );
        })}
        <Text
          style={{
            marginLeft: 10,
            marginTop: 25,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Sua opinião vale muito pra nós! ❤
        </Text>
        <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 16 }}>
          Leva menos de um minuto para contar sua experiência utilizando o app
        </Text>
        <Pressable
          style={{
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            width: "94%",
            marginTop: 10,
            marginHorizontal: "3%",
            height: 50,
            backgroundColor: "#333",
          }}
          onPress={() => logout()}
        >
          <Text style={{ color: "#fff" }}>
            Clique aqui para contar sua experiência
          </Text>
        </Pressable>
        <Pressable
          style={{
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            alignItems: "center",
            width: "94%",
            marginTop: 10,
            marginBottom: 10,
            marginHorizontal: "3%",
            height: 50,
            backgroundColor: "#fff",
          }}
          onPress={() => logout()}
        >
          <Text style={{ color: "#333" }}>Sair da sua conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
