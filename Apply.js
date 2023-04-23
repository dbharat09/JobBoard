import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView, Image} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { doc, updateDoc,getDoc,addDoc ,collection } from "firebase/firestore";
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref,uploadString,uploadBytes,uploadBytesResumable ,getDownloadURL} from "firebase/storage";
import { auth,db,storage } from './firebase';
import { setDoc } from "firebase/firestore"; 



export default function Apply({ navigation}){
    const [uid, setuid] = React.useState(null);
    const [fileName, setFileName] = React.useState('');
    const [file, setFile] = React.useState(null);



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
    const [jobd, setjobd] = React.useState({
        responsibilities:[
            '',
            '',
        ]
    });


    const getjobd = async () => {
        try {
          const value = await AsyncStorage.getItem('jobdetails');
          const parsedvalue = JSON.parse(value);
          setjobd(parsedvalue);
        } catch(e) {
          console.log(e.message);
        }
      }

      
      useEffect(() => {
        getjobd();
      },[]);

    

    const onPick = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        setFileName(result.name);
        setFile(result.uri);
    }

    const onUpload = async ()=>{
        alert('Your Resume is being uploaded!, please wait')
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', file, true);
          xhr.send(null);
        });
    
    
        // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'resume/' + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
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
          alert('Resume uploaded successfully!')
          storeInFirebase(downloadURL);
        });
      }
    );
      
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

    const storeInFirebase = async (resumeUrl)=>{
        try {
          const docRef = await addDoc(collection(db, "applicationsData"), {
            uid: data.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            resumeUrl: resumeUrl,
            jobId: jobd.jid
          });
          console.log("Document written with ID: ", docRef);
          navigation.navigate('Home');
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
      }

    useEffect(() => {
      getuid();
      readFromFirebase();
    },[uid]);


    return(
        <SafeAreaView style={styles.pageContainer}>
        <ScrollView>
        <View style={styles.container}>

        <Text style={styles.heading}>Apply To This Job</Text>

        <Image style={styles.profileimage} source={{uri:data.pfp}}/>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Email</Text>
        <TextInput
        style={styles.input}
        value={data.email}
        
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Phone Number</Text>
        <TextInput
        style={styles.input}
        value={data.phoneNumber}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>CV / Resume</Text>
        <TouchableOpacity style={styles.uploadbutton} onPress={onPick}>
        <Text style={styles.uploadbuttonText}>Upload Resume</Text>
        </TouchableOpacity>
        </View>

        <Text style={styles.file}>{fileName}</Text>

        <View style={styles.actionbuttons}>

        <TouchableOpacity style={styles.actionbutton} onPress={onUpload}>
            <Text style={styles.buttonText}>Submit Application</Text>
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
    height: 45,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderColor: 'grey',
  },
  actionbutton:{
    backgroundColor: '#fa510e',
    width: 250,
    height: 50,
    borderRadius: 100,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadbutton:{
    backgroundColor: 'white',
    width: 220,
    height: 50,
    borderRadius: 100,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fa510e',
    borderWidth: 1,
  },
  uploadbuttonText:{
    color:'black',
    fontSize: 24,
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
  },
  profileimage:{
    height: 200,
    width: 200,
    borderRadius: 140,
    borderColor: 'grey',
    borderWidth: 2,
  },
  file:{
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
