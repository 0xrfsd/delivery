import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";

import {
  FontAwesome5,
} from "@expo/vector-icons";

const CategoriaScreen = ({ navigation, route }) => {
  const { id, categoria, mercados } = route.params;

  const formatData = (mercados, numColumns) => {
    const totalRows = Math.floor(mercados.length / numColumns);
    let totalLastRow = mercados.length - totalRows * numColumns;

    return mercados;
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          marginRight: 10,
          marginTop: 10,
          width: "48.5%",
          height: 150,
          borderRadius: 5,
          backgroundColor: "#333",
        }}
        onPress={() =>
          navigation.navigate("Commerce", {
            name: item,
          })
        }
      >
        <View
          style={{
            display: "flex",
            marginTop: "auto",
            backgroundColor: "#333",
            height: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text style={{ color: "#fff" }}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const WIDTH = Dimensions.get("window").width;
  const numColumns = 2;

  return (
    <>
         <View
        style={{
          paddingTop: 20,
          justifyContent: "center",
          width: "100%",
          height: "auto",
        }}
      >
      <View
        style={{
          padding: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ marginTop: "-2%" }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text>{categoria}</Text>
        <View style={{ width: 20 }}/>
      </View>
      <FlatList
        style={{ marginLeft: "5%", marginRight: "5%", width: "90%" }}
        data={formatData(mercados, numColumns)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
      </View>
    </>
  );
};

export default CategoriaScreen;
