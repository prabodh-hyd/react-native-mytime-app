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
        flex: 2,
        padding: 20,
    },
    taskBox: {
        backgroundColor: 'lavender',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px'
    },
    titleDescriptionContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    titleText: {
        fontSize: 18,
    },
    descriptionText: {
        fontSize: 16,
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modalButton: {
        fontSize: 18,
        color: 'blue',
        marginTop: 10,
        flexDirection: 'row',
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 80,
        alignSelf: 'flex-end',
        marginRight: 10,
        paddingTop: 10,
    }
})
export default Settings;


