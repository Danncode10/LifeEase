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
    <View className="m-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-health">
      <Text className="text-2xl font-bold p-4 bg-health/10">Health</Text>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center mt-5">
          <View className="m-5 bg-white rounded-3xl p-9 items-center shadow-lg">
            <Text className="mb-4 text-center text-lg font-bold">Add New Health Activity</Text>
            <TextInput
              className="h-10 border border-gray-300 mb-4 px-2.5 w-full rounded"
              placeholder="Activity"
              value={activity}
              onChangeText={setActivity}
            />
            <TextInput
              className="h-10 border border-gray-300 mb-4 px-2.5 w-full rounded"
              placeholder="Time (HH:MM)"
              value={time}
              onChangeText={setTime}
            />
            <View className="flex-row justify-between w-full">
              <TouchableHighlight
                className="rounded-xl p-2.5 shadow-sm w-2/5 bg-white border border-gray-300"
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setActivity('');
                  setTime('');
                }}
              >
                <Text className="text-darkblue text-center font-bold">Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                className="rounded-xl p-2.5 shadow-sm w-2/5 bg-white border border-health"
                onPress={() => {
                  console.log('Health Input:', { activity, time });
                  setModalVisible(!modalVisible);
                  setActivity('');
                  setTime('');
                }}
              >
                <Text className="text-darkblue text-center font-bold">Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity className="absolute right-4 bottom-20 w-16 h-16 rounded-full bg-white border-2 border-health justify-center items-center shadow-xl" onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="darkblue" />
      </TouchableOpacity>
    </View>
  );
};

export default HealthScreen;
