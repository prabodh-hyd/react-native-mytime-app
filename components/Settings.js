import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal, ScrollView, TextInput, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faPen } from '@fortawesome/free-solid-svg-icons';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { showStatusModal } from '../App';
import { RadioButton } from 'react-native-paper';
import { storeuser } from './Record';
import { taskItemsState } from './AddtaskPage';

export const selectedStatus = atom({
  key: 'selectedStatus',
  default: "InProgressTasks",
});

export const editTasks = atom({
  key: 'editTasks',
  default: null,
});

const Settings = () => {
  const [tasks, setTasks] = useState([]);
  const [InProgressTasks, setInProgressTasks] = useState([]);
  const [ClosedTasks, setClosedTasks] = useState([]);
  const [StaleTasks, setStaleTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(-1);
  const [editTask, setEditTask] = useRecoilState(editTasks);
  const [editTitle, setEditTitle] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showmodal, setShowmodal] = useRecoilState(showStatusModal);
  const [selectedValue, setSelectedValue] = useRecoilState(selectedStatus);
  const [tasksTorender, setTaskstorender] = useState([]);
  const navigation = useNavigation();
  const showModal = useRecoilValue(showStatusModal);
  const [user, setUser] = useRecoilState(storeuser);
  const [taskadd, setTaskadd] = useRecoilState(taskItemsState);


  // console.log(InProgressTasks);


  useEffect(() => {
    fetchData();
  }, [taskadd]);

  useEffect(() => {
    getDatafromLocalStorage();
  }, []);

  const getDatafromLocalStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('user');
        const parsedvalue = JSON.parse(value);
       
        if (parsedvalue !== null) {
            setUser(parsedvalue.toLowerCase());
        }
    } catch (e) {
        console.log(e);
    }
};

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.tagsearch.in/mytime/tasks/${user}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);

        const inprogressStatus = data.filter((item) => (item.status == "OPEN" || item.status == "IN_PROGRESS"));
        setInProgressTasks(inprogressStatus);
        setTaskstorender(inprogressStatus);
        setSelectedValue("InProgressTasks");

        const completedStatus = data.filter((item) => item.status == "CLOSED");
        setClosedTasks(completedStatus);


        const staledStatus = data.filter((item) => item.status == "STALE");
        setStaleTasks(staledStatus);

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
      const updatedTask = { ...editTask, task_name: editTitle, task_description: editDescription };


      const dataToSend = {
        task_name: updatedTask.task_name,
        task_description: updatedTask.task_description,
        status: updatedTask.status,
      };

      try {
        const response = await fetch(`https://api.tagsearch.in/mytime/tasks/${updatedTask.taskid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
        if (response.ok) {
          console.log('Task updated successfully.');
          fetchData();
        } else {
          console.error('Failed to update task.');
          // You may want to revert the local state if the API call fails
          // setTasks(tasks); // Revert to the previous state
        }
      } catch (error) {
        console.error(error);
        // Handle any network or request error here
      }
    }

    setEditTask(null);
    setModalVisible(false);
  };


  //   setEditTask(null);
  //   setModalVisible(false);
  // };

  const handleCancelEdit = () => {
    setEditTask(null);
    setModalVisible(false);
  };

  const handleRadioButtonPress = (value) => {

    // You can add your custom logic here based on the selected value
    switch (value) {
      case 'InProgressTasks':
        setTaskstorender(InProgressTasks);
        setSelectedValue(value);
        break;
      case 'closedTasks':
        setTaskstorender(ClosedTasks);
        setSelectedValue(value);
        break;
      case 'staleTasks':
        setTaskstorender(StaleTasks);
        setSelectedValue(value);
        break;
      default:
        break;
    }
  };


  return (
    <ScrollView style={styles.container}>

      {tasksTorender.length == 0 ? <Text style={styles.noTasksaddedText}>No Tasks </Text>  
      :tasksTorender.map((task, index) => (
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
                <FontAwesomeIcon icon={faAngleDown} size={18} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEditTask(task)}>
                <FontAwesomeIcon icon={faPen} size={16} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* modal for edit task */}

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
          <View style={styles.SaveCancelCont}>
            <TouchableOpacity onPress={handleSaveEdit}>
              <Text style={styles.modalButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelEdit}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      {/* modal for status */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowmodal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowmodal(false)}>
          <View style={styles.radioGroup}>
            <RadioButton.Group
              onValueChange={(value) => handleRadioButtonPress(value)}
              value={selectedValue}
            >
              <View style={styles.radioButton}>
                <RadioButton value="InProgressTasks" color="black" />
                <Text style={styles.radioLabel}>InProgress Tasks</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="closedTasks" color="black" />
                <Text style={styles.radioLabel}>Closed Tasks</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="staleTasks" color="black" />
                <Text style={styles.radioLabel}>Stale Tasks</Text>
              </View>
            </RadioButton.Group>

            <Button
              onPress={() => setShowmodal(false)}
              title="close"
              color="black"
              style={styles.submitbutton}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskBox: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleDescriptionContainer: {
    flexDirection: 'column',
    flex: 1,
    marginBottom: 15,

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
    color: 'white',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#0b70db',
    padding: 8,

  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column', // Change from row to column
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  radioContainer: {
    width: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
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

  submitbutton: {
    marginTop: 50,
    width: '10%'
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'column',
    width: '80%',
    alignSelf: "center",
    margin: 'auto',
    justifyContent: 'space-around',
    marginTop: 200,
    borderRadius: 8,
    backgroundColor: 'whitesmoke',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  SaveCancelCont: {
    display: 'flex',
    flexDirection: "row",
    gap: 30,
    alignSelf: 'center'
  },
  noTasksaddedText:{
    fontSize: 25,
    fontWeight:'bold',
    marginTop:200,
    marginLeft:120
}
});

export default Settings;
