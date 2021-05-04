import React from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";

import Store from "../../assets/verduras.jpg";

import { FontAwesome5 } from "@expo/vector-icons";

const Orders = ({ navigation }) => {
  const pedidos = [];
  const [activeOrder, setActiveOrder] = React.useState(false);

  const formatData = (pedidos, numColumns) => {
    const totalRows = Math.floor(pedidos.length / numColumns);
    let totalLastRow = pedidos.length - totalRows * numColumns;

    return pedidos;
  };

  const _renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={{
          padding: 10,
          marginRight: 10,
          marginTop: 10,
          width: "100%",
          height: "auto",
          borderColor: "#333",
          borderRadius: 5,
          backgroundColor: "transparent",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 1,
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
            backgroundColor: "transparent",
            width: "100%",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Image
            style={{ width: "100%", height: 100, borderRadius: 5 }}
            source={Store}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 5,
            }}
          >
            <Text style={{ color: "#333", fontWeight: "bold", fontSize: 16 }}>
              Mercadin do gemin{" "}
            </Text>
          <Text style={{ color: "#333", fontSize: 14, marginTop: 2 }}>
              03/05/21 às 13:04
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ color: "#333" }}>Alface </Text>
          <Text style={{ color: "#333", }}>Entregue</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ color: "#333" }}>Tomate </Text>
          <Text style={{ color: "#333", }}>Pagamento online</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ color: "#333" }}>Tomate (...) </Text>
          <Text style={{ color: "#333", }}>R$198</Text>
          </View>
          </View>
        </View>
        <View
          style={{
            paddingRight: 5,
            width: "100%",
            height: "auto",
            paddingTop: 15,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              borderRadius: 5,
              width: "50%",
              height: "auto",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#333",
              textAlign: "center",
              color: "#333",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Refazer pedido
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Order", {
                order: "order",
              });
            }}
            style={{
              marginLeft: "1%",
              borderRadius: 5,
              width: "50%",
              height: "auto",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#333",
              backgroundColor: "transparent",
              textAlign: "center",
              color: "#333",
            }}
          >
            <Text
              style={{
                color: "#000",
              }}
            >
              Detalhes do pedido
            </Text>
          </Pressable>
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

      {activeOrder ? (
        <>
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
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#fff' }}>Ao ler isso, pegar pra fazer sem preguiça!</Text>
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
