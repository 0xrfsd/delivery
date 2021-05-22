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

import { FontAwesome5, Fontisto, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Carousel } from "./Carousel";

import { SnappingList } from "../../components/modals/SnappingList";
import { Produto } from "../../components/modals/Produto";
import { Entrega } from "../../components/modals/Entrega";

import ImageCardOne from "../../assets/carrefour.png";

import Data from "../../assets/data.json";

const CommerceScreen = ({ navigation, route }) => {
  const { name } = route.params;

  const [counter, setCounter] = React.useState(0);
  const [showFilter, setShowFilter] = React.useState(false);

  const [showCart, setShowCart] = React.useState(false);
  const [showEntrega, setShowEntrega] = React.useState(false);

  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const searchInput = React.createRef();
  const [data, setData] = React.useState([]);

  const [filter, setFilter] = React.useState("");
  const [filtered, setFiltered] = React.useState([]);

  const filters = [
    "Mercado",
    "Açougue",
    "Limpeza",
    "Padaria",
    "Hortifruti",
    "Higiene",
  ];

  const [modal, setModal] = React.useState([]);

  React.useEffect(() => {
    filters.map((i) => {
      if (filter === i) {
        filterHandler(filter);
        console.log(filter);
      }
    });
  }, [filter]);

  const Produtos = Data.map((i) => {
    return i.produto;
  });

  const searchHandler = (e) => {
    setSearchTerm(e);
    if (e !== "") {
      const resultItems = Produtos.filter((produto) => {
        return Array(produto).join(" ").toLowerCase().includes(e.toLowerCase());
      });
      setSearchResults(resultItems);
    } else {
      setSearchResults(Produtos);
    }
  };

  const filterHandler = (e) => {
    if (e !== "") {
      const resultItems = Produtos.filter((produto) => {
        return Array(produto).join(" ").toLowerCase().includes(e.toLowerCase());
      });
      setFiltered(resultItems);
    } else {
      setFiltered(Produtos);
    }
  };

  const images = [
    {
      key: String(Math.random()),
      image: require("../../assets/vick_vaporub.png"),
    },
    {
      key: String(Math.random()),
      image: require("../../assets/flan.png"),
    },
    {
      key: String(Math.random()),
      image: require("../../assets/rexona.png"),
    },
    {
      key: String(Math.random()),
      image: require("../../assets/rexona_sem_perfume.png"),
    },
    {
      key: String(Math.random()),
      image: require("../../assets/pastilha_valda.png"),
    },
    {
      key: String(Math.random()),
      image: require("../../assets/naftalina.png"),
    },
    {
      key: String(Math.random()),
      image: require("../../assets/flan_vigot.png"),
    },
    {
      key: String(Math.random()),
      image: require("../../assets/cocacola_ks.png"),
    },
    {
      key: String(Math.random()),
      image: require("../../assets/esparadrapo.png"),
    },
  ];

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
          padding: 10,
          height: "auto",
          borderRadius: 5,
          backgroundColor: "transparent",
        }}
        onPress={() => {
          modal[1].a(item.produto);
          modal[1].openModal();
        }}
      >
        <View
          style={{
            display: "flex",
            marginTop: "auto",
            backgroundColor: "transparent",
            height: 40,
            width: "100%",
            justifyContent: "center",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text style={{ color: "#333", fontSize: 12, textAlign: "left" }}>
            {item.produto}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const WIDTH = Dimensions.get("window").width;
  const numColumns = 2;

  const renderCarrinho = () => {
    return (
      <TouchableOpacity
        onPress={() => modal[0].openModal()}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MaterialCommunityIcons
          key={1}
          style={{ marginTop: 1 }}
          name="cart-outline"
          size={25}
          color={"#333"}
        />
        <View style={{ position: 'absolute', marginLeft: 25, height: 10, width: 10, borderRadius: 50, backgroundColor: '#f43'}}></View>   
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <View
          style={{
            height: "10%",
            paddingHorizontal: 20,
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={25} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, marginTop: 5 }}>{name}</Text>
            {renderCarrinho()}
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 5,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <FontAwesome5 name="bars" size={25} color="#999" />
          <TextInput
            value={searchTerm}
            onChangeText={(e) => {
              if (e.length > 0) {
              } else {
                Keyboard.dismiss();
                setShowFilter(false);
              }
              searchHandler(e);
            }}
            onBlur={() => {
              // setSearchTerm("");
              searchInput.current.clear();
            }}
            ref={searchInput}
            placeholder="Pesquisar"
            style={{
              borderRadius: 5,
              paddingHorizontal: 10,
              width: "80%",
              backgroundColor: "#fff",
              height: 50,
            }}
          />
          <TouchableOpacity
            disabled={searchTerm ? false : true}
            onPress={() => {
              searchInput.current.clear();
              setSearchTerm("");
              Keyboard.dismiss();
            }}
            style={{
              width: "13%",
              height: 50,
              borderRadius: 5,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {searchTerm ? (
              <MaterialIcons name="close" size={24} color={"#333"} />
            ) : (
              <Fontisto name="search" size={20} color={"#999"} />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "10%",
            width: "100%",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Carousel>
            <TouchableOpacity
              style={{ padding: 2, alignItems: "center", justifyContent: 'center'}}
              onPress={() => {
                setFilter("Mercado");
              }}
            >
              <Text style={{ marginRight: 10, fontSize: 18, textAlign: 'center', color: '#333' }}>Mercado</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 2, alignItems: "center", justifyContent: 'center'}}
              onPress={() => {
                setFilter("Açougue");
              }}
            >
              <Text style={{ marginRight: 10, fontSize: 18 }}>Açougue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 2, alignItems: "center", justifyContent: 'center'}}
              onPress={() => {
                setFilter("Limpeza");
              }}
            >
              <Text style={{ marginRight: 10, fontSize: 18 }}>Limpeza</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 2, alignItems: "center", justifyContent: 'center'}}
              onPress={() => {
                setFilter("Padaria");
              }}
            >
              <Text style={{ marginRight: 10, fontSize: 18 }}>Padaria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 2, alignItems: "center", justifyContent: 'center'}}
              onPress={() => {
                setFilter("Hortifruti");
              }}
            >
              <Text style={{ marginRight: 10, fontSize: 18 }}>Hortifruti</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 2, alignItems: "center", justifyContent: 'center'}}
              onPress={() => {
                setFilter("Higiene");
              }}
            >
              <Text style={{ marginRight: 10, fontSize: 18 }}>Higiene</Text>
            </TouchableOpacity>
          </Carousel>
        </View>
        <FlatList
          style={{
            width: "100%",
            height: "72.7%",
          }}
          data={
            searchTerm
              ? formatData(searchResults, numColumns)
              : formatData(Data, numColumns)
          }
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </SafeAreaView>
      <Produto modal={modal} setModal={setModal} modalIndex={1} />
      <SnappingList modal={modal} setModal={setModal} modalIndex={0} />
    </>
  );
};

export default CommerceScreen;
