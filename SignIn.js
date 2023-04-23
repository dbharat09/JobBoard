import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SignIn({navigation}) {
    const [email, onEmailChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');

    const storeuid = async (value) => {
      try {
        await AsyncStorage.setItem('uid', value)
      } catch (e) {
        console.log(e.message);
      }
    }

    const onLogIn =()=>{
      if(email === ''){
        alert('Email can not be empty');
      }
      else if(password === ''){
        alert('Password can not be empty');
      }
      else{
        signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      storeuid(user.uid);
      if(user.email === email){
        navigation.navigate('Home');
      }
      })
    .catch(error=> alert(error.message));
      }

    }

  return (
    <SafeAreaView style={styles.pageContainer}>
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.heading}>Sign In</Text>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Email Address</Text>
        <TextInput
        style={styles.input}
        onChangeText={onEmailChange}
        value={email}
        autoCapitalize='none'
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Password</Text>
        <TextInput
        style={styles.input}
        onChangeText={onPasswordChange}
        secureTextEntry={true}
        value={password}
        />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={onLogIn}>
            <Text style={styles.registerButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.bottom} onPress={() => navigation.navigate('CreateAccount')}>Don't have an account?Register</Text>

        <Text style={styles.bottom}>or</Text>

        <TouchableOpacity style={styles.registerButton2} onPress={()=>navigation.navigate('SignInAdmin')}>
            <Text style={styles.registerButtonText}>Sign In as Admin</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    heading: {
    color: 'grey',
    fontSize: 36,
    marginTop: 24,
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderColor: 'grey',
  },
  inputWrapper:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 8,
  },
  inputheading:{
    color:'grey',
  },
  registerButton:{
    backgroundColor: '#fa510e',
    width: 140,
    height: 40,
    borderRadius: 100,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText:{
    color:'white',
    fontSize: 24,
  },
  registerButton2:{
    backgroundColor: '#fa510e',
    width: 200,
    height: 40,
    borderRadius: 100,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom:{
    color:'grey',
    fontSize: 24,
  },
  pageContainer:{
    flex: 1,
    backgroundColor:  'white',
  },
  container:{
    display: 'flex',
    alignItems:'center',
    gap:24,
  }
});
