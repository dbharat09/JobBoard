import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView, Image } from 'react-native';
import * as React from 'react';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native"; 
 
       

export default function ProfileScreen({navigation}) {
  const focus = useIsFocused(); 
    const [data, setData] = React.useState({
        uid: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        about: '',
        experience: {
          title: '',
          institute: '',
          location: '',
          date: ''
        },
        education: {
          institute: '',
          location: '',
          date: ''
        },
        skills: '',
        headline: '',
        location: ''
      })
    const [uid, setuid] = React.useState(null);

    const getuid = async () => {
      try {
        const value = await AsyncStorage.getItem('uid');
        setuid(value);
        console.log(uid);
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


    useEffect(() => {
      getuid();
      readFromFirebase();
    },[uid,focus]);

    const toEditProfile =()=>{
      navigation.navigate('EditProfilePicture');
    }
    const toEditHeadline =()=>{
      navigation.navigate('EditHeadline');
    }
    const toEditAbout =()=>{
      navigation.navigate('EditAbout');
    }
    const toEditExperience =()=>{
      navigation.navigate('EditExperience');
    }
    const toEditEducation =()=>{
      navigation.navigate('EditEducation');
    }
    const toEditSkills =()=>{
      navigation.navigate('EditSkills');
    }
    const toAddExperience =()=>{
      navigation.navigate('AddExperience');
    }
    const toAddEducation =()=>{
      navigation.navigate('AddEducation');
    }
  return (
    <SafeAreaView style={styles.pageContainer}>
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.heading}>Profile Settings</Text>

        <View style={styles.profile}>
          <View style={styles.up}>
            <View style={styles.upleft}>
              <TouchableOpacity onPress={toEditProfile}>
              <Feather name="edit" size={24} color="white" />
              </TouchableOpacity>
              <Image style={styles.profileimage} source={{uri:data.pfp}}/>
            </View>
            <View style={styles.upright}>
              <Text style={styles.name}>{data.firstName}{' '}{data.lastName}</Text>
              <Text style={styles.email}>{data.email}</Text>
            </View>
          </View>

          <View style={styles.down}>
            <View style={styles.editsection}>
              <Text style={styles.headline}>{data.headline}</Text>
              <TouchableOpacity onPress={toEditHeadline}>
                <Feather name="edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
          <Text style={styles.location}>{data.location}</Text>
          </View>

        </View>

        <View style={styles.textsection}>
            <View style={styles.editsection}>
            <Text style={styles.about}>About</Text>
            <TouchableOpacity onPress={toEditAbout}>
            <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
            </View>
            <Text>{data.about}
            </Text>
        </View>

        <View style={styles.textsection}>
            <View style={styles.editsection}>
            <Text style={styles.experience}>Experience</Text>
            <View style={styles.editicons}>
              {/* <TouchableOpacity onPress={toAddExperience}>
              <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity> */}
            <TouchableOpacity onPress={toEditExperience}>
            <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
            </View>
            </View>
            <Text style={styles.role}>{data.experience.title}</Text>
            <Text>{data.experience.institute}</Text>
            <Text>{data.experience.startMonth}{' '}{data.experience.startYear}{' - '}{data.experience.endMonth}{' '}{data.experience.endYear}</Text>
            <Text>{data.experience.location}</Text>
        </View>

        <View style={styles.textsection}>
            <View style={styles.editsection}>
            <Text style={styles.education}>Education</Text>
            <View style={styles.editicons}>
              {/* <TouchableOpacity onPress={toAddEducation}>
              <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={toEditEducation}>
              <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            </View>
            <Text style={styles.schoolname}>{data.education.institute}</Text>
            <Text>{data.education.startMonth}{' '}{data.education.startYear}{' - '}{data.education.endMonth}{' '}{data.education.endYear}</Text>
            <Text>{data.education.location}</Text>
        </View>

        <View style={styles.textsection}>
            <View style={styles.editsection}>
            <Text style={styles.skills}>Skills</Text>
              <TouchableOpacity onPress={toEditSkills}>
              <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text>{data.skills}
            </Text>
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
    textAlign: 'center',
  },
  pageContainer:{
    flex: 1,
    backgroundColor:  'white',
  },
  container:{
    display: 'flex',
    gap:12,
  },
  profile:{
    backgroundColor: '#101f3c',
    height: "auto",
    width: '100%',
    display: 'flex',
    gap: 36,
    padding: 20,
  },
  profileimage:{
    height: 140,
    width: 140,
    borderRadius: 140,
  },
  name: {
    color : 'white',
    fontSize: 18
  },
  email:{
    color: 'white',
    fontSize: 18
  },
  headline:{
    color: 'white',
    fontSize: 16
  },
  location:{
    color: 'white',
    fontSize: 18
  },
  up:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:  'space-around',
  },
  upleft:{
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  upright:{
    display:'flex',
    gap: 12,
    marginTop: 12,
  },
  down:{
    display:'flex',
    gap: 16,
  },
  skills:{
    color: '#101f3c',
    fontSize: 24,
  },
  education:{
    color: '#101f3c',
    fontSize: 24,
  },
  schoolname:{
    color: '#3f4b63',
    fontSize: 18,
  },
  experience:{
    color: '#101f3c',
    fontSize: 24,
  },
  role:{
    color: '#3f4b63',
    fontSize: 18,
  },
  about:{
    color: '#101f3c',
    fontSize: 24,
  },
  editsection:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textsection:{
   margin: 12,
  },
  editicons:{
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  }
});
