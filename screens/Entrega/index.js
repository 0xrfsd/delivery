import React from "react";

import { Text, View, TouchableOpacity, Platform } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const EntregaScreen = ({ navigation, locationA }) => {
  return (
    <View style={{ paddingTop: Platform.OS === "ios" ? 10 : 0 }}>
      <TouchableOpacity
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
              Voltar aos mercados
            </Text>
            <Text style={{ color: "#333" }}>Endereço de Entrega</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* <GooglePlacesAutocomplete
        currentLocation={true}
        currentLocationLabel={'Localização atual'}
        placeholder="Pesquisar seu endereço"
        onPress={(data, details = null) => {
        }}
        fetchDetails={true}
        query={{
          key: "AIzaSyAp0QdY1q4uP3MNYuT7v4SuXSeWQpO7xIc",
          language: "pt-br",
        }}
        styles={{ listView: { position: 'absolute', marginTop: 40, height: 500, width: '100%'} }}
      /> */}
    </View>
  );
};

export default EntregaScreen;
