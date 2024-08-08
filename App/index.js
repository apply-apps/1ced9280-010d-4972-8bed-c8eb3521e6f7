// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TextInput, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

const StoryGenerator = () => {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        setLoading(true);
        setStory('');
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant. Please create an engaging fairy tale."
                    },
                    {
                        role: "user",
                        content: `Create a fairy tale with a hero named ${hero}, a villain named ${villain}, and this plot: ${plot}.`
                    }
                ],
                model: "gpt-4o"
            });

            const resultString = response.data.response;
            setStory(resultString);
        } catch (error) {
            setStory("Error generating story. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={stylesGenerator.container}>
            <Text style={stylesGenerator.label}>Hero</Text>
            <TextInput
                style={stylesGenerator.input}
                value={hero}
                onChangeText={setHero}
            />
            <Text style={stylesGenerator.label}>Villain</Text>
            <TextInput
                style={stylesGenerator.input}
                value={villain}
                onChangeText={setVillain}
            />
            <Text style={stylesGenerator.label}>Plot</Text>
            <TextInput
                style={stylesGenerator.input}
                value={plot}
                onChangeText={setPlot}
            />
            <Button title="Generate Story" onPress={generateStory} />
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            {story ? <Text style={stylesGenerator.story}>{story}</Text> : null}
        </View>
    );
};

const stylesGenerator = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    story: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default function App() {
    return (
        <SafeAreaView style={stylesApp.container}>
            <Text style={stylesApp.title}>Fairy Tale Generator</Text>
            <ScrollView>
                <StoryGenerator />
            </ScrollView>
        </SafeAreaView>
    );
}

const stylesApp = StyleSheet.create({
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
});