import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { doc, updateDoc,getDoc } from "firebase/firestore";
import { auth,db,storage } from './firebase';
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 






export default function JobDetailAdmin({navigation}){
    const [jobd, setjobd] = React.useState({
        responsibilities:[
            '',
            '',
        ]
    });
    const [data, setData] = React.useState({
        jobs:[
          {
            jobTitle: '',
          }
        ],
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
        getjobd();
        readFromFirebase();
      },[]);


      const updateIntoFirebase = async (jobdata) => {
        const docRef = doc(db, "jobsData", 'jobArray');
        const docSnap = await updateDoc(docRef,{
            jobs: jobdata
        });
    
        docSnap.then(updateInfo =>{
          console.log(updateInfo);
        })
      }

    const onChange = () =>{
        if(jobd.status === 'Activated'){
            setjobd({...jobd,status: 'Deactivated'});
            const copy = data;
            copy.jobs[jobd.jobID].status = 'Deactivated'
            setData(copy);
            updateIntoFirebase(data.jobs)
        }
        else{
            setjobd({...jobd,status: 'Activated'});
            const copy = data;
            copy.jobs[jobd.jobID].status = 'Activated'
            setData(copy);
            updateIntoFirebase(data.jobs)
        }

    }






   

      
    

    return(
        <SafeAreaView style={styles.pageContainer}>
    <ScrollView>
    <View style={styles.container}>


        <View style={styles.profile}>
          <Text  style={styles.heading}>Find your Job</Text>
            <View style={styles.wrapper}>
            <Text style={styles.head}>{jobd.jobTitle}</Text>
            </View>
        <View style={styles.details}>

        <View style={styles.left}>
            <View style={styles.wrapper}>
            <AntDesign name="calendar" size={24} color="white" />
            <Text style={styles.text}>{jobd.time}</Text>
            </View>
            <View style={styles.wrapper}>
            <MaterialIcons name="my-location" size={24} color="white" />
            <Text style={styles.text}>{jobd.location}</Text>
            </View>
            <View style={styles.wrapper}>
            <FontAwesome5 name="user-friends" size={24} color="white" />
            <Text style={styles.text}>{jobd.applicants} {' Applicants'}</Text>
            </View>
        </View>

        <View style={styles.right}>
        <View style={styles.wrapper}>
        <Octicons name="organization" size={24} color="white" />
            <Text style={styles.text}>{jobd.companyName}</Text>
            </View>
            <View style={styles.wrapper}>
            <FontAwesome name="building-o" size={24} color="white" />
            <Text style={styles.text}>{jobd.companySize}</Text>
            </View>
        </View>

        </View>
        <TouchableOpacity style={styles.registerButton} onPress={onChange}>
            <Text style={styles.registerButtonText}>{jobd.status}</Text>
        </TouchableOpacity>

        </View>

        <View  style={styles.jd}>
        <Text style={styles.headitem}>Job Description</Text>
        <Text>{jobd.jobDescription}</Text>
        </View>

        <View  style={styles.jd}>
        <Text style={styles.headitem}>Skills</Text>
        <Text>{jobd.skills}</Text>
        </View>

        <View  style={styles.jd}>
        <Text style={styles.headitem}>Responsibilities</Text>
        {jobd.responsibilities.map((item)=>(
            <View style={styles.res}>
            <AntDesign name="check" size={24} color="black" />
            <Text style={styles.item}>{item}</Text>
            </View>
        ))}
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
      registerButton:{
        backgroundColor: '#fa510e',
        width: 220,
        height: 40,
        borderRadius: 0,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      registerButtonText:{
        color:'white',
        fontSize: 24,
      },
      pageContainer:{
        flex: 1,
        backgroundColor:  'white',
      },
      container:{
        display: 'flex',
        gap:18,
      },
      profile:{
        backgroundColor: '#101f3c',
        height: 'auto',
        width: '100%',
        display: 'flex',
        gap: 36,
        padding: 20,
      },
      details:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left:{
        display: 'flex',
        gap:12,
    },
    right:{
        display: 'flex',
        gap:12,
    },
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems : 'center',
        gap:12,
    },
    text:{
        fontSize:18,
        color: 'white',
    },
    head:{
        fontSize:20,
        color: 'white',
        fontWeight: 'bold',
    },
    jd:{
        margin:18,
        display: 'flex',
        gap:12,
    },
    headitem: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    res:{
        display: 'flex',
        flexDirection: 'row',
        gap:24,
    },
    more:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin:18,
    },
    all:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap:4,
    },
    moretext:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    item:{
       width: 330,
    }
});