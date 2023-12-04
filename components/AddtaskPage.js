
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { atom, useRecoilState } from 'recoil';

export const taskItemsState = atom({
    key: 'taskItemsState',
    default: [],
});

const AddtaskPage = () => {
    const [taskItems, setTaskItems] = useRecoilState(taskItemsState);
    const [newTask, setNewTask] = useState('');
    const [taskDescription, setTaskDescription] = useState(null);

    const postReq = async () => {
        try {
            const response = await fetch("https://api.tagsearch.in/mytime/tasks", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: 1,
                    task_name: newTask,
                    task_description: taskDescription,
                }),
            });

            if (response.ok) {
                // Add the new task to taskItems state
                handleAddTask();
                setNewTask('');
                setTaskDescription('');
            } else {
                console.log("Error while posting request");
            }
        } catch (error) {
            console.error("Error from server: " + error);
        }
    };

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTaskItems([...taskItems, { id: Date.now(), title: newTask, description: taskDescription, selected: false }]);
            setNewTask('');
            setTaskDescription('');
        }
    };

    const handleDeleteTask = (id) => {
        const updatedTaskItems = taskItems.filter((item) => item.id !== id);
        setTaskItems(updatedTaskItems);
    };
    const handleToggleTask = (id) => {
        const updatedTaskItems = taskItems.map((item) => {
            if (item.id === id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setTaskItems(updatedTaskItems);
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
                {/* <Button>Add</Button> */}
            </TouchableOpacity>



            <FlatList
                data={taskItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    try {
                        return (
                            <View style={styles.taskItem}>
                                {/* <Text style={styles.taskTitle}>{item.description}</Text>
                                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                                    <Text style={styles.icon}><FontAwesomeIcon icon={faTrash} /></Text>
                                </TouchableOpacity> */}
                            </View>
                        );
                    } catch (error) {
                        console.error('Error rendering task item:', error);
                        return null; // or display an error message component
                    }
                }}
            />
        </View>
    );


};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
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
