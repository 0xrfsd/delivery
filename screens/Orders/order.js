import React from "react";

import { ScrollView, View, Text, Pressable, SafeAreaView } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

const OrderScreen = ({ navigation, route }) => {

  const [items, setItems] = React.useState([]);
  const [subtotal, setSubtotal] = React.useState();
  const [taxaServico, setTaxaServico] = React.useState();
  const [taxaEntrega, setTaxaEntrega] = React.useState();


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        onPress={() => navigation.goBack()}
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
          <View>
            <FontAwesome5
              name="angle-left"
              size={30}
              style={{ marginTop: 2, marginRight: 10 }}
              color={"#333"}
            />
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
              Voltar aos pedidos
            </Text>
            <Text style={{ color: "#333" }}>Pedido em nome do mercadin</Text>
          </View>
        </View>
        <Text style={{ color: '#f36' }}>Ajuda</Text>
      </Pressable>
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
            paddingBottom: 5,
          }}
        >
          <Text style={{ fontSize: 20, color: "#333" }}>Pedido nº 5819</Text>
          <Text style={{ fontSize: 18, color: "#999" }}>
            Realizado às 14:41 - 25/04/2021
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              height: "auto",
              display: "flex",
              flexDirection: "row",
              padding: 10,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text>Pedido entregue às 15:30</Text>
            <FontAwesome5 name="check" size={14} color={"#333"} />
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}> Agua sem gás</Text>
            <Text style={{ fontWeight: "300" }}>R$2,00</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}> Presunto Sádia </Text>
            <Text style={{ fontWeight: "300" }}>R$12,00</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}> Queijo Muçarela Seara </Text>
            <Text style={{ fontWeight: "300" }}>R$12,00</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}> Queijo Bri Seara </Text>
            <Text style={{ fontWeight: "300" }}>R$12,00</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14 }}> Subtotal </Text>
            <Text style={{ fontWeight: "500" }}>R$8,00</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14 }}> Taxa de serviço </Text>
            <Text style={{ fontWeight: "500" }}>R$8,00</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14 }}> Taxa de entrega </Text>
            <Text style={{ fontWeight: "500" }}>R$8,00</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}> Total </Text>
            <Text style={{ fontWeight: "500" }}>R$36,00</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
            paddingVertical: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Pedido pago com cartão de crédito</Text>
          <Text style={{ fontWeight: "bold" }}>VISA</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontWeight: "500" }}>Endereço de entrega</Text>
          <Text style={{ fontWeight: "300" }}>
            Av. Presidente Kennedy 289, Jardim Alexandrina - Anápolis, GO
          </Text>
        </View>
        <Pressable style={{ height: 50, width: '100%', marginTop: 10, borderRadius: 5, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' }} onPress={() => alert('oiii')}>
          <Text style={{ color: '#fff'}}>Repetir pedido</Text>
        </Pressable>

        <Pressable style={{ height: 50, width: '100%', marginTop: 10, marginBottom: 20, borderRadius: 5, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => alert('oiii')}>
          <Text style={{ color: '#333'}}>Entrar em contato com o mercado</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;
