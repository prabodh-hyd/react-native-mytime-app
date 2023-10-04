import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigation = useNavigation();

    const handleAddTask = () => {
        navigation.navigate('AddtaskPage');
    };

    return (
        <View>
            <TouchableOpacity onPress={handleAddTask} style={{ position: 'absolute', top: 10, right: 10 }}>
                <FontAwesomeIcon icon={faPlus} size={40} color="black" />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        marginRight: 10,
        paddingTop: 10,
    }
})
export default Settings;


