import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import { auth,db } from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from "firebase/firestore"; 

export default function CreateAccount({navigation}) {
    const [firstname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phonenumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');

    

    const storeuid = async (value) => {
      try {
        await AsyncStorage.setItem('uid', value)
      } catch (e) {
        console.log(e.message);
      }
    }


    const storeInFirebase = async (uid)=>{
      try {
        const docRef = await setDoc(doc(db, "userData", uid), {
          uid: uid,
          firstName: firstname,
          lastName: lastname,
          email: email,
          phoneNumber: phonenumber,
          password: password,
          about: 'About Section Goes Here',
          experience: {
            title: 'Title Goes Here',
            institute: 'Institute Name Here',
            location: 'Location Here',
            startMonth: 'May',
            startYear: '2020',
            endMonth: 'June',
            endYear: '2020'
          },
          education: {
            institute: 'Institute Name Here',
            location: 'Location Here',
            startMonth: 'May',
            startYear: '2020',
            endMonth: 'June',
            endYear: '2020'
          },
          skills: 'Skills Here,Seperate by coma',
          headline: 'Headline Here,seperate by |',
          location: 'Seattle,USA',
          pfp: 'https://firebasestorage.googleapis.com/v0/b/my-sem-37633.appspot.com/o/default.jpeg?alt=media&token=ce70eafe-a128-485f-ba62-1a71f0ff2761'
        });
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    }


    const handleCreateAccount = ()=>{
      if(password != confirmpassword){
        alert('Your passwords does not match');
      }
      else if(firstname === ''){
        alert('First Name can not be empty');
      }
      else if(lastname === ''){
        alert('Last Name can not be empty');
      }
      else if(email === ''){
        alert('Email can not be empty');
      }
      else if(phonenumber === ''){
        alert('Phone number can not be empty');
      }
      else if(password === ''){
        alert('Password can not be empty');
      }
      else{
          createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential=>{
          const user = userCredential.user;
          storeInFirebase(user.uid)
          storeuid(user.uid);
          if(user.email === email){
            navigation.navigate('SignIn');
          }
        })
        .catch(error=> alert(error.message));
      }
    }

    const handle =()=>{
      navigation.navigate('Home');

    }

  return (
    <SafeAreaView style={styles.pageContainer}>
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.heading}>Create an Account</Text>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>First Name</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setFirstName(text)}
        value={firstname}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Last Name</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setLastName(text)}
        value={lastname}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Email Address</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setEmail(text)}
        value={email}
        autoCapitalize='none'
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Phone Number</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setPhoneNumber(text)}
        value={phonenumber}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Password</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setPassword(text)}
        secureTextEntry={true}
        value={password}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Confirm Password</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>{setConfirmPassword(text)}}
        secureTextEntry={true}
        value={confirmpassword}
        />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleCreateAccount}>
            <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.bottom} onPress={() => navigation.navigate('SignIn')}>Already have an account?Sign In</Text>

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
