// client/src/screens/Dashboard.js
// Title: Dashboard Screen
// Purpose: Displays scheduled posts and allows users to schedule new posts

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Dashboard = () => {
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [time, setTime] = useState(''); // Format: "MM/DD/YYYY HH:MM"

  // Fetch scheduled posts from the server on mount
  useEffect(() => {
    fetch('http://localhost:3000/posts/scheduled')
      .then((response) => response.json())
      .then((data) => setScheduledPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Handle scheduling a new post
  const handleSchedulePost = () => {
    if (!caption || !time) {
      alert('Please enter a caption and time!');
      return;
    }

    const newPost = { caption, time }; // In a real app, add imageUrl here
    fetch('http://localhost:3000/posts/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setScheduledPosts([...scheduledPosts, { id: Date.now().toString(), ...newPost }]);
        setCaption('');
        setTime('');
        alert(data.message);
      })
      .catch((error) => console.error('Error scheduling post:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Scheduled Posts</Text>
      <FlatList
        data={scheduledPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text>{`Time: ${item.time}`}</Text>
            <Text>{`Caption: ${item.caption}`}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter caption"
        value={caption}
        onChangeText={setCaption}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter time (MM/DD/YYYY HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Schedule New Post" onPress={handleSchedulePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  postItem: { marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default Dashboard;
