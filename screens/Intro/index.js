import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IntroScreen = ({ navigation }) => {
  const [showIntro, setShowIntro] = useState(true);

  const storeIntroShow = async (value) => {
    const json = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("@introShow", json).then(() => {
        console.log("Intro visualized");
      });
    } catch (e) {
      // saving error
    }
  };

  const getIntroShow = async () => {
    try {
      await AsyncStorage.getItem("@introShow").then((value) => {
        if (value === "true") {
          setShowIntro(true);
        }
        if (value === "false") {
          setShowIntro(false);
        }
      });
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    getIntroShow();
  }, []);

  const onSkip = () => {
    storeIntroShow(false);
    setShowIntro(false);
  };

  const _renderNextButton = () => {
    return (
      <Text style={{ color: "#333", textAlign: "center", fontWeight: "bold" }}>
        Próximo
      </Text>
    );
  };

  const _renderSkipButton = () => {
    return (
      <Text style={{ color: "#333", textAlign: "center", fontWeight: "bold" }}>
        Pular
      </Text>
    );
  };

  const Btn = () => {
    return (
      <>
        <TouchableOpacity
          style={{
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            height: 50,
            backgroundColor: "#333",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => {
            storeIntroShow(false);
            setShowIntro(false);
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#fff" }}>
            Cadastre-se agora mesmo!
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const Driver = () => {
    return (
      <>
        <TouchableOpacity
          style={{
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            height: 50,
            backgroundColor: "#333",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: "#fff" }}>
            Seja um e-driver!
            <Text style={{ fontWeight: "bold" }}> Ganhe uma $$$ extra!</Text>
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const RenderItem = ({ item }) => {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    return (
      <View
        style={{
          height: windowHeight,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
        {item.key == "s5" ? <Driver /> : null}
        {item.key == "s6" ? <Btn /> : null}
      </View>
    );
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <>
      {showIntro ? (
        <AppIntroSlider
          activeDotStyle={{ width: 30, backgroundColor: "#fff" }}
          data={slides}
          renderItem={RenderItem}
          showDoneButton={false}
          showSkipButton={true}
          showNextButton={true}
          onSkip={onSkip}
          renderNextButton={_renderNextButton}
          renderSkipButton={_renderSkipButton}
        />
      ) : (
        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor: "#333",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 100,
          }}
        >
          <Text style={styles.introTitleStyle}>Entrega+</Text>
          {/* <Image style={styles.introImageStyle} source={item.image} /> */}
          <Text style={styles.introTextStyle}>
            O Aplicativo que conecta você à tudo que precisa comprar!
          </Text>
          <Text style={styles.introTextStyle}></Text>
          <TouchableOpacity
            style={{
              width: "90%",
              marginLeft: "5%",
              marginRight: "5%",
              height: 50,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate('Register')
            }}
          >
            <Text style={{ fontWeight: "light", color: "#333" }}>
              Ainda não possui uma conta? <Text style={{ fontWeight: 'bold' }}>Crie agora!</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "90%",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: 5,
              height: 50,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate('Login')
            }}
          >
            <Text style={{ fontWeight: "light", color: "#333" }}>
              Já possui uma conta? <Text style={{ fontWeight: 'bold' }}>Entre agora!</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "90%",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: 5,
              height: 50,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              storeIntroShow(true);
              setShowIntro(true);
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#333" }}>
              Introdução
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    width: "50%",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingVertical: 30,
  },
  introTitleStyle: {
    marginTop: "15%",
    width: "70%",
    fontSize: 25,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
});

const slides = [
  {
    key: "s1",
    title: "Faça suas Compras de Casa",
    text: "É Rápido, Facil e Chega na Porta da sua Casa!",
    image: {
      uri:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png",
    },
    backgroundColor: "#20d2bb",
  },
  {
    key: "s2",
    title: "Entrega Rápida e Segura",
    text: "Seus Pedidos Chegam em no Maximo 1 hora!",
    image: {
      uri:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png",
    },
    backgroundColor: "#febe29",
  },
  {
    key: "s3",
    title: "Cupons de Desconto e muito mais",
    text: "Promoções, Descontos e Cupoms Exclusivos!",
    image: {
      uri:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png",
    },
    backgroundColor: "#22bcb5",
  },
  {
    key: "s4",
    title: "Peça Tudo o Que Você Precisa",
    text: "Láticineos, Hortifrute, Padaria até Açougue!",
    image: {
      uri:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png",
    },
    backgroundColor: "#3395ff",
  },
  {
    key: "s5",
    title: "Oportunidade de Emprego",
    text: "Seja nosso parceiro.",
    image: {
      uri:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png",
    },
    backgroundColor: "#f6437b",
  },
  {
    key: "s6",
    title: "Comece a pedir hoje mesmo!",
    text: " Simples, Rápido e Seguro.",
    image: {
      uri:
        "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png",
    },
    backgroundColor: "#febe29",
  },
];
