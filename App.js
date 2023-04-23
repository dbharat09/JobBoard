
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';
import Home from './Home';
import EditProfilePicture from './EditProfilePicture';
import EditHeadline from './EditHeadline';
import EditAbout from './EditAbout';
import EditExperience from './EditExperience';
import EditEducation from './EditEducation';
import EditSkills from './EditSkills';
import JobDetails from './JobDetails';
import Apply from './Apply';
import SignInAdmin from './SignInAdmin';
import AdminHome from './AdminHome';
import JobDetailsAdmin from './JobDetailsAdmin';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateAccount" >
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerTitle: '' }}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerTitle: '' }}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EditProfilePicture" component={EditProfilePicture}/>
        <Stack.Screen name="EditHeadline" component={EditHeadline}/>
        <Stack.Screen name="EditAbout" component={EditAbout}/>
        <Stack.Screen name="EditExperience" component={EditExperience}/>
        <Stack.Screen name="EditEducation" component={EditEducation}/>
        <Stack.Screen name="EditSkills" component={EditSkills}/>
        <Stack.Screen name="JobDetails" component={JobDetails}/>
        <Stack.Screen name="Apply" component={Apply}/>
        <Stack.Screen name="SignInAdmin" component={SignInAdmin}/>
        <Stack.Screen name="AdminHome" component={AdminHome}/>
        <Stack.Screen name="JobDetailsAdmin" component={JobDetailsAdmin}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
