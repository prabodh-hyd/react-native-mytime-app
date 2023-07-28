import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Settings from './components/Settings';
import Record from './components/Record';
import Report from './components/Report';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

// function MyTime() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.content}>My Time</Text>
//     </View>
//   );
// }





// function Settings() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.content}>{Settings}</Text>
//     </View>
//   );
// }

const Tab = createMaterialTopTabNavigator();

function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: { marginTop: 50 },
          style: { elevation: 0 }
        }}>
        <Tab.Screen name="Record" component={Record} />
        <Tab.Screen name="Report" component={Report} />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faCog} size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  content: {
    fontSize: 20,
    color: 'purple',
  },
  iconContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
  },
  // settingsText: {
  //   fontSize: 16,
  //   color: 'blue',
  // },
});

export default App;