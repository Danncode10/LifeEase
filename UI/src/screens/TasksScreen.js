import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, TouchableHighlight, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

const TasksScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // New state to hold the task being edited
  const [editedName, setEditedName] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const userId = 1; // Temporary fixed user ID for prototype

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/tasks/?user_id=${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/tasks/${taskId}`);
              fetchTasks(); // Refresh the task list
            } catch (error) {
              console.error('Error deleting task:', error);
              Alert.alert("Error", "Failed to delete task.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedName(task.title);
    setEditedDueDate(task.due_date ? task.due_date.substring(0, 10) : ''); // Format date for TextInput
    setEditModalVisible(true);
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;
    try {
      await axios.put(`${BASE_URL}/tasks/${editingTask.id}`, {
        title: editedName,
        due_date: editedDueDate ? `${editedDueDate}T00:00:00` : null,
        user_id: userId
      });
      setEditModalVisible(false);
      setEditingTask(null);
      setEditedName('');
      setEditedDueDate('');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert("Error", "Failed to update task.");
    }
  };

  const renderItem = ({ item }) => (
    <View className="m-3 p-5 bg-gray-800 rounded-2xl shadow-md border border-green-400 flex-row justify-between items-center">
      <Text className="text-lg font-semibold text-green-400 flex-1">{item.title}</Text>
      <View className="flex-row">
        <TouchableOpacity onPress={() => handleEditTask(item)} className="ml-3 p-2 bg-blue-500 rounded-full">
          <Ionicons name="create-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)} className="ml-3 p-2 bg-red-500 rounded-full">
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-5">
      <Text className="text-3xl font-extrabold mb-6 text-green-400">Tasks</Text>
      <FlatList
        data={tasks}
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
          <View className="m-6 bg-gray-800 rounded-3xl p-8 w-11/12 max-w-md shadow-xl border border-green-400">
            <Text className="mb-6 text-center text-xl font-bold text-green-400">Add New Task</Text>
            <TextInput
              className="h-12 border border-gray-600 mb-5 px-4 rounded-lg text-base text-gray-200"
              placeholder="Task Name"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              className="h-12 border border-gray-600 mb-6 px-4 rounded-lg text-base text-gray-200"
              placeholder="Due Date (YYYY-MM-DD)"
              placeholderTextColor="#9ca3af"
              value={dueDate}
              onChangeText={setDueDate}
            />
            <View className="flex-row justify-between w-full">
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-gray-700 border border-blue-400"
                onPress={() => {
                  setModalVisible(false);
                  setName('');
                  setDueDate('');
                }}
                underlayColor="#1e40af"
              >
                <Text className="text-blue-400 text-center font-semibold">Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-green-400 border border-green-400"
                onPress={async () => {
                  try {
                    await axios.post(`${BASE_URL}/tasks/`, {
                      title: name,
                      due_date: dueDate ? `${dueDate}T00:00:00` : null,
                      user_id: userId
                    });
                    setModalVisible(false);
                    setName('');
                    setDueDate('');
                    fetchTasks(); // Refresh list
                  } catch (error) {
                    console.error('Error saving task:', error);
                  }
                }}
                underlayColor="#86efac"
              >
                <Text className="text-gray-900 text-center font-semibold">Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
          <View className="m-6 bg-gray-800 rounded-3xl p-8 w-11/12 max-w-md shadow-xl border border-green-400">
            <Text className="mb-6 text-center text-xl font-bold text-green-400">Edit Task</Text>
            <TextInput
              className="h-12 border border-gray-600 mb-5 px-4 rounded-lg text-base text-gray-200"
              placeholder="Task Name"
              placeholderTextColor="#9ca3af"
              value={editedName}
              onChangeText={setEditedName}
            />
            <TextInput
              className="h-12 border border-gray-600 mb-6 px-4 rounded-lg text-base text-gray-200"
              placeholder="Due Date (YYYY-MM-DD)"
              placeholderTextColor="#9ca3af"
              value={editedDueDate}
              onChangeText={setEditedDueDate}
            />
            <View className="flex-row justify-between w-full">
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-gray-700 border border-blue-400"
                onPress={() => {
                  setEditModalVisible(false);
                  setEditingTask(null);
                  setEditedName('');
                  setEditedDueDate('');
                }}
                underlayColor="#1e40af"
              >
                <Text className="text-blue-400 text-center font-semibold">Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                className="rounded-xl p-3 shadow-sm w-2/5 bg-green-400 border border-green-400"
                onPress={handleUpdateTask}
                underlayColor="#86efac"
              >
                <Text className="text-gray-900 text-center font-semibold">Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        className="absolute right-5 bottom-20 w-16 h-16 rounded-full bg-green-400 border-2 border-green-400 justify-center items-center shadow-lg"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#1e3a8a" />
      </TouchableOpacity>
    </View>
  );
};

export default TasksScreen;
