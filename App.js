import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
    </View>
  );
}

const RegisterScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
    </View>
  );
}

const Intro = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => navigation.navigate('Login')}>Login</Text>
      <Text onPress={() => navigation.navigate('Register')}>Register</Text>
    </View>
  );
}

const NestedStack = createStackNavigator();

const IntroScreen = () => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="Intro" component={Intro} />
      <NestedStack.Screen name="Login" component={LoginScreen} />
      <NestedStack.Screen name="Register" component={RegisterScreen} />
    </NestedStack.Navigator>
  );
}

const RootStack = createStackNavigator();

function App() {

  const [isLogged, setIsLogged] = React.useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {
          isLogged
          ? <RootStack.Screen name="Home" component={HomeScreen} /> 
          : <RootStack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;