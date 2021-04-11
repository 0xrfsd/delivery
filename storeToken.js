import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@token", jsonValue).then(() =>
        console.log("Token stored.")
      );
    } catch (e) {
      // saving error
    }
  };

export default storeToken;