import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SchoolScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');

  const dummyData = [
    { id: '1', title: 'Placeholder Class 1' },
    { id: '2', title: 'Placeholder Class 2' },
    { id: '3', title: 'Placeholder Class 3' },
  ];

  const renderItem = ({ item }) => (
    <View className="m-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-school">
      <Text className="text-2xl font-bold p-4 bg-school/10">School Planner</Text>
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
            <Text className="mb-4 text-center text-lg font-bold">Add New School Item</Text>
            <TextInput
              className="h-10 border border-gray-300 mb-4 px-2.5 w-full rounded"
              placeholder="Subject"
              value={subject}
              onChangeText={setSubject}
            />
            <TextInput
              className="h-10 border border-gray-300 mb-4 px-2.5 w-full rounded"
              placeholder="Deadline (YYYY-MM-DD)"
              value={deadline}
              onChangeText={setDeadline}
            />
            <View className="flex-row justify-between w-full">
              <TouchableHighlight
                className="rounded-xl p-2.5 shadow-sm w-2/5 bg-white border border-gray-300"
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setSubject('');
                  setDeadline('');
                }}
              >
                <Text className="text-darkblue text-center font-bold">Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                className="rounded-xl p-2.5 shadow-sm w-2/5 bg-white border border-school"
                onPress={() => {
                  console.log('School Input:', { subject, deadline });
                  setModalVisible(!modalVisible);
                  setSubject('');
                  setDeadline('');
                }}
              >
                <Text className="text-school text-center font-bold">Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity className="absolute right-4 bottom-20 w-16 h-16 rounded-full bg-white border-2 border-school justify-center items-center shadow-xl" onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="darkblue" />
      </TouchableOpacity>
    </View>
  );
};

export default SchoolScreen;
