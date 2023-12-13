import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registeredUser } from './recoil';



const Register = () => {
    const [username, setUsername] = useState('');
    const [userRegistered, setuserRegistered] = useRecoilState(registeredUser);
    console.log("user registered",userRegistered);
    const [usersList, setUserslist] = useState([]);
    const [existingUser, setExistinguser] = useState(null);


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

        setuserRegistered(username);
        storeData(username.toLowerCase());
        
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
});

export default Register;