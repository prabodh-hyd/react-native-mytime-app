import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useRecoilValue } from 'recoil';
import { taskItemsState } from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Record = () => {
    const taskItems = useRecoilValue(taskItemsState);
    const [newTask, setNewTask] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);



    const handleDeleteTask = (id) => {
        setSelectedTask(id);
        setShowModal(true);
    };

    const handleTabPress = (hours) => {
        setShowModal(false);
        if (selectedTask !== null) {
            const updatedTaskItems = taskItems.filter((item) => item.id !== selectedTask);
            setNewTask(updatedTaskItems);
            setSelectedTask(null);
            setShowModal(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.taskBoxContainer}>
                {taskItems.map((task, index) => (
                    <View key={index} style={styles.taskBox}>
                        <Text>{task.title.split(' ')[0]}</Text>
                        <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                            <FontAwesomeIcon icon={faXmark} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

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
        padding: 10,
    },
    taskBox: {
        backgroundColor: 'lightblue',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: '30%',
        marginRight: '3%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    tabText: {
        fontSize: 20,
        padding: 20,
        color: 'black',
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
    xmarkContainer: {
        alignSelf: 'flex-end',
        width: 50,
        height: 30,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: -40,
    },
    box: {

        display: 'flex',
        justifyContent: 'space-between',
    },
    taskBoxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },

});

export default Record;