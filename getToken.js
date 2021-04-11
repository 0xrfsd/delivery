import React from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

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

  export default getToken;