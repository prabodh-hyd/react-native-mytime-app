import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
// import { useRecoilValue } from 'recoil';
// import { taskItemsState } from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faTrash, faCalculator, faClock } from '@fortawesome/free-solid-svg-icons';


const Record = () => {
    const [tasks, setTasks] = useState([]);
    // console.log(tasks);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTaskDescription, setSelectedTaskDescription] = useState('');
    const [selectedHour, setSelectedHour] = useState(null);
    // console.log(selectedTask, selectedHour)


    useEffect(() => {
        fetchOpenInprogressData(); // Fetch data when the component mounts
    }, []);

    useEffect(() => {
        if (selectedHour !== null) {
            handleSaveHour(); 
            // handleStatus();  
        }   
    }, [selectedHour]);

    const fetchOpenInprogressData = async () => {
        try {
            const response = await fetch('https://api.tagsearch.in/mytime/tasks/1');
            if (response.ok) {
                const data = await response.json();
                // Filter tasks that are in "live" or "progress" state
                const liveOrProgressTasks = data.filter(task => task.status === 'OPEN' || task.status === 'IN_PROGRESS');
                setTasks(liveOrProgressTasks); // Update the state with the filtered tasks
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleSaveHour = async () => {
        console.log("handleSaveHour", selectedTask, selectedHour)
        try {
            const response = await fetch('https://api.tagsearch.in/mytime/tracker', {
                method: 'POST', // Use 'post' for sending hours spent 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskid: selectedTask,
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

    const handleStatus = async () => {
        // console.log("handleSaveHour", selectedTask, selectedHour)
        try {
            const response = await fetch(`https://api.tagsearch.in/mytime/tasks/${selectedTask}/close`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: "PAUSED"
                }),
            });

            if (response.ok) {
                fetchOpenInprogressData();
                console.log('updated status ');

            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error(error);
        } finally {

            setShowModal(false);
        }
    };

    const handleDeleteTask = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`https://api.tagsearch.in/mytime/tasks/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log("sucessfully deleted")
            } else {
                console.error('Failed to delete');
            }
        } catch (error) {
            console.log(error);

        }
    };


    const handleHourTask = (id) => {
        setSelectedTask(id);
       console.log(selectedTask);
        setShowModal(true);
    };
   

    const handleTabPress = (hours) => {
        setSelectedHour(hours);
        setShowModal(false);
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
                        
                        <View key={task.taskid} style={styles.taskBox}>
                            <TouchableOpacity onPress={() => handleTextPress(task.task_description)}>
                                <Text style={{ fontSize: 16 }}>{task.task_name}</Text>
                            </TouchableOpacity>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => handleHourTask(task.taskid)}>
                                    <FontAwesomeIcon icon={faClock} size={13} color="grey" />
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => handleDeleteTask(task.taskid)}>
                                    <Text style={styles.icon}><FontAwesomeIcon icon={faTrash} size={13} /></Text>
                                </TouchableOpacity> */}
                            </View>
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
                        <View>
                            <View style={styles.modalContent}>
                                {/* <Text style={styles.modalHeading}>Hours spent</Text> */}
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((hours) => (

                                    <TouchableOpacity key={hours} onPress={() => handleTabPress(hours)}>
                                        <Text style={styles.tabText}>{hours}</Text>
                                    </TouchableOpacity>
                                ))}

                            </View>
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
        marginLeft: 10,
    },
    taskBox: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: 310,
        height: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    tabText: {
        fontSize: 20,
        padding: 20,
        color: 'black',
    },
    scrollDisplay: {
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:'10px'
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