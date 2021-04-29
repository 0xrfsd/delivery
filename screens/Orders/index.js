import React from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

const Orders = ({ navigation }) => {
  const pedidos = ["", "", "", "", ""];
  const [activeOrder, setActiveOrder] = React.useState([]);

  const formatData = (pedidos, numColumns) => {
    const totalRows = Math.floor(pedidos.length / numColumns);
    let totalLastRow = pedidos.length - totalRows * numColumns;

    return pedidos;
  };

  const _renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={{
          marginRight: 10,
          marginTop: 10,
          width: "100%",
          height: 120,
          borderRadius: 5,
          backgroundColor: "#333",
        }}
        onPress={() =>
          navigation.navigate("Order", {
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
      </Pressable>
    );
  };

  const WIDTH = Dimensions.get("window").width;
  const numColumns = 1;

  return (
    <SafeAreaView>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          height: 70,
          backgroundColor: "transparent",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#333",
            textAlign: "center",
          }}
        >
          MEUS PEDIDOS
        </Text>
      </View>
      <Text
        style={{
          color: "#333",
          marginLeft: 20,
          marginRight: 10,
        }}
      >
        Pedindo em
        <Text style={{ fontWeight: "bold" }}>
          {""} Mercadin do gemin {""}
        </Text>
        em andamento
      </Text>

      {activeOrder ? (
        <>
          <Pressable
            onPress={() => navigation.navigate("Order", {})}
            style={{
              marginBottom: 15,
              marginTop: 15,
              width: "90%",
              marginHorizontal: "5%",
              height: "15%",
              borderRadius: 5,
              backgroundColor: "#333",
            }}
          >
            <Text>Oi</Text>
          </Pressable>
        </>
      ) : null}

      {pedidos.length > 0 ? (
        <FlatList
          style={{
            marginLeft: "5%",
            marginRight: "5%",
            width: "90%",
            height: activeOrder
              ? Platform.OS === "ios"
                ? "61.4%"
                : "64.7%"
              : Platform.OS === "ios"
              ? "85.7%"
              : "87.9%",
          }}
          data={formatData(pedidos, numColumns)}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "100%",
            marginTop: "auto",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              width: "60%",
            }}
          >
            Nenhum pedido feito recentemente
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginHorizontal: "5%",
            }}
          >
            Seus últimos pedidos aparecerão aqui
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Orders;
