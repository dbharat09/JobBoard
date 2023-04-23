import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import AllJobScreen from './AllJobsScreen';
import ProfileScreen from './ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
      tabBarLabel: 'Home',tabBarActiveTintColor: "#f5610a",tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color='#fa510e' size={size} />
      ),
    }}/>
      <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
      tabBarLabel: 'Search',tabBarActiveTintColor: "#f5610a",tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="search" color='#fa510e' size={size} />
      ),
    }}/>
      <Tab.Screen name="AllJobScreen" component={AllJobScreen} options={{
      tabBarLabel: 'All Jobs',tabBarActiveTintColor: "#f5610a",tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="briefcase-outline" color='#fa510e' size={size} />
      ),
    }}/>
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
      tabBarLabel: 'Profile',tabBarActiveTintColor: "#f5610a",tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" color='#fa510e' size={size} />
      ),
    }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
