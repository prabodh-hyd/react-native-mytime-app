
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableWithoutFeedback, StyleSheet, Button, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { atom, useRecoilState } from 'recoil';
import { storeuser } from './Record';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskItemsState } from './recoil';



const AddtaskPage = () => {

    const [newTask, setNewTask] = useRecoilState(taskItemsState);
    const [taskDescription, setTaskDescription] = useState("");
    const [user, setUser] = useState(null);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    



    useEffect(() => {
        const fetchData = async () => {
            await getDatafromLocalStorage();
        };
        fetchData();
    }, []);




    const getDatafromLocalStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            const parsedvalue = JSON.parse(value);

            if (parsedvalue !== null) {
                setUser(parsedvalue.toLowerCase());
            }
        } catch (e) {
            console.log(e);
        }
    };

    const postReq = async () => {
       
        try {
            const response = await fetch("https://api.tagsearch.in/mytime/tasks", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user,
                    task_name: newTask,
                    task_description: taskDescription
                })
            })

            if (response.ok) {
                setNewTask('');
                setTaskDescription('');
            } else {
                console.log("error while posting request")
            }
        } catch (error) {
            console.log(" error from server :" + error)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Task Title"
                    value={newTask}
                    onChangeText={(text) => setNewTask(text)}
                />

            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input1}
                    placeholder="Enter Task Description"
                    value={taskDescription}
                    onChangeText={(text) => setTaskDescription(text)}
                />

            </View>

            <Button
                onPress={() => {
                    if (( newTask != "") && (taskDescription != "")) {
                        postReq()
                    }else{
                        setShowDescriptionModal(true)
                    }
                }}
                title="Add"
                color="blue"
                style={styles.submitbutton}
            />

            <Modal
                visible={showDescriptionModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDescriptionModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowDescriptionModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text>{ newTask == "" ? <Text> please enter task title </Text> : <Text> ---- </Text> }</Text>
                            <Text>{taskDescription == "" ? <Text>please enter task discription</Text> : <Text> ---- </Text> } </Text>
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
        padding: 20,
        backgroundColor: 'white',

        alignItems: 'center',
        marginTop: 0
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
    },
    submitbutton: {
        padding: 10,

    },
    input: {
        flex: 1,
        height: 40,
        width: 300,
        borderColor: 'black',
        borderWidth: 2,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    input1: {
        flex: 1,
        height: 40,
        width: 300,
        borderColor: 'black',
        borderWidth: 2,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    taskTitle: {
        fontSize: 18,
        width: 280,
    },
    icon: {
        fontSize: 20,
        marginLeft: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 230,
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

export default AddtaskPage;
