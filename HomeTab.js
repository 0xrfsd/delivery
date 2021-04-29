import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text, View } from "react-native";

import { Fontisto, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "./screens/Home/";
import ProfileScreen from "./screens/Profile/index.js";
import OrderScreen from "./screens/Orders/index.js";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const [orderActive, setOrderActive] = React.useState(true);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#f15454",
        safeAreaInsets: {
          bottom: 0,
          top: 0,
        },

        style: {
          height: 60,
          backgroundColor: "#fff",
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Mercados"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shopping-basket" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome5 name="clipboard-list" size={25} color={color} />
              {orderActive ? (
                <View
                  style={{
                    marginLeft: 20,
                    width: 15,
                    height: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: '#f15454',
                    position: "absolute",
                  }}
                >
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: '#fff',
                      position: "absolute",
                    }}
                  />
                </View>
              ) : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Você"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
