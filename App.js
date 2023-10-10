import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Home({ navigation }) {
  return (

    <Tab.Navigator>
      {/* <Tab.Screen
        name="Home"
        component={DashBoard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} size={20} />

          ),
        }}
      /> */}
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


      {/* <Tab.Screen name="Record" component={Record} /> */}
      {/* <Tab.Screen name="Report" component={Report} /> */}
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
            component={Settings}
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