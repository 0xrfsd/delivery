import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Modalize } from "react-native-modalize";

import { MaterialIcons } from "@expo/vector-icons";

export class Entrega extends React.PureComponent {
  modal = React.createRef();

  renderContent = () => {
    return (
      <View style={s.content}>
        <Text style={s.content__subheading}>{"Entrega".toUpperCase()}</Text>
        <Text style={s.content__heading}>Endereço de Entrega</Text>

        <View
          style={{
            width: "100%",
            height: "auto",
            marginTop: 20,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <MaterialIcons name="location-on" style={{ marginLeft: '-2%', marginRight: '1%' }} size={20} color="black" />
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontSize: 16 }}>Av. Pres. Kennedy 289</Text>
              <Text style={{ fontSize: 16, color: '#555' }}>- Jardim Alexandrina, ...</Text>
            </View>
            <TouchableOpacity
              onPress={() => alert('calma q ta vindo fdp')}
              style={{
                width: 100,
                height: 50,
                marginLeft: 10,
                borderRadius: 5,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  };

  render() {
    return (
      <Modalize ref={this.modal} handlePosition="inside" adjustToContentHeight>
        {this.renderContent()}
      </Modalize>
    );
  }
}

const s = StyleSheet.create({
  content: {
    height: 'auto',
    padding: 20,
    marginBottom: 120
  },

  content__icon: {
    width: 32,
    height: 32,

    marginBottom: 20,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
  },

  content__heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 20,

    width: "100%",

    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#cdcdcd",
    borderRadius: 6,
  },

  content__button: {
    display: "flex",
    marginTop: "auto",
    paddingVertical: 15,

    width: "100%",

    backgroundColor: "#333",
    borderRadius: 6,
  },

  content__buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
