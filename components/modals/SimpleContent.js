import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";

const { width } = Dimensions.get("window");

export class SimpleContent extends React.PureComponent {
  modal = React.createRef();

  renderContent = () => [
    <View style={s.content__header} key="0">
      <Text style={s.content__heading}>Leite Desnatado</Text>
      <View stlye={{ display: "flex", flexDirection: "row" }}>
        <Text style={s.content__subheading}>Piracanjuba</Text>
        <Text style={s.content__subheading}>500Ml</Text>
      </View>
    </View>,

    <View style={s.content__inside} key="1">
      <Text>Ingredientes</Text>
      <Text style={s.content__paragraph}>Leite desnatado e estabilizantes trifosfato de sódio, citrato de sódio, monofosfato de sódio e difosfato de sódio. ALÉRGICOS: CONTÉM LEITE. CONTÉM LACTOSE. NÃO CONTÉM GLÚTEN.</Text>
      <Text style={s.content__paragraph}>Mantenha em local seco e arejado. Antes do uso, não necessita de refrigeração. Após aberto, manter em geladeira (1 °C a 10 °C) e consumir em até 2 dias.</Text>
      <Text style={[s.content__subheading, { marginTop: 30 }]}>
        Imagens
      </Text>

      <ScrollView style={s.content__scrollview} horizontal>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <View key={i} style={s.content__block} />
          ))}
      </ScrollView>

      <Text style={s.content__paragraph}>adgasddgsadgsda</Text>
      <Text style={[s.content__subheading, { marginTop: 30 }]}>
        Vertical ScrollView
      </Text>

      <ScrollView style={[s.content__scrollview, { height: 200 }]}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <View
              key={i}
              style={[s.content__block, { width, marginBottom: 20 }]}
            />
          ))}
      </ScrollView>

    </View>,
  ];

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  render() {
    return (
      <Modalize
        ref={this.modal}
        handlePosition="inside"
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
      >
        {this.renderContent()}
      </Modalize>
    );
  }
}

const s = StyleSheet.create({
  content__header: {
    padding: 15,
    paddingBottom: 0,

    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  content__heading: {
    marginBottom: 2,
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__subheading: {
    paddingBottom: 5,
    fontSize: 16,
    color: "#ccc",
  },

  content__inside: {
    padding: 15,
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  content__scrollview: {
    marginVertical: 20,
  },

  content__block: {
    width: 200,
    height: 80,

    marginRight: 20,

    backgroundColor: "#ccc",
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 10,

    width: "100%",

    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#cdcdcd",
    borderRadius: 6,
  },
});
