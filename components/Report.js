import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Report = () => {
    const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
            {
                data: [1, 4, 2, 8, 9],
            },
        ],
    };

    // Custom bar decorator with red and yellow gradient
    const GradientBar = (props) => {
        return (
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.bar,
                        { height: props.value * 20 }, // Adjust the bar height
                    ]}
                >
                    <View style={styles.redBar} />
                    <View style={styles.yellowBar} />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <BarChart
                data={data}
                width={320}
                height={300}
                yAxisSuffix=""
                fromZero={true} // Start y-axis labels from 1
                chartConfig={chartConfig}
                style={styles.chart}
                decorator={GradientBar}
            />
        </View>
    );
};

const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: () => `rgba(255, 0, 0, 1)`, // Red color for labels
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chart: {
        marginVertical: 8,
    },
    barContainer: {
        flex: 1,
        backgroundColor: 'fill',
        alignItems: 'center',
    },
    bar: {
        width: 40, // Adjust the width of the bars
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    redBar: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
    },
    yellowBar: {
        width: '100%',
        height: '60%', // Adjust the height of the yellow portion
        backgroundColor: 'yellow',
    },
});

export default Report;
