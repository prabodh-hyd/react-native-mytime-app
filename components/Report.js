import React from "react";
import { Text, View, StyleSheet } from 'react-native';



function Report() {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>Report</Text>
        </View>
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
})

export default Report;