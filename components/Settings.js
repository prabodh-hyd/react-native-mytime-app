import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


const Task = () => {
    const [taskItems, setTaskItems] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTaskItems([...taskItems, { id: Date.now(), title: newTask, selected: false }]);
            setNewTask('');
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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter task"
                    value={newTask}
                    onChangeText={(text) => setNewTask(text)}
                />
                <TouchableOpacity onPress={handleAddTask}>
                    <FontAwesomeIcon icon={faPlus} size={30} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={taskItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    try {
                        return (
                            <View style={styles.taskItem}>
                                <Text style={styles.taskTitle}>{item.title}</Text>
                                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                                    <Text style={styles.icon}><FontAwesomeIcon icon={faTrash} /></Text>
                                </TouchableOpacity>
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
        backgroundColor: 'lavender',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 80,
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
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        justifyContent: 'space-between',

    },
    taskTitle: {
        fontSize: 16,
    },
    button: {
        borderRadius: 5,
        borderWidth: 1,
    }

});

export default Task;
