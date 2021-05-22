import React from "react";

import { Text, View, Pressable, SafeAreaView, TouchableOpacity } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import { TelefoneModal } from "../../components/modals/Telefone";
import { EmailModal } from "../../components/modals/Email";
import { Endereco } from "../../components/modals/Endereco";

const Screen = ({ navigation, route }) => {
  const { type, nome, email, inicialNome, userId } = route.params;

  const [modal, setModal] = React.useState([]);

  const types = [
    "Convidar amigos",
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
            onPress={() => alert("Copiado")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Seu ID</Text>
            <Text style={{ fontSize: 16, color: "#d3d3d3" }}>{userId}</Text>
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
      <View style={{ height: '80%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#333', fontSize: 20 }}>Indique o Entrega+ e ganhe R$ 10</Text>
                      <Text style={{ marginHorizontal: 20, marginTop: 10, textAlign: 'center', color: '#333', fontSize: 14 }}>Compartilhe seu código com os amigos que ainda não pedem Entrega+. Eles ganham R$10 na primeira compra e você ganha mais R$10 em seu próximo pedido.</Text>
                      <View style={{ width: '90%', margin: '5%', justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: '#f5f5f5', borderRadius: 5}}>
                      <Text style={{ color: '#333', fontWeight: 'bold'}}>{userId}</Text>
                      </View>
                      <TouchableOpacity style={{ width: '90%', marginHorizontal: '5%', justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: '#333', borderRadius: 5}}>
                      <Text style={{ color: '#fdfdfd'}}>Compartilhar</Text>
                      </TouchableOpacity>
      </View>
    );
  };

  const Enderecos = () => {
    return (
      <>
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
            onPress={() => modal[2].openModal()}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Seu endereço</Text>
            <Text style={{ fontSize: 16, color: "#d3d3d3" }}>Av. Presidente Kennedy 289</Text>
          </Pressable>
        </View>
      </>
    );
  };

  const Pagamento = () => {
    return (
      <>
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
            onPress={() => modal[2].openModal()}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Suas formas de pagamento</Text>
            <Text style={{ fontSize: 16, color: "#d3d3d3" }}>Adicionar cartão</Text>
          </Pressable>
        </View>
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
      <Endereco modal={modal} setModal={setModal} modalIndex={2} />
    </SafeAreaView>
  );
};

export default Screen;
