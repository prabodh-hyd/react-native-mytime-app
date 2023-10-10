import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRecoilValue } from 'recoil';
import { taskItemsState } from './AddtaskPage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';


const Settings = () => {
    const taskItems = useRecoilValue(taskItemsState);
    const [expandedTask, setExpandedTask] = useState(null);
    const [editTask, setEditTask] = useState(null); // Track the task to edit
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const toggleTaskDescription = (id) => {
        if (expandedTask === id) {
            setExpandedTask(null);
        } else {
            setExpandedTask(id);
        }
    };

    const handleAddTask = () => {
        navigation.navigate('AddtaskPage');
    };

    const handleEditTask = (task) => {
        setEditTask(task);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setModalVisible(true);
    };

    const handleSaveEdit = () => {
        // Find the index of the task being edited
        const taskIndex = taskItems.findIndex((task) => task.id === editTask.id);

        if (taskIndex !== -1) {
            // Update the task with the edited title and description
            const updatedTaskItems = [...taskItems];
            updatedTaskItems[taskIndex] = {
                ...updatedTaskItems[taskIndex],
                title: editTitle,
                description: editDescription,
            };

            setEditTask(null);
            setModalVisible(false);
        }
    };

    const handleCancelEdit = () => {
        setEditTask(null);
        setModalVisible(false);
    };

    return (

        <ScrollView style={styles.container}>
            {taskItems.map((task, index) => (
                <View key={index} style={styles.taskBox}>
                    <View style={styles.taskHeader}>
                        <Text>{task.title.split(' ')[0]}</Text>
                    </View>
                    <View style={styles.taskIcons}>
                        <TouchableOpacity onPress={() => toggleTaskDescription(task.id)}>
                            <FontAwesomeIcon icon={faAngleDown} size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEditTask(task)}>
                            <FontAwesomeIcon icon={faEllipsisV} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Collapsible collapsed={expandedTask !== task.id}>
                        <Text style={styles.taskDescription}>{task.description}</Text>
                    </Collapsible>
                </View>
            ))}

            {/* Edit Task Modal */}
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
        backgroundColor: 'lightblue',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 15,
        borderRadius: 5,
    },
    taskHeader: {
        flexDirection: 'row',

        alignItems: 'center',
    },
    taskIcons: {
        display: 'flex',
        flexDirection: 'row',

    },
    taskDescription: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    plusIcon: {
        alignSelf: 'flex-end',
        marginRight: 10,
        paddingTop: 10,
        position: 'absolute',
        zIndex: 1, // Add this line
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
    },
});

export default Settings;
