import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, TouchableHighlight, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000'; // Android emulator localhost
  } else if (Platform.OS === 'ios') {
    return 'http://127.0.0.1:8000'; // iOS simulator localhost
  } else {
    return 'http://192.168.100.166:8000'; // Replace with your local machine's IP address if using a physical device
  }
};

const BASE_URL = getBaseUrl();

const SchoolScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [schoolActivities, setSchoolActivities] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const renderItem = ({ item }) => (
    <View className="m-3 p-5 bg-gray-800 rounded-2xl shadow-md border border-yellow-400">
      <Text className="text-lg font-semibold text-yellow-400">{item.subject}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-5">
      <Text className="text-3xl font-extrabold mb-6 text-yellow-400">School Planner</Text>
      <FlatList
        data={schoolActivities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
