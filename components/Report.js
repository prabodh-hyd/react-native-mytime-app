import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';
import { useState } from 'react';
import { BarChart } from "react-native-gifted-charts";
import { userSpecificTasks, registeredUser, addTasksRecoil, hoursState, selectedstatus } from './recoil';
import { useRecoilState } from 'recoil';


const Report = () => {

    const [trackerData, setTrackerData] = useState([]);
    const [userTasks, setUserTasks] = useRecoilState(userSpecificTasks);
    const [uniqueTasksTracker, setUniqueTasksTracker] = useState([]);
    const [mergedRecords, setMergedRecords] = useState([]);
    const [userRegistered, setuserRegistered] = useRecoilState(registeredUser);
    const [finaldata, setFinalData] = useState([]);
    const [taskadd, setTaskadd] = useRecoilState(addTasksRecoil);
    const [hours, sethours] = useRecoilState(hoursState);
    const [selectedStatus, setSelectedStatus] = useRecoilState(selectedstatus);



    useEffect(() => {
        fetchTrackerData();
    }, [])


    useEffect(() => {

        fetchTrackerData()


    }, [userRegistered, taskadd, hours, selectedStatus, userTasks])





    const fetchTrackerData = async () => {
        try {

            const response = await fetch("https://api.tagsearch.in/mytime/tracker");

            if (response.ok) {
                const trackerdata = await response.json();

                // filtering userspecific tasks by getting records from recoil 
                const filteredArray = trackerdata.filter(item => {
                    return userTasks.some(value => value.taskid === item.taskid)
                })

                const sumByTaskId = filteredArray.reduce((acc, item) => {
                    const taskId = item.taskid;
                    const hours = item.hours;
                    const existingTask = acc.find(task => task.taskid === taskId);
                    if (existingTask) {
                        existingTask.hours += hours;
                    } else {
                        acc.push({ ...item });
                    }
                    return acc;
                }, []);

                setUniqueTasksTracker(sumByTaskId);
                let mergedArray = [];

                userTasks.forEach((item) => {

                    const task = sumByTaskId.find((value) => value.taskid === item.taskid);

                    if (task) {
                        mergedArray.push({ ...task, ...item });
                    }
                })

                setMergedRecords(mergedArray);

                const data = mergedArray.length > 0 ?
                    mergedArray.map((item) => ({
                        value: item.hours, label: item.task_name, spacing: 35,
                        frontColor: item.status == "IN_PROGRESS" || item.status == "OPEN" ? "blue" : item.status == "CLOSED" ? "red" : "grey"
                    }))
                    : []

                setFinalData(data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const mergeTasksTrackerArrays = () => {

        let mergedArray = [];

        userTasks.forEach((item) => {

            const task = uniqueTasksTracker.find((value) => value.taskid === item.taskid);

            if (task) {
                mergedArray.push({ ...task, ...item });
            }
        })

        setMergedRecords(mergedArray);

        const data = mergedRecords.length > 0 ?
            mergedRecords.map((item) => ({
                value: item.hours, label: item.task_name, spacing: 35,
                frontColor: item.status == "IN_PROGRESS" || item.status == "OPEN" ? "blue" : item.status == "CLOSED" ? "red" : "grey"
            }))
            : []

        setFinalData(data);
    }



    return <View style={styles.barChartDiv}>
        {userTasks.length == 0 ?
            <Text>No tasks</Text> :
            mergedRecords.length > 0 ?
                <BarChart
                    barWidth={22}
                    noOfSections={10}
                    frontColor="grey"
                    barBorderRadius={4}
                    data={finaldata}
                    yAxisThickness={0}
                    xAxisThickness={0} />
                : <Text>Loading</Text>
        }

    </View>
};

styles = StyleSheet.create({
    barChartDiv: {
        marginTop: 150,
        marginLeft: 20,

    }
})



export default Report;