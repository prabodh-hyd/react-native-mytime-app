import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faPen } from '@fortawesome/free-solid-svg-icons';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';
const Settings = () => {
 const [tasks, setTasks] = useState([]);
 const [expandedTask, setExpandedTask] = useState(-1);
 const [editTask, setEditTask] = useState(null);
 const [editTitle, setEditTitle] = useState('');
 const [editDescription, setEditDescription] = useState('');
 const [modalVisible, setModalVisible] = useState(false);
 const navigation = useNavigation();
 
 useEffect(() => {
   fetchData();
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
   setExpandedTask(expandedTask === index ? -1 : index);
 };

 const handleEditTask = (task) => {
   setEditTask(task);
   setEditTitle(task.task_name);
   setEditDescription(task.task_description);
   setModalVisible(true);
 };

 const handleSaveEdit = async () => {
   if (editTask) {
     const updatedTask = { ...editTask , task_name: editTitle, task_description: editDescription };
    //  console.log("updatedTask",updatedTask)

     const dataTosend = {
        task_name:updatedTask.task_name,
        task_description: updatedTask.task_description,
        status: updatedTask.status
    }
    // console.log("dataTosend",dataTosend);

     try {
       const response = await fetch(`https://api.tagsearch.in/mytime/tasks/${updatedTask.taskid}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(dataTosend),
       });
       if (response.ok) {
         console.log('Task updated successfully.');
         fetchData();
       } else {
         console.error('Failed to update task.');
       }
     } catch (error) {
       console.error(error);
     }
   }

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
                                <FontAwesomeIcon icon={faPen} size={16} color="grey" />
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
});

export default Settings;