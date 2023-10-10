
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
// import { useRecoilValue } from 'recoil';
// import { taskItemsState } from './AddtaskPage';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

// const Record = () => {
//     const taskItems = useRecoilValue(taskItemsState);
//     const [newTask, setNewTask] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [selectedTask, setSelectedTask] = useState(null);
//     const [showTaskDescriptionPopup, setShowTaskDescriptionPopup] = useState(false);


//     const handleDeleteTask = (id) => {
//         setSelectedTask(id);
//         setShowModal(true);
//     };

//     const handleTaskClick = (task) => {
//         setSelectedTask(task);
//         setShowTaskDescriptionPopup(true);
//     };


//     const handleTabPress = (hours) => {
//         setShowModal(false);
//         // if (selectedTask !== null) {
//         //     const updatedTaskItems = taskItems.filter((item) => item.id !== selectedTask);
//         //     setNewTask(updatedTaskItems);
//         //     setSelectedTask(null);
//         //     setShowModal(false);
//         // }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.taskBoxContainer}>
//                 {taskItems.map((task, index) => (
//                     <TouchableOpacity key={index} onPress={() => handleTaskClick(task)}>
//                         <View style={styles.taskBox}>
//                             <Text>{task.title.split(' ')[0]}</Text>
//                             <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
//                                 <FontAwesomeIcon icon={faXmark} size={20} color="black" />
//                             </TouchableOpacity>
//                         </View>
//                     </TouchableOpacity>
//                 ))}
//             </View>
//             <Modal
//                 visible={showTaskDescriptionPopup}
//                 transparent={true}
//                 animationType="fade"
//                 onRequestClose={() => setShowTaskDescriptionPopup(false)}
//             >
//                 <TouchableWithoutFeedback onPress={() => setShowTaskDescriptionPopup(false)}>
//                     <View style={styles.modalBackground}>
//                         <View style={styles.modalContent}>
//                             {selectedTask && (
//                                 // <Text style={styles.taskDescription}>{taskDescriptions[selectedTask.title]}</Text>
//                                 <Text style={styles.taskDescription}>{selectedTask && selectedTask.description}</Text>

//                             )}
//                         </View>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>

//             <Modal
//                 visible={showModal}
//                 transparent={true}
//                 animationType="fade"
//                 onRequestClose={() => setShowModal(false)}
//             >
//                 <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
//                     <View style={styles.modalBackground}>
//                         <View style={styles.modalContent}>
//                             {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((hours) => (
//                                 <TouchableOpacity key={hours} onPress={() => handleTabPress(hours)}>
//                                     <Text style={styles.tabText}>{hours}</Text>
//                                 </TouchableOpacity>
//                             ))}

//                         </View>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'flex-start',
//         flexDirection: 'row',
//         // flexWrap: 'wrap',
//         // display: 'flex',
//         padding: 10,
//         justifyContent: 'space-between',
//         marginLeft: 20,
//     },
//     taskBox: {
//         backgroundColor: 'lightblue',
//         padding: 10,
//         marginBottom: 15,
//         borderRadius: 5,
//         width: 200,
//         height: 'auto',
//         marginLeft: '15%',
//         justifyContent: 'space-between',
//         flexDirection: 'row',

//     },
//     tabText: {
//         fontSize: 20,
//         padding: 20,
//         color: 'black',
//     },
//     scrollView: {
//         flex: 1,
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         padding: 20,
//         borderRadius: 10,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         margin: 15
//     },
//     taskBoxContainer: {
//         // flexDirection: 'row',
//         // flexWrap: 'wrap',
//         justifyContent: 'flex-start',
//     },




import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useRecoilValue } from 'recoil';
import { taskItemsState } from './AddtaskPage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Collapsible from 'react-native-collapsible';

const Record = () => {
    const taskItems = useRecoilValue(taskItemsState);
    // const [showModal, setShowModal] = useState(false);
    const [expandedTask, setExpandedTask] = useState(null);



    const toggleTaskDescription = (id) => {
        if (expandedTask === id) {
            setExpandedTask(null); // Collapse if it's already expanded
        } else {
            setExpandedTask(id); // Expand if it's collapsed
        }
    };

    return (
        <ScrollView style={styles.container}>
            {taskItems.map((task, index) => (
                <View key={index} style={styles.taskBox}>
                    <Text>{task.title.split(' ')[0]}</Text>
                    <Collapsible collapsed={expandedTask !== task.id}>
                        <Text style={styles.taskDescription}>{task.description}</Text>
                    </Collapsible>
                    <TouchableOpacity onPress={() => toggleTaskDescription(task.id)}>
                        <FontAwesomeIcon icon={faAngleDown} size={20} color="black" />
                    </TouchableOpacity>
                </View>
            ))}
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
        marginBottom: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    taskDescription: {

        padding: 10,
        borderRadius: 5,
        marginTop: 10,
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
});

export default Record;
