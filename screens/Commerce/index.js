import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Keyboard,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";

import { FontAwesome5, Fontisto, MaterialIcons } from "@expo/vector-icons";

import { Carousel } from "./Carousel";

import { Carrinho } from "../../components/modals/Carrinho";
import { Entrega } from "../../components/modals/Entrega";

import ImageCardOne from "../../assets/carrefour.png";

const CommerceScreen = ({ navigation, route }) => {
  const { name } = route.params;

  const [counter, setCounter] = React.useState(0);
  const [showFilter, setShowFilter] = React.useState(false);

  const [showCart, setShowCart] = React.useState(false);
  const [showEntrega, setShowEntrega] = React.useState(false);

  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const searchInput = React.createRef();

  React.useEffect(() => {
  }, [])


  const produtos = [
    "Alface",
    "Tomate",
    "Rucola",
    "Banana",
    "Uva",
    "Iogurte",
    "Leite",
    "Abacate",
    "Carne Picanha",
    "Carne Cupim",
    "Carne Coxão Mole",
  ];

  const searchHandler = (e) => {
    setSearchTerm(e)
    if (e !== "") {
        const resultItems = produtos.filter((produto) => {
            return Array(produto)
                .join(" ")
                .toLowerCase()
                .includes(e.toLowerCase());
        });
        setSearchResults(resultItems);
    }
    else {
        setSearchResults(produtos);
    }
}

  const formatData = (produtos, numColumns) => {
    const totalRows = Math.floor(produtos.length / numColumns);
    let totalLastRow = produtos.length - totalRows * numColumns;

    return produtos;
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          marginRight: 10,
          marginTop: 10,
          width: "48.5%",
          height: 120,
          borderRadius: 5,
          backgroundColor: "#333",
        }}
        onPress={() =>
          navigation.navigate("Commerce", {
            name: item,
          })
        }
      >
        <View
          style={{
            display: "flex",
            marginTop: "auto",
            backgroundColor: "#333",
            height: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text style={{ color: "#fff" }}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const WIDTH = Dimensions.get("window").width;
  const numColumns = 2;

  const modal = [];

  const renderCarrinho = () => {
    return (
      <TouchableOpacity
        onPress={() => modal[0].openModal()}
        style={{
          marginLeft: "7%",
          marginTop: "-1.5%",
          display: "flex",
          flexDirection: "column",
          marginRight: 20,
        }}
      >
        <FontAwesome5
          key={1}
          style={{ marginTop: 1 }}
          name="shopping-cart"
          size={20}
          color={"#333"}
        />
        <View
          style={{
            marginLeft: 25,
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#333",
            padding: 3,
            paddingRight: 3.5,
            paddingBottom: 3.5,
            height: "auto",
            width: 20,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>{counter}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
    <SafeAreaView>
      <View style={{ marginTop: 10, display: "flex", flexDirection: "row" }}>
        <View
          style={{
            padding: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{ marginTop: "-2%" }}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Image
            resizeMode={"contain"}
            style={{
              marginLeft: "10%",
              marginTop: "-1%",
              height: 20,
              width: "70%",
            }}
            source={ImageCardOne}
          />
          {renderCarrinho()}
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
      <TouchableOpacity
          onPress={() => {
            searchInput.current.clear();
            setShowFilter(!showFilter);
            Keyboard.dismiss();
          }}
          style={{
            marginLeft: "5%",
            width: "13%",
            height: 50,
            borderRadius: 5,
            backgroundColor: "#333",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showFilter ? (
            <Fontisto name="minus-a" size={20} color={"#fff"} />
          ) : (
            <Fontisto name="nav-icon-list-a" size={20} color={"#fff"} />
          )}
        </TouchableOpacity>
        <TextInput
          value={searchTerm}
          onChangeText={(e) => {
            searchHandler(e);
          }}
          onBlur={() => {
            // setSearchTerm("");
            searchInput.current.clear();
          }}
          ref={searchInput}
          placeholder="Pesquise por produtos ou marca"
          style={{
            borderRadius: 5,
            padding: 10,
            width: "60%",
            marginLeft: '2%',
            marginRight: "2%",
            marginBottom: "5%",
            backgroundColor: "#fff",
            height: 50,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            searchInput.current.clear();
            setSearchTerm("");
            Keyboard.dismiss();
          }}
          style={{
            width: "13%",
            height: 50,
            borderRadius: 5,
            backgroundColor: "#333",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {searchTerm ? (
            <MaterialIcons name="close" size={20} color={"#fff"} />
          ) : (
            <Fontisto name="search" size={20} color={"#fff"} />
          )}
        </TouchableOpacity>
      </View>
      {showFilter 
      ? (
        <View style={{ width: '100%', height: '100%', padding: 20, backgroundColor: 'transparent' }}>
          <TouchableOpacity>
            <Text>Mercearia</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Mercearia</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Mercearia</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Mercearia</Text>
          </TouchableOpacity>
        </View>
      )
      : null
      }
      <FlatList
        style={{
          marginLeft: "5%",
          marginRight: "5%",
          width: "90%",
          height: "77.3%",
        }}
        data={searchTerm ? formatData(searchResults, numColumns) : formatData(produtos, numColumns)}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </SafeAreaView>
          <Carrinho
          ref={(el) => {
            modal[0] = el;
          }}
        />
        </>
  );
};

export default CommerceScreen;
