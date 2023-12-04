import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Register'; // Import your registration component

const Stack = createStackNavigator();

const LoginPage = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleLogin = () => {
        // Your login logic here
    };

    const handleRegister = () => {
        navigation.navigate('Register'); // Navigate to the registration page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={(text) => setPhoneNumber(text)}
                value={phoneNumber}
                keyboardType="numeric"
            />

            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => console.log('Forgot password')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <Text style={styles.register}>Don't have an account?</Text>
            <Button title="Register" onPress={handleRegister} /> {/* Use a Button to navigate to the registration page */}
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
    register: {
        marginTop: 50,
        color: 'blue',
    },
});

export default LoginPage;
