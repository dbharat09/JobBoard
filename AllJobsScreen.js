import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import JobCard from './JobCard';
import { useEffect } from 'react';
import { doc, updateDoc,getDoc } from "firebase/firestore";
import { auth,db,storage } from './firebase';


export default function AllJobScreen({navigation}) {
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
        <Text style={styles.heading}>All Jobs</Text>

        {data.jobs.filter(job =>{
            if(job.status === 'Activated'){
              return job
            }
          })
        .map((item) => (
        <JobCard title={item.jobTitle} time={item.time} location={item.location} skills={item.skills} companyName={item.companyName} variant={'home'} jobDescription={item.jobDescription} jobID={item.jobID} companySize={item.companySize} applicants={item.applicants} responsibilities={item.responsibilities} status={item.status}/>
      ))}


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
    backgroundColor: 'orange',
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
    gap:24,
    alignItems:'center',
  }
});
