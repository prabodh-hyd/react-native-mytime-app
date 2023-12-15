import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registeredUser } from './recoil';



const Register = () => {

    const [username, setUsername] = useState('');
    const [userRegistered, setuserRegistered] = useRecoilState(registeredUser);
    const [usersList, setUserslist] = useState([]);
    const [existingUser, setExistinguser] = useState(null);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);


    useEffect(() => {
        getUsers();
    }, []);


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('user', jsonValue);
        } catch (e) {
            console.log(e);
        }
    };


    
    const getUsers = async () => {
        try {
            const response = await fetch("https://api.tagsearch.in/mytime/users");
            if (response.ok) {
                const data = await response.json();
                console.log("fetched users");

                setUserslist(data);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const postUser = async () => {

        try {
            const response = await fetch("https://api.tagsearch.in/mytime/users", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: username.toLowerCase()
                })
            })

            if (response.ok) {
                console.log("new user added");
                setUsername('');
            };

        } catch (error) {
            console.log(error);
        }
    }

    const checkUserRegistry = () => {

        if (username == "" ){
            setShowDescriptionModal(true);
        }else{
              setuserRegistered(username);
        storeData(username.toLowerCase());

        }

        // setuserRegistered(username);
        // storeData(username.toLowerCase());

        let userexist = usersList.filter(user => user.name == username.toLowerCase());
        
        if(userexist == ""){
            console.log("please enter your name");
        }
        if(userexist.length > 0){
            console.log("you are registered");
        }

        if (userexist.length == 0 && username != "") {
            postUser();
        }
        setExistinguser(userexist);
        return userexist;
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />

            <Button title="Register" onPress={checkUserRegistry} />

            {/* modal for null value in uer input */}

            <Modal
                visible={showDescriptionModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDescriptionModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowDescriptionModal(false)}>

                    <View style={styles.modalBackground}>

                        <View style={styles.modalContent}>
                            <Text> please enter your name </Text>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    forgotPassword: {
        marginTop: 16,
        color: 'blue',
        textDecorationLine: 'underline',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 10,
        flexDirection: 'column', // Change from row to column
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',
        gap: 20
    },
});

export default Register;