import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView, Image,ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { auth,db,storage } from './firebase';
import { getStorage, ref,uploadString,uploadBytes,uploadBytesResumable ,getDownloadURL} from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { doc, updateDoc,getDoc } from "firebase/firestore";
import uuid from 'uuid';


export default function EditProfilePicture({ navigation}){
  const [image, setImage] = React.useState(null);
  const [uid, setuid] = React.useState(null);
  const [data, setData] = React.useState({

  });


  const getuid = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      setuid(value);
    } catch(e) {
      console.log(e.message);
    }
  }

  const updateIntoFirebase = async (url) => {
    const docRef = doc(db, "userData", uid);
    const docSnap = await updateDoc(docRef,{
      pfp: url
    });
    navigation.navigate('ProfileScreen');
    

    docSnap.then(updateInfo =>{
      console.log(updateInfo);
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setData({...data, pfp: result.assets[0].uri});
      setImage(result.assets[0].uri);
    }
  };

  const readFromFirebase = async () => {
    const docRef = doc(db, "userData", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
    
    
  }


  useEffect(() => {
    getuid();
    readFromFirebase();
  },[uid]);

  

  const onUpload = async ()=>{
    alert('Profile is being updated!, please wait...!');
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', data.pfp, true);
      xhr.send(null);
    });
    const metadata = {
      contentType: 'image/jpeg'
    };


    // Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'pfp/' + Date.now());
const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      alert('Profile updated successfully...!')
      updateIntoFirebase(downloadURL);
    });
  }
);
  
  }

 const onDelete = ()=>{
    setData({...data, pfp: 'https://firebasestorage.googleapis.com/v0/b/my-sem-37633.appspot.com/o/default.jpeg?alt=media&token=ce70eafe-a128-485f-ba62-1a71f0ff2761'});
    updateIntoFirebase('https://firebasestorage.googleapis.com/v0/b/my-sem-37633.appspot.com/o/default.jpeg?alt=media&token=ce70eafe-a128-485f-ba62-1a71f0ff2761');
  }

    return(
        <SafeAreaView style={styles.pageContainer}>
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.heading}>Edit Profile Picture</Text>

            <Image style={styles.profileimage} source={{uri:data.pfp}}/>

           
            <TouchableOpacity style={styles.select} onPress={pickImage}>
            <AntDesign name="camerao" size={36} color="black" />
            <Text style={styles.selecttext}>Select Profile Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delete} onPress={onDelete}>
            <MaterialIcons name="delete-outline" size={36} color="red" />
            <Text style={styles.deletetext}>Delete Profile Picture</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.registerButton} onPress={onUpload}>
            <Text style={styles.registerButtonText}>Upload New Picture</Text>
            </TouchableOpacity>

            

            
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
  profileimage:{
    height: 200,
    width: 200,
    borderRadius: 140,
    borderColor: 'grey',
    borderWidth: 2,
  },
  select:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  delete:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deletetext:{
    color: 'red',
    fontSize: 24,
  },
  selecttext:{
    color: '#3f4b63',
    fontSize: 24,
  },
  registerButton:{
    backgroundColor: '#fa510e',
    width: 300,
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
});
