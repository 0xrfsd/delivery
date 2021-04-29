import React from "react";

import { Text, View, Pressable, SafeAreaView, TextInput } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import { TelefoneModal } from "../../components/modals/Telefone";
import { EmailModal } from "../../components/modals/Email";

const Screen = ({ navigation, route }) => {
  const { type, nome, email, inicialNome } = route.params;

  const nomeSobrenome = nome.split(" ");
  const primeiroNome = nomeSobrenome[0];
  const sobrenome = nomeSobrenome[1];

  const [modal, setModal] = React.useState([]);

  const types = [
    "Convide um amigo",
    "Endereços",
    "Formas de pagamento",
    "Ajuda",
    "Configurações",
    "Privacidade",
    "Cresca conosco",
    "Gostaria de sugerir algo pra gente?",
    "Gostaria de receber uma renda extra?",
  ];

  React.useEffect(() => {
    render();
  }, []);

  const render = () => {
    type === "Editar" ? setEditar(true) : null;
    type === types[0] ? setConvidar(true) : null;
    type === types[1] ? setEnderecos(true) : null;
    type === types[2] ? setPagamento(true) : null;
    type === types[3] ? setAjuda(true) : null;
    type === types[4] ? setConfiguracoes(true) : null;
    type === types[5] ? setPrivacidade(true) : null;
    type === types[6] ? setCrescaConosco(true) : null;
    type === types[7] ? setSugerir(true) : null;
    type === types[8] ? setRendaExtra(true) : null;
  };

  const [editar, setEditar] = React.useState(false);
  const [convidar, setConvidar] = React.useState(false);
  const [enderecos, setEnderecos] = React.useState(false);
  const [pagamento, setPagamento] = React.useState(false);

  const [ajuda, setAjuda] = React.useState(false);
  const [configuracoes, setConfiguracoes] = React.useState(false);
  const [privacidade, setPrivacidade] = React.useState(false);
  const [crescaConosco, setCrescaConosco] = React.useState(false);
  const [sugerir, setSugerir] = React.useState(false);
  const [rendaExtra, setRendaExtra] = React.useState(false);

  const Editar = () => {
    return (
      <>
        <View
          style={{
            height: "auto",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              height: Platform.OS === "ios" ? 80 : 70,
              width: "100%",
              paddingVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => modal[0].openModal()}
          >
            <Text style={{ fontSize: 18, color: "#333", fontWeight: "bold" }}>
              Trocar a foto de perfil
            </Text>
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e9e9e9",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{inicialNome}</Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 10,
            height: "auto",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              paddingVertical: 10,
              height: "auto",
              width: "100%",
            }}
            onPress={() => modal[0].openModal()}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Seu nome</Text>
            <Text style={{ fontSize: 16, color: "#d3d3d3" }}>{nome}</Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 10,
            height: "auto",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              paddingVertical: 10,
              height: "auto",
              width: "100%",
            }}
            onPress={() => modal[1].openModal()}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Seu email</Text>
            <Text style={{ fontSize: 16, color: "#d3d3d3" }}>{email}</Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 10,
            height: "auto",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              paddingVertical: 10,
              height: "auto",
              width: "100%",
            }}
            onPress={() => modal[0].openModal()}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Seu telefone
            </Text>
            <Text style={{ fontSize: 16, color: "#d3d3d3" }}>
              +55 (00) 00000-0000
            </Text>
          </Pressable>
        </View>
      </>
    );
  };

  const Convidar = () => {
    return (
      <>
        <Text>Convidar</Text>
      </>
    );
  };

  const Enderecos = () => {
    return (
      <>
        <Text>Enderecos</Text>
      </>
    );
  };

  const Pagamento = () => {
    return (
      <>
        <Text>Pagamento</Text>
      </>
    );
  };

  const Ajuda = () => {
    return (
      <>
        <Text>Ajuda</Text>
      </>
    );
  };

  const Configuracoes = () => {
    return (
      <>
        <Text>Configuracoes</Text>
      </>
    );
  };

  const Privacidade = () => {
    return (
      <>
        <Text>Privacidade</Text>
      </>
    );
  };

  const CrescaConosco = () => {
    return (
      <>
        <Text>CrescaConosco</Text>
      </>
    );
  };

  const Sugerir = () => {
    return (
      <>
        <Text>Sugerir</Text>
      </>
    );
  };

  const RendaExtra = () => {
    return (
      <>
        <Text>RendaExtra</Text>
      </>
    );
  };

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
              Voltar ao perfil
            </Text>
            <Text style={{ color: "#333" }}>{type}</Text>
          </View>
        </View>
      </Pressable>
      <View
        style={{
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
        }}
      >
        {editar ? (
          <Editar />
        ) : convidar ? (
          <Convidar />
        ) : enderecos ? (
          <Enderecos />
        ) : pagamento ? (
          <Pagamento />
        ) : ajuda ? (
          <Ajuda />
        ) : configuracoes ? (
          <Configuracoes />
        ) : privacidade ? (
          <Privacidade />
        ) : crescaConosco ? (
          <CrescaConosco />
        ) : sugerir ? (
          <Sugerir />
        ) : rendaExtra ? (
          <RendaExtra />
        ) : null}
      </View>
      <TelefoneModal modal={modal} setModal={setModal} modalIndex={0} />
      <EmailModal modal={modal} setModal={setModal} modalIndex={1} />
    </SafeAreaView>
  );
};

export default Screen;
