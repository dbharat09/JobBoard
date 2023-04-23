import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsScreen from './JobsScreen';
import AddJobs from './AddJobs';
import { Ionicons } from '@expo/vector-icons';

export default function AdminHome() {
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen name="JobsScreen" component={JobsScreen} options={{
      tabBarLabel: 'Jobs',tabBarActiveTintColor: "#f5610a",tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color='#fa510e' size={size} />
      ),
    }}/>
      <Tab.Screen name="AddJobs" component={AddJobs} options={{
      tabBarLabel: 'Add Jobs',tabBarActiveTintColor: "#f5610a",tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="add-circle-outline" size={24} color="#fa510e" />
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
