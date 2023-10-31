import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';


const Settings = () => {
    const [tasks, setTasks] = useState([]);
    const [expandedTask, setExpandedTask] = useState(-1); // Use -1 to represent no expanded tasks
    const [editTask, setEditTask] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();  // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.tagsearch.in/mytime/tasks/1');
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTaskDescription = (index) => {
        if (expandedTask === index) {
            setExpandedTask(-1);
        } else {
            setExpandedTask(index);
        }
    };

    const handleAddTask = () => {
        navigation.navigate('AddtaskPage');
    };

    const handleEditTask = (task) => {
        setEditTask(task);
        setEditTitle(task.task_name);
        setEditDescription(task.task_description);
        setModalVisible(true);
    };

    // const handleSaveEdit = () => {
    //     // Your code to save edited task goes here
    //     setEditTask(null);
    //     setModalVisible(false);
    // };

    const handleSaveEdit = () => {
        // Find the index of the task in the tasks array that you want to edit
        const taskIndex = tasks.findIndex((task) => task === editTask);

        // Check if the task is found
        if (taskIndex !== -1) {
            // Create a copy of the tasks array to avoid mutating state directly
            const updatedTasks = [...tasks];

            // Update the task with the edited data
            updatedTasks[taskIndex].task_name = editTitle;
            updatedTasks[taskIndex].task_description = editDescription;

            // Send a PUT request to your API to update the task
            fetch('https://api.tagsearch.in/mytime/tasks/${id}', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set the appropriate content type
                    // Include any other headers you may need, such as authentication headers
                },
                body: JSON.stringify(updatedTasks[taskIndex]),
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Task updated successfully.');

                        // Update the state with the new tasks array
                        setTasks(updatedTasks);
                    } else {
                        console.error('Failed to update task.');
                        // Handle the error here
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle any network or request error here
                });
        }

        // Reset the edit state and close the modal
        setEditTask(null);
        setModalVisible(false);
    };

    const handleCancelEdit = () => {
        setEditTask(null);
        setModalVisible(false);
    };


    return (
        <ScrollView style={styles.container}>
            {tasks.map((task, index) => (
                <View key={index} style={styles.taskBox}>
                    <View style={styles.taskHeader}>
                        <View style={styles.titleDescriptionContainer}>
                            <Text style={styles.titleText}>{task.task_name}</Text>
                            <Collapsible collapsed={expandedTask !== index}>
                                <Text style={styles.descriptionText}>{task.task_description}</Text>
                            </Collapsible>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => toggleTaskDescription(index)}>
                                <FontAwesomeIcon icon={faAngleDown} size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEditTask(task)}>
                                <FontAwesomeIcon icon={faEllipsisV} size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}


            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Edit Title"
                        value={editTitle}
                        onChangeText={(text) => setEditTitle(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Edit Description"
                        value={editDescription}
                        onChangeText={(text) => setEditDescription(text)}
                        multiline
                    />
                    <TouchableOpacity onPress={handleSaveEdit}>
                        <Text style={styles.modalButton}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelEdit}>
                        <Text style={styles.modalButton}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
});

export default Settings;