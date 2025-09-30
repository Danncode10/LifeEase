import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const HealthScreen = () => {
  const dummyData = [
    { id: '1', title: 'Placeholder Workout 1' },
    { id: '2', title: 'Placeholder Workout 2' },
    { id: '3', title: 'Placeholder Workout 3' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health</Text>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HealthScreen;
