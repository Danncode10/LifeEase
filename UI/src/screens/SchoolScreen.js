import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, TouchableHighlight, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

const SchoolScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [schoolActivities, setSchoolActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingSchoolActivity, setEditingSchoolActivity] = useState(null); // New state for editing
  const [editedSubject, setEditedSubject] = useState('');
  const [editedDeadline, setEditedDeadline] = useState('');
  const userId = 1; // Temporary fixed user ID for prototype

  useEffect(() => {
    fetchSchoolActivities();
  }, []);

  const fetchSchoolActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/school/?user_id=${userId}`);
      setSchoolActivities(response.data);
    } catch (error) {
      console.error('Error fetching school activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchoolActivity = async (activityId) => {
    Alert.alert(
      "Delete School Activity",
      "Are you sure you want to delete this school activity?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/school/${activityId}`);
              fetchSchoolActivities(); // Refresh the list
            } catch (error) {
              console.error('Error deleting school activity:', error);
              Alert.alert("Error", "Failed to delete school activity.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleEditSchoolActivity = (activity) => {
    setEditingSchoolActivity(activity);
    setEditedSubject(activity.subject);
    setEditedDeadline(activity.deadline ? activity.deadline.substring(0, 10) : ''); // Format date for TextInput
    setEditModalVisible(true);
  };

  const handleUpdateSchoolActivity = async () => {
    if (!editingSchoolActivity) return;
    try {
      await axios.put(`${BASE_URL}/school/${editingSchoolActivity.id}`, {
        subject: editedSubject,
        deadline: editedDeadline ? `${editedDeadline}T00:00:00` : null,
        user_id: userId
      });
      setEditModalVisible(false);
      setEditingSchoolActivity(null);
      setEditedSubject('');
      setEditedDeadline('');
      fetchSchoolActivities(); // Refresh the list
    } catch (error) {
      console.error('Error updating school activity:', error);
      Alert.alert("Error", "Failed to update school activity.");
    }
  };

  const renderItem = ({ item }) => (
    <View className="m-3 p-5 bg-gray-800 rounded-2xl shadow-md border border-yellow-400 flex-row justify-between items-center">
      <Text className="text-lg font-semibold text-yellow-400 flex-1">{item.subject}</Text>
      <View className="flex-row">
        <TouchableOpacity onPress={() => handleEditSchoolActivity(item)} className="ml-3 p-2 bg-blue-500 rounded-full">
          <Ionicons name="create-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteSchoolActivity(item.id)} className="ml-3 p-2 bg-red-500 rounded-full">
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-5">
      <Text className="text-3xl font-extrabold mb-6 text-yellow-400">School Planner</Text>
      <FlatList
        data={schoolActivities}
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
          <View className="m-6 bg-gray-800 rounded-3xl p-8 w-11/12 max-w-md shadow-xl border border-yellow-400">
            <Text className="mb-6 text-center text-xl font-bold text-yellow-400">Add New School Item</Text>
            <TextInput
              className="h-12 border border-gray-600 mb-5 px-4 rounded-lg text-base text-gray-200"
              placeholder="Subject"
              placeholderTextColor="#9ca3af"
              value={subject}
              onChangeText={setSubject}
            />
            <TextInput
              className="h-12 border border-gray-600 mb-6 px-4 rounded-lg text-base text-gray-200"
              placeholder="Deadline (YYYY-MM-DD)"
              placeholderTextColor="#9ca3af"
              value={deadline}
              onChangeText={setDeadline}
            />
            <View className="flex-row justify-between w-full">
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-gray-700 border border-blue-400"
                onPress={() => {
                  setModalVisible(false);
                  setSubject('');
                  setDeadline('');
                }}
                underlayColor="#1e40af"
              >
                <Text className="text-blue-400 text-center font-semibold">Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-yellow-400 border border-yellow-400"
                onPress={async () => {
                  try {
                    await axios.post(`${BASE_URL}/school/`, {
                      subject: subject,
                      deadline: deadline ? `${deadline}T00:00:00` : null,
                      user_id: userId
                    });
                    setModalVisible(false);
                    setSubject('');
                    setDeadline('');
                    fetchSchoolActivities(); // Refresh list
                  } catch (error) {
                    console.error('Error saving school activity:', error);
                  }
                }}
                underlayColor="#facc15"
              >
                <Text className="text-gray-900 text-center font-semibold">Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit School Activity Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
          <View className="m-6 bg-gray-800 rounded-3xl p-8 w-11/12 max-w-md shadow-xl border border-yellow-400">
            <Text className="mb-6 text-center text-xl font-bold text-yellow-400">Edit School Item</Text>
            <TextInput
              className="h-12 border border-gray-600 mb-5 px-4 rounded-lg text-base text-gray-200"
              placeholder="Subject"
              placeholderTextColor="#9ca3af"
              value={editedSubject}
              onChangeText={setEditedSubject}
            />
            <TextInput
              className="h-12 border border-gray-600 mb-6 px-4 rounded-lg text-base text-gray-200"
              placeholder="Deadline (YYYY-MM-DD)"
              placeholderTextColor="#9ca3af"
              value={editedDeadline}
              onChangeText={setEditedDeadline}
            />
            <View className="flex-row justify-between w-full">
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-gray-700 border border-blue-400"
                onPress={() => {
                  setEditModalVisible(false);
                  setEditingSchoolActivity(null);
                  setEditedSubject('');
                  setEditedDeadline('');
                }}
                underlayColor="#1e40af"
              >
                <Text className="text-blue-400 text-center font-semibold">Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-yellow-400 border border-yellow-400"
                onPress={handleUpdateSchoolActivity}
                underlayColor="#facc15"
              >
                <Text className="text-gray-900 text-center font-semibold">Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        className="absolute right-5 bottom-20 w-16 h-16 rounded-full bg-yellow-400 border-2 border-yellow-400 justify-center items-center shadow-lg"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#1e3a8a" />
      </TouchableOpacity>
    </View>
  );
};

export default SchoolScreen;
