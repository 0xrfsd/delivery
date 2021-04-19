import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Modalize } from "react-native-modalize";

import { Button } from '../button/Button';

export class SnappingList extends React.PureComponent {
  modal = React.createRef();

  renderHeader = () => (
    <View style={s.modal__header}>
      <Text style={s.modal__headerText}>Categorias</Text>
    </View>
  );

  renderContent = () => (
    <View style={s.content}>
      <View style={s.content__row}>
        <View style={s.content__avatar}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri:
                "https://avatars.githubusercontent.com/u/64338100?s=400&u=40edbc6a5cea2ddaf2e79b4a0caf6875be276582&v=4",
            }}
          />
        </View>

        <Text style={s.content__name}>Açougue</Text>
      </View>
      <View style={s.content__row}>
        <View style={s.content__avatar}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri:
                "https://avatars.githubusercontent.com/u/64338100?s=400&u=40edbc6a5cea2ddaf2e79b4a0caf6875be276582&v=4",
            }}
          />
        </View>

        <Text style={s.content__name}>Padaria</Text>
      </View>
      <View style={s.content__row}>
        <View style={s.content__avatar}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri:
                "https://avatars.githubusercontent.com/u/64338100?s=400&u=40edbc6a5cea2ddaf2e79b4a0caf6875be276582&v=4",
            }}
          />
        </View>

        <Text style={s.content__name}>Latícineos</Text>
      </View>
    </View>
  );

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  scrollToTop = () => {
    if (this.modal.current) {
      this.modal.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  render() {
    return (
      <Modalize
        ref={this.modal}
        handlePosition="inside"
        HeaderComponent={this.renderHeader}
        snapPoint={350}
      >
        {this.renderContent()}
      </Modalize>
    );
  }
}

const s = StyleSheet.create({
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: "200",
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 15,

    borderBottomColor: "#f9f9f9",
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: "hidden",

    backgroundColor: "#eee",
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: "center",
    justifyContent: "center",

    marginVertical: 20,
  },
});
