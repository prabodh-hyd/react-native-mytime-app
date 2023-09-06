import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './components/Settings';
import Record from './components/Record';
import Report from './components/Report';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartPie, faClipboard } from '@fortawesome/free-solid-svg-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RecoilRoot } from 'recoil';


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
            <FontAwesomeIcon icon={faClipboard} size={20} color="blue" />

          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faChartPie} size={20} color="blue" />

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
              headerRight: () => (
                <FontAwesome.Button name="gear" color="#3b5998"
                  backgroundColor={"#ffff"} onPress={() => navigation.navigate('Settings')}>
                </FontAwesome.Button>
              ),
            })}
          />
          <Stack.Screen name="Settings" component={Settings} />

        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;