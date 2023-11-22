import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView, Button } from 'react-native';
// import { useRecoilValue } from 'recoil';
// import { taskItemsState } from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo, faClock, faE, faEye, faHandPaper, faInfo, faPager, faParagraph } from '@fortawesome/free-solid-svg-icons';
import { RadioButton } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { taskItemsState } from './AddtaskPage';
import { selectedStatus } from './Settings';

const Record = () => {

    const [tasks, setTasks] = useState([]);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTaskDescription, setSelectedTaskDescription] = useState('');
    const [selectedHour, setSelectedHour] = useState(0);
    const [closedTasks, setClosedTasks] = useState([]); // New state to keep track of closed tasks
    const [selectedValue, setSelectedValue] = useState("IN_PROGRESS");
    const [addedTask, setAddedTask] = useRecoilValue(taskItemsState);



    useEffect(() => {
        fetchOpenInprogressData(); // Fetch data when the component mounts
    }, []);

    useEffect(() => {
        fetchOpenInprogressData(); // Fetch data when the component mounts
    }, [addedTask]);


    // useEffect(() => {
    //     if (selectedHour !== null) {
    //         handleSaveHour();
    //     }
    // }, [selectedHour]);

    // useEffect(() => {

    //     if (selectedValue !== null) {
    //         handleStatus(selectedValue);
    //     }

    // }, [selectedValue]);



    const fetchOpenInprogressData = async () => {
        try {
            const response = await fetch('https://api.tagsearch.in/mytime/tasks/1');
            if (response.ok) {
                const data = await response.json();
                // Filter tasks that are in "live" or "progress" state
                const liveOrProgressTasks = data.filter(task => task.status === 'IN_PROGRESS' || task.status === 'IN_PROGRESS');
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

            setShowModal(true);
        }
    };

    const handleStatus = async (status) => {
   

        try {
            const response = await fetch(`https://api.tagsearch.in/mytime/tasks/${selectedTask}/close`, {
                method: 'PUT', // Use 'post' for sending hours spent 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status
                }),
            });

            if (response.ok) {
                console.log("status updated");
                
                fetchOpenInprogressData();

            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error(error);
        } finally {

            setShowModal(false);
        }
    };





    const handleHourTask = (id) => {
        setSelectedTask(id);
        // console.log(selectedTask);
        setShowModal(true);
    };


    const handleTabPress = (hours) => {
        setSelectedHour(hours);
        setShowModal(true);
    };

    const handleTextPress = (description) => {
        setSelectedTaskDescription(description);
        setShowDescriptionModal(true);
    };





    // const RadioButton = ({ onPress, label }) => (
    //     <TouchableOpacity onPress={onPress} style={styles.radioButton}>
    //         <View style={styles.radioDot} />
    //         <Text style={styles.radioText}>{label}</Text>
    //     </TouchableOpacity>
    // );

    const handleRadioButtonPress = (value) => {
        setSelectedValue(value);
    };

    const handleSubmit = () => {
        handleSaveHour();
        handleStatus(selectedValue)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.taskBoxContainer}>
                    {tasks.map((task) => (
                        <View key={task.taskid} style={styles.taskBox}>
                            {/* <TouchableOpacity onPress={() => handleTextPress(task.task_description)}> */}
                            <Text style={{ fontSize: 18 }}>{task.task_name}</Text>
                            {/* </TouchableOpacity> */}
                            <View style={styles.iconContainer}>

                                <TouchableOpacity onPress={() => handleTextPress(task.task_description)}>
                                    <Text style={styles.icon}><FontAwesomeIcon icon={faInfo} size={13} color="grey" /></Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleHourTask(task.taskid)}>
                                    <FontAwesomeIcon icon={faClock} size={16} color="grey" />
                                </TouchableOpacity>

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
                            <Text> Hours spent : 5 </Text>
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
                            <Text style={styles.modalHeading}>Select Hours Spent </Text>
                            <View style={styles.radioContainer}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((hours) => (
                                    <TouchableOpacity key={hours} onPress={() => handleTabPress(hours)}>
                                        <Text style={styles.tabText}>{hours}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.radioGroup}>
                                <RadioButton.Group
                                    onValueChange={(value) => handleRadioButtonPress(value)}
                                    value={selectedValue}
                                >
                                    <View style={styles.radioButton}>
                                        <RadioButton value="IN_PROGRESS" color="blue" />
                                        <Text style={styles.radioLabel}>InProgress</Text>
                                    </View>
                                    <View style={styles.radioButton}>
                                        <RadioButton value="PAUSED" color="red" />
                                        <Text style={styles.radioLabel}>DoneForToday</Text>
                                    </View>
                                    <View style={styles.radioButton}>
                                        <RadioButton value="CLOSED" color="green" />
                                        <Text style={styles.radioLabel}>Close</Text>
                                    </View>
                                </RadioButton.Group>
                            </View>
                            <Button
                                onPress={handleSubmit}
                                title="submit"
                                color="#4a81f0"
                                style={styles.submitbutton}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Make sure it takes up the entire available space
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    taskBox: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: 'auto',
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
        gap: 10,
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
        gap:20
    },
    modalHeading: {
        fontSize: 20,
        color:"black",
        fontWeight:'bold'
    },
    radioContainer: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor:'#e8eefa'
    },

    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    radioText: {
        marginLeft: 5,
        fontSize: 16,
    },
    radioDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'black',
        marginRight: 8,
        // marginLeft: 8,
        // fontSize: 16,
        // color: '#333',
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
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
    submitbutton: {
        marginTop: 50
    }
})

export default Record;
