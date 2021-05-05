import React from "react";

import { Text, View, TouchableOpacity, Platform } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const EntregaScreen = ({ navigation }) => {
  return (
    <View style={{ paddingTop: Platform.OS === 'ios' ? 10 : 0 }}>
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
      <GooglePlacesAutocomplete
      placeholder='Digite seu endereço'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyAp0QdY1q4uP3MNYuT7v4SuXSeWQpO7xIc',
        language: 'en',
      }}
      returnKeyType={'default'}
      fetchDetails={true}
      styles={{
        textInputContainer: {
          backgroundColor: '#fff',
        },
        textInput: {
          marginHorizontal: 10,
          height: 40,
          color: '#333',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
    </View>
  );
};

export default EntregaScreen;
