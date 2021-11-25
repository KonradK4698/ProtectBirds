import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Logowanie from './screens/logowanie';
import Rejestracja from './screens/rejestracja';
import Dashboard from './screens/dashboard';
import Zagrozenia from './screens/zagrozenia';
import gatunkiZ from './screens/gatunkiZ';
import zasady from './screens/zasady';
import ochrona from './screens/ochrona';
import dodajGatunki from './screens/addGatunki';
import dodajZagrozenia from './screens/addZagrozenia';
import dodajOchrone from './screens/addOchrona';
const Stack = createStackNavigator();




function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Rejestracja"
        component={Rejestracja}
        options={{ title: "Rejestracja" }} />
      <Stack.Screen
        name="login"
        component={Logowanie}
        options={{ title: "Logowanie" }} />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={
          { title: "Dashboard" },
          { headerLeft: null }
        } />
      <Stack.Screen
        name="Zagrozenia"
        component={Zagrozenia}
        options={
          { title: "Zagrożenia" },
          { headerLeft: null }
        } />
      <Stack.Screen
        name="gatunkiZ"
        component={gatunkiZ}
        options={{ title: 'Gatunki zagrożone' }} />
      <Stack.Screen
        name="zasady"
        component={zasady}
        options={{ title: 'Zasady' }} />
      <Stack.Screen
        name="ochrona"
        component={ochrona}
        options={{ title: 'Ochrona gatunków' }} />
      <Stack.Screen
        name="dodajGatunki"
        component={dodajGatunki}
        options={{ title: 'Dodaj Gatunki' }} />
      <Stack.Screen
        name="dodajZagrozenia"
        component={dodajZagrozenia}
        options={{ title: 'Dodaj zagrożenia' }} />
      <Stack.Screen
        name="dodajOchrone"
        component={dodajOchrone}
        options={{ title: 'Dodaj możliwości ochrony' }} />
    </Stack.Navigator>
  );
}

export default function App() {



  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}



