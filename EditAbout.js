import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView, Image} from 'react-native';
import React from 'react';
import { db } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { doc, updateDoc,getDoc } from "firebase/firestore";


export default function EditAbout({ navigation}){
  const [uid, setuid] = React.useState(null);
  const [data, setData] = React.useState({
   
  })



  const getuid = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      setuid(value);
    } catch(e) {
      console.log(e.message);
    }
  }

  const readFromFirebase = async () => {
    const docRef = doc(db, "userData", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
    
    
  }

  const updateIntoFirebase = async () => {
    const docRef = doc(db, "userData", uid);
    const docSnap = await updateDoc(docRef,{
      about: data.about
    });
    navigation.navigate('ProfileScreen');

    docSnap.then(updateInfo =>{
      console.log(updateInfo);
    })
  }

  const onSkip = () => {
    navigation.navigate('ProfileScreen');
  }

  useEffect(() => {
    getuid();
    readFromFirebase();
  },[uid]);

  const onUpdate =()=>{
    updateIntoFirebase();
  }

  

    return(
        <SafeAreaView style={styles.pageContainer}>
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.heading}>Edit About</Text>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>About</Text>
        <TextInput
         multiline = {true}
        numberOfLines = {10}
        style={styles.input}
        defaultValue={data.about}
        onChangeText={(text)=>setData({...data, about: text})}
        />
        </View>


        <View style={styles.actionbuttons}>

        <TouchableOpacity style={styles.actionbutton} onPress={onSkip}>
            <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionbutton} onPress={onUpdate}>
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        </View>


            
        </View>
        </ScrollView>
        </SafeAreaView>
    
    );
}



const styles = StyleSheet.create({
    heading: {
    color: '#3f4b63',
    fontSize: 24,
    marginTop: 12,
  },
  pageContainer:{
    flex: 1,
    backgroundColor:  'white',
  },
  container:{
    display: 'flex',
    alignItems: 'center',
    gap:24,
  },
  inputWrapper:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 12,
  },
  inputheading:{
    color:'grey',
  },
  input: {
    height: 300,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderColor: 'grey',
    wordWrap: 'break-word',
  },
  actionbutton:{
    backgroundColor: '#3f4b63',
    width: 140,
    height: 40,
    borderRadius: 100,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color:'white',
    fontSize: 24,
  },
  actionbuttons:{
    display: 'flex',
    flexDirection: 'row',
    gap: 36,
    marginTop: 24,
  }
});
