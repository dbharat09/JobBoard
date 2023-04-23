import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView, Image} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import React from 'react';
import { db } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { doc, updateDoc,getDoc } from "firebase/firestore";


export default function EditExperience({ navigation}){

 
  const [isFocus, setIsFocus] = useState(false);
  const [uid, setuid] = React.useState(null);
  const [data, setData] = React.useState({
    experience:{
      title: '',

    }
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
      experience:{
          title: data.experience.title,
          institute: data.experience.institute,
          location:  data.experience.location,
          startMonth:  data.experience.startMonth,
          startYear:  data.experience.startYear,
          endMonth: data.experience.endMonth,
          endYear:  data.experience.endYear,
      }
    });
    navigation.navigate('ProfileScreen');

    docSnap.then(updateInfo =>{
      console.log(updateInfo);

    })
  }

  

  useEffect(() => {
    getuid();
    readFromFirebase();
  },[uid]);

  const onUpdate =()=>{
    updateIntoFirebase();
  }

  const onSkip = () => {
    navigation.navigate('ProfileScreen');
  }


  const data1 = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];
  const data2 = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];
  const data3 = [
    { label: '1999', value: '1' },
    { label: '2000', value: '2' },
    { label: '2001', value: '3' },
    { label: '2002', value: '4' },
    { label: '2003', value: '5' },
    { label: '2004', value: '6' },
    { label: '2005', value: '7' },
    { label: '2006', value: '8' },
    { label: '2007', value: '9' },
    { label: '2008', value: '10' },
    { label: '2009', value: '11' },
    { label: '2010', value: '12' },
    { label: '2011', value: '13' },
    { label: '2012', value: '14' },
    { label: '2013', value: '15' },
    { label: '2014', value: '16' },
    { label: '2015', value: '17' },
    { label: '2016', value: '18' },
    { label: '2017', value: '19' },
    { label: '2018', value: '20' },
    { label: '2019', value: '21' },
    { label: '2020', value: '22' },
    { label: '2021', value: '23' },
    { label: '2022', value: '24' },
    { label: '2023', value: '25' }
  ];
  const data4 = [
    { label: '1999', value: '1' },
    { label: '2000', value: '2' },
    { label: '2001', value: '3' },
    { label: '2002', value: '4' },
    { label: '2003', value: '5' },
    { label: '2004', value: '6' },
    { label: '2005', value: '7' },
    { label: '2006', value: '8' },
    { label: '2007', value: '9' },
    { label: '2008', value: '10' },
    { label: '2009', value: '11' },
    { label: '2010', value: '12' },
    { label: '2011', value: '13' },
    { label: '2012', value: '14' },
    { label: '2013', value: '15' },
    { label: '2014', value: '16' },
    { label: '2015', value: '17' },
    { label: '2016', value: '18' },
    { label: '2017', value: '19' },
    { label: '2018', value: '20' },
    { label: '2019', value: '21' },
    { label: '2020', value: '22' },
    { label: '2021', value: '23' },
    { label: '2022', value: '24' },
    { label: '2023', value: '25' }
  ];
    

  
    return(
        <SafeAreaView style={styles.pageContainer}>
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.heading}>Edit Experience</Text>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Title</Text>
        <TextInput
        style={styles.input}
        defaultValue={data.experience.title}
        onChangeText={(text)=>setData({...data,experience:{...data.experience,title:text}})}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Company Name</Text>
        <TextInput
        style={styles.input}
        defaultValue={data.experience.institute}
        onChangeText={(text)=>setData({...data,experience:{...data.experience,institute:text}})}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Start Date</Text>
        <View style={styles.datewrapper}>
        <Dropdown
          style={styles.inputdate}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={data.experience.startMonth}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          searchPlaceholder="Search..."
          value={data.experience.startMonth}
          onChange={item => {
            setData({...data,experience:{...data.experience,startMonth:item.label}});
            setIsFocus(false);
          }}
            />
            <Dropdown
          style={styles.inputdate}
          data={data3}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={data.experience.startYear}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          searchPlaceholder="Search..."
          value={data.experience.startYear}
          onChange={item => {
            setData({...data,experience:{...data.experience,startYear:item.label}});
            setIsFocus(false);
          }}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>End Date</Text>
        <View style={styles.datewrapper}>
        <Dropdown
          style={styles.inputdate}
          data={data2}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={data.experience.endMonth}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          searchPlaceholder="Search..."
          value={data.experience.endMonth}
          onChange={item => {
            setData({...data,experience:{...data.experience,endMonth:item.label}});
            setIsFocus(false);
          }}
            />
            <Dropdown
          style={styles.inputdate}
          data={data4}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={data.experience.endYear}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          searchPlaceholder="Search..."
          value={data.experience.endYear}
          onChange={item => {
            setData({...data,experience:{...data.experience,endYear:item.label}});
            setIsFocus(false);
          }}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Location</Text>
        <TextInput
        style={styles.input}
        defaultValue={data.experience.location}
        onChangeText={(text)=>setData({...data,experience:{...data.experience,location:text}})}
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
    height: 40,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderColor: 'grey',
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
  },
  datewrapper:{
    display: 'flex',
    flexDirection: 'row',
    gap:10,
  },
  inputdate: {
    height: 40,
    width: 140,
    borderWidth: 1,
    padding: 10,
    borderColor: 'grey',
  },
});
