import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, CheckBox, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colorValue from '../constants/ColorValue';
import { useNavigation } from '@react-navigation/native';

const EligibilityCheck = () => {
    const [answers, setAnswers] = useState({
        age: false,
        weight: false,
        healthIssues: false,
        recentSurgery: false,
        highBloodPressure: false,
        diabetes: false,
    });
    const [result, setResult] = useState('');
    const navigation = useNavigation();

    const handleQuizSubmit = () => {
        const { age, weight, healthIssues, recentSurgery, highBloodPressure, diabetes } = answers;
        if (age && weight && !healthIssues && !recentSurgery && !highBloodPressure && !diabetes) {
            setResult('Congratulations! You are eligible to donate blood.');
        } else {
            setResult('Sorry, you are not eligible to donate blood.');
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>
                Blood Donation Eligibility Quiz
            </Text>
            <View style={styles.questionContainer}>
                <CheckBox
                    title="Are you over 18 years of age?"
                    checked={answers.age}
                    onPress={() => setAnswers({ ...answers, age: !answers.age })}
                    textStyle={styles.checkboxText}
                />
                <CheckBox
                    title="Do you weigh at least 50kg (110 lbs)?"
                    checked={answers.weight}
                    onPress={() => setAnswers({ ...answers, weight: !answers.weight })}
                    textStyle={styles.checkboxText}
                />
                <CheckBox
                    title="Do you have any health issues?"
                    checked={answers.healthIssues}
                    onPress={() => setAnswers({ ...answers, healthIssues: !answers.healthIssues })}
                    textStyle={styles.checkboxText}
                />
                <CheckBox
                    title="Have you had any recent surgeries?"
                    checked={answers.recentSurgery}
                    onPress={() => setAnswers({ ...answers, recentSurgery: !answers.recentSurgery })}
                    textStyle={styles.checkboxText}
                />
                <CheckBox
                    title="Do you have high blood pressure?"
                    checked={answers.highBloodPressure}
                    onPress={() => setAnswers({ ...answers, highBloodPressure: !answers.highBloodPressure })}
                    textStyle={styles.checkboxText}
                />
                <CheckBox
                    title="Do you have diabetes?"
                    checked={answers.diabetes}
                    onPress={() => setAnswers({ ...answers, diabetes: !answers.diabetes })}
                    textStyle={styles.checkboxText}
                />
            </View>
            {result ? <Text h4 style={styles.result}>{result}</Text> : null}
            <Button
                title="Submit"
                icon={<Icon name="check" size={15} color="white" />}
                onPress={handleQuizSubmit}
                buttonStyle={styles.button}
            />
            <Button
                title="Back"

                onPress={() => navigation.navigate("BottomNavigation")}
                buttonStyle={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colorValue.primary,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    questionContainer: {
        marginBottom: 20,
        width: '100%',
    },
    checkboxText: {
        color: colorValue.primary,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#990000',
        paddingHorizontal: 40,
    },
    result: {
        marginTop: 20,
        textAlign: 'center',
        color: 'white',
    },
});

export default EligibilityCheck;
