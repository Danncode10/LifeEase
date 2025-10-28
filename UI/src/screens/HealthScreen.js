import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, TouchableHighlight, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

const HealthScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activity, setActivity] = useState('');
  const [time, setTime] = useState('');
  const [healthEntries, setHealthEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingHealthEntry, setEditingHealthEntry] = useState(null); // New state for editing
  const [editedActivity, setEditedActivity] = useState('');
  const [editedTime, setEditedTime] = useState('');
  const userId = 1; // Temporary fixed user ID for prototype

  useEffect(() => {
    fetchHealthEntries();
  }, []);

  const fetchHealthEntries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/health/?user_id=${userId}`);
      setHealthEntries(response.data);
    } catch (error) {
      console.error('Error fetching health entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHealthEntry = async (entryId) => {
    Alert.alert(
      "Delete Health Entry",
      "Are you sure you want to delete this health entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/health/${entryId}`);
              fetchHealthEntries(); // Refresh the list
            } catch (error) {
              console.error('Error deleting health entry:', error);
              Alert.alert("Error", "Failed to delete health entry.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleEditHealthEntry = (entry) => {
    setEditingHealthEntry(entry);
    setEditedActivity(entry.activity);
    setEditedTime(entry.time);
    setEditModalVisible(true);
  };

  const handleUpdateHealthEntry = async () => {
    if (!editingHealthEntry) return;
    try {
      await axios.put(`${BASE_URL}/health/${editingHealthEntry.id}`, {
        activity: editedActivity,
        time: editedTime,
        user_id: userId
      });
      setEditModalVisible(false);
      setEditingHealthEntry(null);
      setEditedActivity('');
      setEditedTime('');
      fetchHealthEntries(); // Refresh the list
    } catch (error) {
      console.error('Error updating health entry:', error);
      Alert.alert("Error", "Failed to update health entry.");
    }
  };

  const renderItem = ({ item }) => (
    <View className="m-3 p-5 bg-gray-800 rounded-2xl shadow-md border border-red-400 flex-row justify-between items-center">
      <Text className="text-lg font-semibold text-red-400 flex-1">{item.activity}</Text>
      <View className="flex-row">
        <TouchableOpacity onPress={() => handleEditHealthEntry(item)} className="ml-3 p-2 bg-blue-500 rounded-full">
          <Ionicons name="create-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteHealthEntry(item.id)} className="ml-3 p-2 bg-red-500 rounded-full">
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-5">
      <Text className="text-3xl font-extrabold mb-6 text-red-400">Health</Text>
      <FlatList
        data={healthEntries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
          <View className="m-6 bg-gray-800 rounded-3xl p-8 w-11/12 max-w-md shadow-xl border border-red-400">
            <Text className="mb-6 text-center text-xl font-bold text-red-400">Add New Health Activity</Text>
            <TextInput
              className="h-12 border border-gray-600 mb-5 px-4 rounded-lg text-base text-gray-200"
              placeholder="Activity"
              placeholderTextColor="#9ca3af"
              value={activity}
              onChangeText={setActivity}
            />
            <TextInput
              className="h-12 border border-gray-600 mb-6 px-4 rounded-lg text-base text-gray-200"
              placeholder="Time (HH:MM)"
              placeholderTextColor="#9ca3af"
              value={time}
              onChangeText={setTime}
            />
            <View className="flex-row justify-between w-full">
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-gray-700 border border-blue-400"
                onPress={() => {
                  setModalVisible(false);
                  setActivity('');
                  setTime('');
                }}
                underlayColor="#1e40af"
              >
                <Text className="text-blue-400 text-center font-semibold">Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-red-400 border border-red-400"
                onPress={async () => {
                  try {
                    const response = await axios.post(`${BASE_URL}/health/`, {
                      activity: activity,
                      time: time,
                      user_id: userId
                    });
                    console.log('Health entry saved successfully:', response.data);
                    setModalVisible(false);
                    setActivity('');
                    setTime('');
                    fetchHealthEntries(); // Refresh list
                  } catch (error) {
                    console.error('Error saving health entry:', error.response ? error.response.data : error.message);
                  }
                }}
                underlayColor="#fca5a5"
              >
                <Text className="text-gray-900 text-center font-semibold">Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Health Entry Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
          <View className="m-6 bg-gray-800 rounded-3xl p-8 w-11/12 max-w-md shadow-xl border border-red-400">
            <Text className="mb-6 text-center text-xl font-bold text-red-400">Edit Health Activity</Text>
            <TextInput
              className="h-12 border border-gray-600 mb-5 px-4 rounded-lg text-base text-gray-200"
              placeholder="Activity"
              placeholderTextColor="#9ca3af"
              value={editedActivity}
              onChangeText={setEditedActivity}
            />
            <TextInput
              className="h-12 border border-gray-600 mb-6 px-4 rounded-lg text-base text-gray-200"
              placeholder="Time (HH:MM)"
              placeholderTextColor="#9ca3af"
              value={editedTime}
              onChangeText={setEditedTime}
            />
            <View className="flex-row justify-between w-full">
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-gray-700 border border-blue-400"
                onPress={() => {
                  setEditModalVisible(false);
                  setEditingHealthEntry(null);
                  setEditedActivity('');
                  setEditedTime('');
                }}
                underlayColor="#1e40af"
              >
                <Text className="text-blue-400 text-center font-semibold">Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-red-400 border border-red-400"
                onPress={handleUpdateHealthEntry}
                underlayColor="#fca5a5"
              >
                <Text className="text-gray-900 text-center font-semibold">Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        className="absolute right-5 bottom-20 w-16 h-16 rounded-full bg-red-400 border-2 border-red-400 justify-center items-center shadow-lg"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#1e3a8a" />
      </TouchableOpacity>
    </View>
  );
};

export default HealthScreen;
