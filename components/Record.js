import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
// import { useRecoilValue } from 'recoil';
// import { taskItemsState } from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const Record = () => {
    const [tasks, setTasks] = useState([]);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTaskDescription, setSelectedTaskDescription] = useState('');
    const [selectedHour, setSelectedHour] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.tagsearch.in/mytime/tasks/1');
            if (response.ok) {
                const data = await response.json();
                // Filter tasks that are in "live" or "progress" state
                const liveOrProgressTasks = data.filter(task => task.state === 'live' || task.state === 'progress');
                setTasks(liveOrProgressTasks); // Update the state with the filtered tasks
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleSaveHour = async () => {
        try {
            const response = await fetch('https://api.tagsearch.in/mytime/tracker/update/1', {
                method: 'PUT', // Use 'PUT' for updating data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_id: selectedTask,
                    hours: selectedHour, // Use the selected hour from state
                }),
            });


            if (response.ok) {
                console.log('Hour saved:', selectedHour);

            } else {
                console.error('Failed to save hour');
            }
        } catch (error) {
            console.error(error);
        } finally {

            setShowModal(false);
        }
    };

    const handleDeleteTask = (id) => {
        setSelectedTask(id);
        setShowModal(true);
    };

    const handleTabPress = (hours) => {
        setSelectedHour(hours);
        setShowModal(false);
        if (selectedTask !== null) {
            setSelectedTask(null);
        }
        handleSaveHour();
    };

    const handleTextPress = (description) => {
        setSelectedTaskDescription(description);
        setShowDescriptionModal(true);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.taskBoxContainer}>
                    {tasks.map((task) => (
                        <View key={task.id} style={styles.taskBox}>
                            <TouchableOpacity onPress={() => handleTextPress(task.task_description)}>
                                <Text style={{ fontSize: 16 }}>{task.task_name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                                <FontAwesomeIcon icon={faXmark} size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Modal
                visible={showDescriptionModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDescriptionModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowDescriptionModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text>{selectedTaskDescription}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>


            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((hours) => (
                                <TouchableOpacity key={hours} onPress={() => handleTabPress(hours)}>
                                    <Text style={styles.tabText}>{hours}</Text>
                                </TouchableOpacity>
                            ))}

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
        alignItems: 'flex-start',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        // display: 'flex',
        padding: 10,
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    taskBox: {
        backgroundColor: 'lightblue',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: 200,
        height: 'auto',
        marginLeft: '15%',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    tabText: {
        fontSize: 20,
        padding: 20,
        color: 'black',
    },
    scrollView: {
        flex: 1,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 15
    },
    taskBoxContainer: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    taskText: {
        fontSize: 16,
        marginBottom: 5,
    },
})

export default Record;