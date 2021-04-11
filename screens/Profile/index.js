import React from "react";

import { View, Text, Pressable } from "react-native";

import { AuthContext, UserDataContext } from "../../Context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import removeToken from "../../removeToken";

const ProfileScreen = ({ navigation }) => {
  const { isAuth, setIsAuth } = React.useContext(AuthContext);

  const [userData, setUserData] = React.useState({});
  const [userNome, setUserNome] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

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
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ color: "#333" }}>{userNome}</Text>
      <Text style={{ color: "#333" }}>{userEmail}</Text>
      <Pressable
        style={{
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          margin: "5%",
          height: 50,
          backgroundColor: "#fff",
        }}
        onPress={() => logout()}
      >
        <Text style={{ color: "#333" }}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
