import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import JobCard from './JobCard';
import { useEffect } from 'react';
import { doc, updateDoc,getDoc } from "firebase/firestore";
import { auth,db,storage } from './firebase';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

export default function AllJobScreen({navigation}) {

    const [isFocus, setIsFocus] = useState(false);
    const [title, setTitle] = useState('');
    const [cname, setCname] = useState('');
    const [jd, setJd] = useState('');
    const [csize, setCsize] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [time, setTime] = useState('');
    const [applicants, setApplicants] = useState('');
    const [res, setRes] = useState([]);
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

    const data1 = [
        { label: 'Software Developer', value: '1' },
        { label: 'Senior Software Developer', value: '2' },
        { label: 'Business Analyst', value: '3' },
        { label: 'HR', value: '4' },
        { label: 'Quality Engineer', value: '5' },
    ];


    const updateIntoFirebase = async (jobdata) => {
        const docRef = doc(db, "jobsData", 'jobArray');
        const docSnap = await updateDoc(docRef,{
            jobs: jobdata
        });
    
        docSnap.then(updateInfo =>{
          console.log(updateInfo);
        })
      }

    const AddNew =() =>{

        const NewData = {
                jobTitle: title,
                time: time,
                skills: skills,
                location: location,
                jobID: data.jobs.length,
                jobDescription: jd,
                companyName: cname,
                companySize: csize,
                applicants: applicants,
                responsibilities: res,
                status: 'Activated',
        }
        const copy = data;
        copy.jobs.push(NewData);
        setData(copy);
        updateIntoFirebase(data.jobs);
    }

    

    

    
  return (
    <SafeAreaView style={styles.pageContainer}>
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.heading}>Add New Job</Text>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Job Title</Text>
        <Dropdown
          style={styles.input}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={title}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          searchPlaceholder="Search..."
          value={title}
          onChange={item => {
            setTitle(item.label);
            if(item.label ==='HR'){
                setRes(
                    ['Recruitment and staffing: Developing job descriptions, advertising job vacancies, screening resumes, interviewing candidates, conducting background checks, and making job offers.',
                    'Onboarding: Welcoming new employees, providing them with orientation and training, and ensuring that they are integrated into the company culture.',
                    'Employee relations: Managing employee concerns, addressing grievances, resolving conflicts, and creating a positive workplace culture.',
                    'Performance management: Setting goals, monitoring progress, providing feedback, and conducting performance evaluations.'
                ])
            }
            else if(item.label === 'Software Developer'){
                setRes(
                    ['Software development: Writing, testing, and maintaining high-quality software code using programming languages such as Java, Python, or C++.',
                    'Design: Developing technical specifications and system designs, and collaborating with other teams to ensure the software architecture meets business requirements.',
                    'Problem-solving: Identifying and troubleshooting software defects, performance issues, and other technical problems.',
                    'Collaboration: Collaborating with other developers, project managers, and stakeholders to ensure that software projects are completed on time and meet business requirements.'
                ])
            }
            else if(item.label === 'Senior Software Developer'){
                setRes(
                    ['Software development: Writing, testing, and maintaining high-quality software code using programming languages such as Java, Python, or C++.',
                    'Design: Developing technical specifications and system designs, and collaborating with other teams to ensure the software architecture meets business requirements.',
                    'Problem-solving: Identifying and troubleshooting software defects, performance issues, and other technical problems.',
                    'Collaboration: Collaborating with other developers, project managers, and stakeholders to ensure that software projects are completed on time and meet business requirements.'
                ])
            }
            else if(item.label === 'Business Analyst'){
                setRes(
                    ['Gathering and documenting business requirements from stakeholders',
                    'Analyzing and documenting current business processes and identifying areas for improvement',
                    'Facilitating meetings and discussions between stakeholders to resolve conflicts and ensure alignment',
                    'Creating business cases and cost-benefit analyses to support proposed changes'
                ])
            }
            else{
                setRes(
                    ['Developing and implementing quality control systems and procedures',
                    'Conducting product and process audits to identify areas for improvement',
                    'Participating in design and development activities to ensure that products meet quality requirements',
                    'Developing and maintaining quality documentation, including procedures and work instructions'
                ]) 
            }
            setIsFocus(false);
          }}/>
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Company Name</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setCname(text)}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Job Description</Text>
        <TextInput
        style={styles.jd}
        multiline = {true}
        numberOfLines = {10}
        onChangeText={(text)=>setJd(text)}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Company Size</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setCsize(text)}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>location</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setLocation(text)}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Skills</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setSkills(text)}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Time</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setTime(text)}
        />
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.inputheading}>Applicants</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setApplicants(text)}
        />
        </View>

        <View style={styles.actionbuttons}>

        <TouchableOpacity style={styles.actionbutton} >
            <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionbutton} onPress={AddNew}>
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
  jd:{
    height: 200,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderColor: 'grey',
    wordWrap: 'break-word',
  }
});
