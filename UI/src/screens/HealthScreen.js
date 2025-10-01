import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HealthScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activity, setActivity] = useState('');
  const [time, setTime] = useState('');

  const dummyData = [
    { id: '1', title: 'Placeholder Workout 1' },
    { id: '2', title: 'Placeholder Workout 2' },
    { id: '3', title: 'Placeholder Workout 3' },
  ];

  const renderItem = ({ item }) => (
    <View className="m-3 p-5 bg-gray-800 rounded-2xl shadow-md border border-yellow-400">
      <Text className="text-lg font-semibold text-yellow-400">{item.title}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-5">
      <Text className="text-3xl font-extrabold mb-6 text-yellow-400">Health</Text>
      <FlatList
        data={dummyData}
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
            <Text className="mb-6 text-center text-xl font-bold text-yellow-400">Add New Health Activity</Text>
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
                className="rounded-xl p-3 shadow-sm w-2/5 bg-yellow-400 border border-yellow-400"
                onPress={() => {
                  console.log('Health Input:', { activity, time });
                  setModalVisible(false);
                  setActivity('');
                  setTime('');
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

export default HealthScreen;
