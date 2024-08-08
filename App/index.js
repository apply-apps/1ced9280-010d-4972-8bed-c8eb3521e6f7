// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
    'U', 'V', 'W', 'X', 'Y', 'Z'
];

const LetterDisplay = () => {
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

    const nextLetter = () => {
        setCurrentLetterIndex((prevIndex) => (prevIndex + 1) % letters.length);
    };

    const prevLetter = () => {
        setCurrentLetterIndex((prevIndex) => (prevIndex - 1 + letters.length) % letters.length);
    };

    return (
        <View style={styles.letterContainer}>
            <Text style={styles.letter}>{letters[currentLetterIndex]}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Previous" onPress={prevLetter} />
                <Button title="Next" onPress={nextLetter} />
            </View>
        </View>
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Learn to Read</Text>
            <LetterDisplay />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    letterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        fontSize: 96,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
});