import AsyncStorage from "@react-native-async-storage/async-storage";

const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("@token").then(() =>
        console.log("Token removed.")
      );
      await AsyncStorage.getItem("@token").then((iToken) =>
        console.log("now your token is " + iToken)
      );
    } catch (e) {
      // remove error
    }
  };

  export default removeToken;