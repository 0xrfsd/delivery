import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginModal } from "../../components/modals/LoginModal";
import { RegisterModal } from "../../components/modals/RegisterModal";

const IntroScreen = ({ navigation }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [modal, setModal] = React.useState([])
  const [loginOpened, setLoginOpened] = React.useState(false);

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

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ color: "#fff" }}>Proximo</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          storeIntroShow(false);
          setShowIntro(false);
        }}
        style={styles.buttonCircle}
      >
        <Text style={{ color: "#fff" }}>Pronto!</Text>
      </TouchableOpacity>
    );
  };

  const RenderItem = ({ item }) => {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    return (
      <ImageBackground
        opacity={0.5}
        source={item.image}
        style={{
          width: windowWidth,
          flex: 1,
          backgroundColor: "#333",
          padding: 20,
          paddingBottom: "15%",
          display: "flex",
        }}
      >
        <Text
          style={{
            color: "#fff",
            display: "flex",
            marginTop: "5%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 10,
            fontSize: 32,
          }}
        >
          Entrega <Text style={{ fontWeight: "bold" }}>+</Text>
        </Text>
        <Text
          style={{
            fontSize: 26,
            color: "#fff",
            marginTop: "100%",
            fontWeight: "bold",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            textAlign: "left",
            marginBottom: "20%",
          }}
        >
          {item.text}
        </Text>
      </ImageBackground>
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
          showDoneButton={true}
          showSkipButton={false}
          showNextButton={true}
          onSkip={onSkip}
          bottomButton={true}
          renderNextButton={_renderNextButton}
          renderDoneButton={_renderDoneButton}
        />
      ) : (
        <ImageBackground
          opacity={0.5}
          source={{
            uri:
              "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          }}
          style={{
            width: windowWidth,
            flex: 1,
            backgroundColor: "#333",
            padding: 20,
            paddingBottom: "15%",
            display: "flex",
          }}
        >
          <Text
            style={{
              color: "#fff",
              display: "flex",
              marginTop: "5%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 10,
              fontSize: 32,
            }}
          >
            Entrega <Text style={{ fontWeight: "bold" }}>+</Text>
          </Text>
            <View style={{ display: 'flex', flexDirection: 'column', marginTop: '65%' }}>
            <Text
            style={{
              color: "#fff",
              display: "flex",
              marginBottom: 10,
              fontSize: 26,
            }}
          >
            O<Text style={{ fontWeight: "bold" }}> futuro da entrega </Text>
            chegou ao Brasil. Comece a pedir agora mesmo!
          </Text>
          <Text
            style={{
              color: "#fff",
              display: "flex",
              marginBottom: 20,
              fontSize: 14,
            }}
          >
            Conheça nossas opções
          </Text>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              modal[1].openModal();
            }}
          >
            <Text style={{ color: "#333" }}>
              Ainda não possui uma conta?{" "}
              <Text style={{ fontWeight: "bold" }}>Crie agora!</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              marginTop: 5,
              height: 50,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              modal[0].openModal();
            }}
          >
            <Text style={{ color: "#333" }}>
              Já possui uma conta?{" "}
              <Text style={{ fontWeight: "bold" }}>Peça agora!</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
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
              {" "}
              Faça parte do nosso time de entrega
            </Text>
          </TouchableOpacity>
            </View>
            <LoginModal modal={modal} setModal={setModal} modalIndex={0} />
            <RegisterModal modal={modal} setModal={setModal} modalIndex={1} />
        </ImageBackground>
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
    marginTop: "auto",
    display: "flex",
    width: "50%",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingVertical: 30,
  },
  introTitleStyle: {
    marginTop: "auto",
    width: "40%",
    fontSize: 35,
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
  },
  buttonCircle: {
    width: "100%",
    marginTop: 10,
    height: 50,
    backgroundColor: "rgba(0, 0, 0, .5)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

const slides = [
  {
    key: "s1",
    title: "Entrega rápida e segura, peça na sua casa!",
    text: "Padrão de segurança pra quem lida com cartão de crédito.",
    image: {
      uri:
        "https://images.pexels.com/photos/4391479/pexels-photo-4391479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    },
    backgroundColor: "#febe29",
  },
  {
    key: "s2",
    title: "Cupons de desconto e muito mais!",
    text: "Promoções, Descontos e Cupoms Exclusivos.",
    image: {
      uri:
        "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    backgroundColor: "#22bcb5",
  },
  {
    key: "s3",
    title: "Faça suas compras sem sair de casa!",
    text: "É Rápido, Facil e Chega na porta da sua Casa.",
    image: {
      uri:
        "https://images.pexels.com/photos/4350099/pexels-photo-4350099.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    },
    backgroundColor: "#20d2bb",
  },
  {
    key: "s4",
    title: "Peça tudo o que você precisa!",
    text: "Láticineos, Hortifrute, Padaria até Açougue.",
    image: {
      uri:
        "https://images.pexels.com/photos/3218467/pexels-photo-3218467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    backgroundColor: "#3395ff",
  },
  {
    key: "s5",
    title: "Faça parte da nova geração de entrega!",
    text: "Junte-se ao nosso time de entrega hoje mesmo e cresça conosco.",
    image: {
      uri:
        "https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    },
    backgroundColor: "#f6437b",
  },
  {
    key: "s6",
    title: "Um novo conceito de delivery te espera!",
    text: "Clique no botão para começar a pedir hoje mesmo.",
    image: {
      uri:
        "https://images.pexels.com/photos/6567350/pexels-photo-6567350.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    },
    backgroundColor: "#febe29",
  },
];
