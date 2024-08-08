// Filename: index.js
// Combined code from all files

import React, { useState, useEffect, useCallback } from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Button, 
    ActivityIndicator, 
    ScrollView 
} from 'react-native';
import axios from 'axios';

const CardList = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProfiles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide fake user profiles for a dating app." },
                    { role: "user", content: "I need 5 user profiles with names, ages, and pictures." }
                ],
                model: "gpt-4o"
            });

            const profilesData = JSON.parse(response.data.response);
            setProfiles(profilesData.slice(0, 5));
        } catch (error) {
            console.error('Failed to fetch profiles:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.list}>
            {profiles.map((profile, index) => (
                <View key={index} style={styles.card}>
                    <Image source={{ uri: `https://picsum.photos/200/300?random=${index}` }} style={styles.image} />
                    <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                    <Button title="Like" onPress={() => alert(`Liked ${profile.name}`)} />
                    <Button title="Dislike" onPress={() => alert(`Disliked ${profile.name}`)} />
                </View>
            ))}
        </ScrollView>
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Flirting App</Text>
            <CardList />
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
    list: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        width: '90%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
});