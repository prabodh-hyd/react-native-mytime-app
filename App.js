import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { selectedStatus } from './components/recoil';
import Settings from './components/Settings';
import Record from './components/Record';
import Report from './components/Report';
import Register from './components/Register';
import AddtaskPage from './components/AddtaskPage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartPie, faClipboard, faClock, faClockFour } from '@fortawesome/free-solid-svg-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RecoilRoot, useRecoilValue } from 'recoil';
import {useRecoilState ,atom} from 'recoil';
import { registeredUser } from './components/recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showStatusModal } from './components/recoil';


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

  const [showmodal, setShowModal] = useRecoilState(showStatusModal);
  let selectedstatus = useRecoilValue(selectedStatus);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Status"
        component={Settings}
        options={{
          tabBarLabel: () => null,
          headerRight: () => (
            <View style={styles.status}>
              <Text>{selectedstatus}</Text>
              <FontAwesome.Button name="bars" color="grey" size={16}
                backgroundColor={"white"} onPress={() => setShowModal(true)}>
              </FontAwesome.Button>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}


function Main() {

  
  const [user, setuser] = useState(null);
  console.log(user,"user in app")
  const [userRegistered, setuserRegistered] = useRecoilState(registeredUser);
  console.log("app", userRegistered)


  useEffect(() => {
    getDatafromLocalStorage();
  }, []);


  useEffect(() => {
    getDatafromLocalStorage();
  }, [user, userRegistered]);


  const getDatafromLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      const parsedvalue = JSON.parse(value);

      if (parsedvalue !== null) {
        setuser(parsedvalue.toLowerCase());
        
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MyTime" 
            component={user || userRegistered ? Home : Register}
            // component={Register}
            options={({ navigation, route }) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: '#81a7e3',
                color: 'black'
              },
              headerRight: () => (
                <FontAwesome.Button name="gear" color="black"
                  backgroundColor={"#81a7e3"} onPress={() => {user ? navigation.navigate('Settings'): Register}}>
                </FontAwesome.Button>
              ),
           
            })}
          />

          <Stack.Screen
            name="Settings"
            component={user ? SettingsTest : Register}
            options={({ navigation }) => ({
              title: 'Settings',
              headerStyle: {
                backgroundColor: '#81a7e3', // Change the header background color
              },
              headerTitleStyle: {
                color: 'black', // Change the header text color
              },


              headerRight: () => (
                <FontAwesome.Button
                  name="plus" // Use the 'name' prop instead of 'icon'
                  color="black"
                  size={25}
                  backgroundColor="#81a7e3"
                  onPress={() =>{ navigation.navigate('AddtaskPage')}}
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
                backgroundColor: '#81a7e3',
              },
              headerTitleStyle: {
                color: 'black',
              },
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    
  );
}


function App() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  )
}
export default App;


const styles = StyleSheet.create({
  status: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 70,
    color: '#f27507',
    fontWeight: "bold"
  }
})

