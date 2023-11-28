
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { atom, useRecoilState } from 'recoil';

export const taskItemsState = atom({
    key: 'taskItemsState',
    default: "",
});

const AddtaskPage = () => {

    const [newTask, setNewTask] = useRecoilState(taskItemsState);
    const [taskDescription, setTaskDescription] = useState(null);

    const postReq = async () => {

        try {
            const response = await fetch("https://api.tagsearch.in/mytime/tasks", {
                method: 'POST',
                headers: {

                    // Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: "sireesha",
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


    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setNewTask('');
            setTaskDescription('');
        }
    };

    const handleDeleteTask = (id) => {
        const updatedTaskItems = taskItems.filter((item) => item.id !== id);
    };

    const handleToggleTask = (id) => {
        const updatedTaskItems = taskItems.map((item) => {
            if (item.id === id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
    };

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
            <TouchableOpacity onPress={postReq}>
                <FontAwesomeIcon icon={faPlus} size={30} color="black" />
                <Button
                    onPress={() => setShowmodal(false)}
                    title="Add"
                    color="black"
                    
                    style={styles.submitbutton}
                />
            </TouchableOpacity>

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
        marginTop: 1,
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
        marginTop: 80,

    },
});

export default AddtaskPage;
