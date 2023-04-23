import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import JobCard from './JobCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { doc, updateDoc,getDoc } from "firebase/firestore";
import { auth,db,storage } from './firebase';


export default function SearchScreen({navigation}) {
    const [search, setSearch] = useState('');
    const [isFocus, setIsFocus] = useState(false);


    const [data, setData] = React.useState({
      jobs:[
        {
          jobTitle: '',
        }
      ],
    });


    const readFromFirebase = async () => {
      const docRef = doc(db, "jobsData", 'jobArray');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
      
      
    }

    useEffect(() => {
      readFromFirebase();
    },[]);

     






  return (
    <SafeAreaView style={styles.pageContainer}>
    <ScrollView>
    <View style={styles.container}>


        <View style={styles.profile}>

          <Text  style={styles.heading}>Find your Job</Text>

          <View style={styles.searchwrapper}>
          <TextInput
            style={styles.input}
            placeholder='Job title or Keyword'
            placeholderTextColor="#FFFFFF"
            onChangeText={(text)=>setSearch(text)}

            />
            

            <TouchableOpacity style={styles.registerButton} >
            <Text style={styles.registerButtonText}>Search</Text>
            </TouchableOpacity>

          </View>
        </View>

        
        {/* {data.jobs.map((item) => (
        <JobCard title={item.jobTitle} time={item.time} location={item.location} skills={item.skills} companyName={item.companyName} variant={'home'} jobDescription={item.jobDescription} jobid={item.jobID} companySize={item.companySize} applicants={item.applicants} responsibilities={item.responsibilities}/>
        ))} */}
        <View style={styles.cards}>
        {
          data.jobs.filter(job =>{
            if(search === '' && job.status === 'Activated'){
              return job
            }
            else if((job.jobTitle.toLowerCase().includes(search.toLowerCase()) || job.time.toLowerCase().includes(search.toLowerCase()) || job.location.toLowerCase().includes(search.toLowerCase()) || job.skills.toLowerCase().includes(search.toLowerCase()) || job.companyName.toLowerCase().includes(search.toLowerCase()) || job.companySize.toLowerCase().includes(search.toLowerCase()) )&& job.status === 'Activated'){
              return job
            }
          }).map((item) => (
            <JobCard title={item.jobTitle} time={item.time} location={item.location} skills={item.skills} companyName={item.companyName} variant={'home'} jobDescription={item.jobDescription} jobID={item.jobID} companySize={item.companySize} applicants={item.applicants} responsibilities={item.responsibilities} status={item.status}/>
            ))
        }
        </View>



    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    heading: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderBottomWidth:1,
    borderBottomColor: 'white',
    padding: 1,
    color: 'white',
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
    width: 100,
    height: 40,
    borderRadius: 12,
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
  },
  profile:{
    backgroundColor: '#101f3c',
    height: 200,
    width: '100%',
    display: 'flex',
    gap: 36,
    padding: 20,
  },
  searchwrapper:{
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    justifyContent:'space-evenly',
  },
  dropdown: {
    height: 40,
    width:120,
  },
  placeholderStyle: {
    color: 'white',
  },
  selectedTextStyle: {
    color: 'white',
  },
  cards:{
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap:24,
  }
});
