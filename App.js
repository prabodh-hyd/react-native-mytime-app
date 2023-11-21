import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import DropDownPicker from 'react-native-dropdown-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './components/Settings';
import Record from './components/Record';
import Report from './components/Report';
import AddtaskPage from './components/AddtaskPage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartPie, faClipboard, faPlus } from '@fortawesome/free-solid-svg-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RecoilRoot } from 'recoil';
import { Button } from '@react-native-material/core';
import { atom, useRecoilState } from 'recoil';

export const showStatusModal = atom({
  key: 'showStatusModal',
  default: false ,
});


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();




function Home({ navigation }) {
  return (

    <Tab.Navigator>
      <Tab.Screen
        name="Record"
        component={Record}
        options={{
          tabBarLabel: 'Record',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faClipboard} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faChartPie} size={20} />

          ),
        }}
      />

    </Tab.Navigator>
  );
}

function SettingsTest({ navigation }) {

  const [showmodal , setShowModal] = useRecoilState(showStatusModal);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="status"
        component={Settings}
        options={{
          headerRight: () => (
            <FontAwesome.Button name="bars" color="grey" size="small"
              backgroundColor={"white"} onPress={() => setShowModal(true) }>
            </FontAwesome.Button>
          ),
       
        }}
      />
    </Tab.Navigator>
  );
}



function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MyTime"
            component={Home}
            options={({ navigation, route }) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: '#14dffa',
                color: 'black'
              },
              headerRight: () => (
                <FontAwesome.Button name="gear" color="black"
                  backgroundColor={"#14dffa"} onPress={() => navigation.navigate('Settings')}>
                </FontAwesome.Button>
              ),
            })}
          />

          <Stack.Screen
            name="Settings"
            component={SettingsTest}
            options={({ navigation }) => ({
              title: 'Settings',
              headerStyle: {
                backgroundColor: '#14dffa', // Change the header background color
              },
              headerTitleStyle: {
                color: 'black', // Change the header text color
              },


              headerRight: () => (
                <FontAwesome.Button
                  name="plus" // Use the 'name' prop instead of 'icon'
                  color="black"
                  size={35}
                  backgroundColor="#14dffa"
                  onPress={() => navigation.navigate('AddtaskPage')}
                />
              ),
            })}
          />

          <Stack.Screen
            name="AddtaskPage"
            component={AddtaskPage}
            options={{
              title: 'AddtaskPage',
              headerStyle: {
                backgroundColor: '#14dffa',
              },
              headerTitleStyle: {
                color: 'black',
              },
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;