import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';






export default function JobCard({title,time,location,skills,companyName,variant,jobDescription,jobID,companySize,applicants,responsibilities,status}){

    const storejobd = async (value) => {
        try {
          await AsyncStorage.setItem('jobdetails', value)
        } catch (e) {
          console.log(e.message);
        }
      }

    const navigation = useNavigation(); 

    const details = {
        jobTitle: title,
        time: time,
        skills: skills,
        location: location,
        jobID: jobID,
        jobDescription: jobDescription,
        companyName: companyName,
        companySize: companySize,
        applicants: applicants,
        responsibilities: responsibilities,
        status: status
    }

    const detailsString =JSON.stringify(details);

    const toDetails =()=>{
        storejobd(detailsString);
        navigation.navigate('JobDetails');
      }

      const toDetailsAdmin =()=>{
        storejobd(detailsString);
        navigation.navigate('JobDetailsAdmin');
      }

    
    return(
        <View style={styles.card}>
            {variant === 'Admin' && (
                <View style={styles.cardapply}>
                <View style={styles.cardleft}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.jd} numberOfLines={6}>{jobDescription}</Text>
                <Text style={styles.skills}>{skills}</Text>
                </View>

                <View style={styles.cardright}>
                <TouchableOpacity style={styles.registerButton} onPress={toDetailsAdmin}>
                    <Text style={styles.registerButtonText}>Details</Text>
                </TouchableOpacity>
                </View>
                </View>
    
            )}

            {variant === 'home' && (
                <View style={styles.cardapply}>
                <View style={styles.cardleft}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.jd} numberOfLines={6}>{jobDescription}</Text>
                <Text style={styles.skills}>{skills}</Text>
                </View>

                <View style={styles.cardright}>
                <TouchableOpacity style={styles.registerButton} onPress={toDetails}>
                    <Text style={styles.registerButtonText}>Apply</Text>
                </TouchableOpacity>
                </View>
                </View>
            )}

            
        </View>
        
        
        
    );
}

const styles = StyleSheet.create({
    card: {
    height: 'auto',
    width: '90%',
    padding: 18,
    borderRadius: 24,
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 4,
    },
    shadowOpacity:  0.50,
    shadowRadius: 5.62,
    elevation: 10
    },
    cardleft:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    cardright:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap:12,
        marginTop:12,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3f4b63'
    },
    skills:{
        fontSize:16,
        color: '#fa510e',
        width: 200,

    },
    registerButton:{
        backgroundColor: '#fa510e',
        width: 120,
        height: 50,
        borderRadius: 100,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity:  0.50,
        shadowRadius: 5.62,
        elevation: 10
        },
      registerButtonText:{
        color:'white',
        fontSize: 24,
      },
      cardapply:{
        display:'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
      jd:{
        width: 150,
        height: 100,
        marginTop: 12,
      },
});