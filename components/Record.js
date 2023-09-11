import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import { useRecoilValue } from 'recoil';
import { taskItemsState } from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const Record = () => {
    const taskItems = useRecoilValue(taskItemsState);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTaskDescription, setSelectedTaskDescription] = useState('');
    const [alltasks, setAlltasks] = useState([]);

    useEffect(() => {
        fetchData();
       
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(
                'https://api.tagsearch.in/mytime/tasks/1'
            );
            const data = await response.json();
           
            setAlltasks(data);
        } catch (error) {
            console.error(error);
        }

        console.log("test" + alltasks);
    };

    const handleDeleteTask = (id) => {
        setSelectedTask(id);
        setShowModal(true);
    };

    // const showDescriptionToastAndroid = (description) => {

    //     // ToastAndroid.show({
    //     //     type: 'info',
    //     //     text1: '',
    //     //     text2: description,
    //     //     validity: 10000,
    //     // });
    //     ToastAndroid.showWithGravity(
    //         description,
    //         ToastAndroid.LONG,
    //         ToastAndroid.CENTER,
    //     );

    // };

    const handleTabPress = (hours) => {
        setShowModal(false);
        if (selectedTask !== null) {
            setSelectedTask(null);
        }
    };

    const handleTextPress = (description) => {
        setSelectedTaskDescription(description);
        setShowDescriptionModal(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.taskBoxContainer}>
                {alltasks.map((task) => (
                    <View key={task.id} style={styles.taskBox}>
                        <TouchableOpacity onPress={() => handleTextPress(task.description)}>
                            <Text style={{ fontSize: 16, marginRight: 15 }}>{task.title.split(' ')[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                            <FontAwesomeIcon icon={faXmark} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

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
        flexWrap: 'wrap',
        display: 'flex',
        padding: 10,
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    taskBox: {
        backgroundColor: 'lightblue',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: 'auto',
        marginRight: '3%',
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

    taskBoxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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