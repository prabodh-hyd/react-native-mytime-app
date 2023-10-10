import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { atom, useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';


export const taskItemsState = atom({
    key: 'taskItemsState',
    default: [],
});

const AddtaskPage = () => {
    const [taskItems, setTaskItems] = useRecoilState(taskItemsState);
    const [newTask, setNewTask] = useState('');
    const [taskDescription, setTaskDescription] = useState(null);
    const navigation = useNavigation();

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            const newTaskItem = { id: Date.now(), title: newTask, description: taskDescription, selected: false };
            setTaskItems([...taskItems, newTaskItem]);
            setNewTask('');
            setTaskDescription('');

            // Navigate to the Settings screen with the updated task list
            navigation.navigate('Settings', { taskItems: [...taskItems, newTaskItem] });
        }
    };

    const handleDeleteTask = (id) => {
        const updatedTaskItems = taskItems.filter((item) => item.id !== id);
        setTaskItems(updatedTaskItems);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter task"
                    value={newTask}
                    onChangeText={(text) => setNewTask(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input1}
                    placeholder="Enter task Description"
                    value={taskDescription}
                    onChangeText={(text) => setTaskDescription(text)}
                />
            </View>
            <TouchableOpacity onPress={handleAddTask}>
                <FontAwesomeIcon icon={faPlus} size={30} color="black" />
            </TouchableOpacity>


            <FlatList
                data={taskItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                            <Text style={styles.icon}><FontAwesomeIcon icon={faTrash} /></Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'lavender',
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