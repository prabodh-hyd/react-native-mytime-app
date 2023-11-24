import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();




export const loginUID = atom({
    key: 'loginUID',
    default: "",
});





const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUid] = useRecoilState(loginUID);
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const GoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // console.log(user.uid)
            setUid(user.uid)

        }).catch((error) => {
            console.log(error);
        });
        

    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={(text) => setPhoneNumber(text)}
                value={phoneNumber}
            />
            <Button title="Login" onPress={GoogleSignIn} />
            <TouchableOpacity onPress={() => console.log('Forgot password')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
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