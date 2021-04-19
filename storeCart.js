import AsyncStorage from "@react-native-async-storage/async-storage";

const storeCart = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cart", jsonValue).then(() =>
        console.log("Cart stored.")
      );
    } catch (e) {
      // saving error
    }
  };

export default storeCart;