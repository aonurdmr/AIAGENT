import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import KahveScreen from './src/screens/KahveScreen';
import TarotScreen from './src/screens/TarotScreen';
import ElScreen from './src/screens/ElScreen';
import BurcScreen from './src/screens/BurcScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0D0D1A', shadowColor: 'transparent', elevation: 0 },
          headerTintColor: '#E8D5FF',
          headerTitleStyle: { fontWeight: 'bold' },
          cardStyle: { backgroundColor: '#0D0D1A' },
        }}
      >
        <Stack.Screen name="Ana Sayfa" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Kahve" component={KahveScreen} options={{ title: '☕ Kahve Falı' }} />
        <Stack.Screen name="Tarot" component={TarotScreen} options={{ title: '🃏 Tarot' }} />
        <Stack.Screen name="El" component={ElScreen} options={{ title: '🤚 El Falı' }} />
        <Stack.Screen name="Burc" component={BurcScreen} options={{ title: '⭐ Burç Yorumu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
