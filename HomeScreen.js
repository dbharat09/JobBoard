import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import JobCard from './JobCard';
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect,useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, updateDoc,getDoc } from "firebase/firestore";
import { auth,db,storage } from './firebase';

export default function HomeScreen({navigation}) {
    const [email, onEmailChange] = React.useState('');
    const [uid, setuid] = React.useState('');
    const [data, setData] = React.useState({
      jobs:[
        {
          jobTitle: '',
        }
      ],
    });

    const getuid = async () => {
      try {
        const value = await AsyncStorage.getItem('uid');
        console.log(value);
      } catch(e) {
        console.log(e.message);
      }
    }


    useEffect(() => {
      getuid();
      readFromFirebase();
    },[]);

    const readFromFirebase = async () => {
      const docRef = doc(db, "jobsData", 'jobArray');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
      
      
    }
    
    
    

    const toAllJobs = ()=>{
      navigation.navigate('AllJobScreen');
    }
  return (
    <SafeAreaView style={styles.pageContainer}>
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.heading}>Find your Job</Text>
        
       <View style={styles.viewallwrapper}>
        <Text style={styles.topjobs}>Top Jobs</Text>
        <TouchableOpacity onPress={toAllJobs}>
        <View  style={styles.arrowwrapper}>
        <Text style={styles.viewall}>View All</Text>
        <AntDesign name="arrowright" size={24} color="black" />
        </View>
        </TouchableOpacity>
        </View>

        {data.jobs.filter(job =>{
            if(job.status === 'Activated'){
              return job
            }
          })
        .map((item) => (
        <JobCard title={item.jobTitle} time={item.time} location={item.location} skills={item.skills} companyName={item.companyName} variant={'home'} jobDescription={item.jobDescription} jobID={item.jobID} companySize={item.companySize} applicants={item.applicants} responsibilities={item.responsibilities} status={item.status}/>
      ))}

        <View style={styles.viewallwrapper}>
        <Text style={styles.recentjobs}>Recent Jobs</Text>
        <TouchableOpacity onPress={toAllJobs}>
        <View  style={styles.arrowwrapper}>
        <Text style={styles.viewall}>View All</Text>
        <AntDesign name="arrowright" size={24} color="black" />
        </View>
        </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    heading: {
    color: 'black',
    fontSize: 24,
    marginTop: 12,
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
    alignItems:'center',
    gap:24,
  },
  topjobs:{
    fontSize:20,
    fontWeight: 600,
  },
  recentjobs:{
    fontSize:20,
    fontWeight: 600,
  },
  viewall:{
   fontSize: 14,
  },
  viewallwrapper:{
    display: 'flex',
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-between',
    width: '90%',
  },
  arrowwrapper:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
});
