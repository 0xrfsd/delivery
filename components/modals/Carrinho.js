import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Modalize } from "react-native-modalize";

export class Carrinho extends React.PureComponent {
  modal = React.createRef();

  produtos = [
    {
      id: "342f",
      nome: 'Leite em Pó',
      quantity: 2,
      preco: 7
    },
    {
      id: "342fa",
      nome: 'Maionese',
      quantity: 1,
      preco: 14
    },
    {
      id: "342fb",
      nome: 'Queijo',
      quantity: 1,
      preco: 10
    },
  ];

  renderContent = () => {
    return (
      <View style={s.content}>
        <Text style={s.content__subheading}>{"Carrinho".toUpperCase()}</Text>
        <Text style={s.content__heading}>Carrinho? Add Produto? n sei</Text>

      <View style={{ height: 200, width: '100%' }}></View>

        <TouchableOpacity
          style={s.content__button}
          activeOpacity={0.9}
          onPress={this.closeModal}
        >
          <Text style={s.content__buttonText}>{"Finalizar".toUpperCase()}</Text>
        </TouchableOpacity>
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
    display: "flex",
    height: 'auto',
    padding: 20,
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
