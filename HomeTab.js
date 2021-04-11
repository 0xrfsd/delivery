import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Fontisto, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from './screens/Home/';
import ProfileScreen from './screens/Profile/';

const Tab = createBottomTabNavigator();


const HomeTabNavigator = () => {
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