
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

import { useStudy } from '../../context/StudyContext';

export default function HomeScreen() {
  const { xp, tasks, toggleTask, addTask } = useStudy();

  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState('');

  const completedCount = tasks.filter(task => task.done).length;

  const handleAddTask = () => {
    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      Alert.alert('Empty Task', 'Please enter a task name.');
      return;
    }

    addTask(trimmedTask);
    setNewTask('');
    setModalVisible(false);
  };

  const renderTask = ({ item }) => (
    <Pressable
      style={styles.taskCard}
      onPress={() => toggleTask(item.id)}
    >
      <View
        style={[
          styles.checkCircle,
          item.done && styles.checkedCircle,
        ]}
      >
        {item.done && (
          <Text style={styles.checkMark}>✓</Text>
        )}
      </View>

      <View style={styles.taskInfo}>
        <Text
          style={[
            styles.taskTitle,
            item.done && styles.completedTask,
          ]}
        >
          {item.title}
        </Text>
        <Text style={styles.subject}>{item.subject}</Text>
      </View>

      <Text style={styles.taskXP}>
        {item.done ? 'Completed' : '+10 XP'}
      </Text>
    </Pressable>
  );

  return (
    <>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}>
              <View>
                <Text style={styles.greeting}>
                  Good morning 👋
                </Text>
                <Text style={styles.name}>
                  Ready to grow?
                </Text>
              </View>

              <View style={styles.avatar}>
                <Text style={styles.avatarText}>🌱</Text>
              </View>
            </View>

            <Text style={styles.tagline}>
              Grow Your Knowledge, One Day at a Time.
            </Text>

            <View style={styles.xpCard}>
              <View>
                <Text style={styles.xpLabel}>
                  YOUR EXPERIENCE
                </Text>
                <Text style={styles.xpNumber}>
                  {xp} XP
                </Text>
                <Text style={styles.level}>
                  Level 2 · Growing Learner
                </Text>
              </View>

              <Text style={styles.trophy}>🏆</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>🔥</Text>
                <Text style={styles.statNumber}>3 Days</Text>
                <Text style={styles.statLabel}>Streak</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>⭐</Text>
                <Text style={styles.statNumber}>
                  {completedCount}/{tasks.length}
                </Text>
                <Text style={styles.statLabel}>Missions</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              Today's Missions 🎯
            </Text>

            <Text style={styles.sectionSubtitle}>
              Complete your tasks and earn XP!
            </Text>

            <Pressable
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addButtonText}>
                + Add New Task
              </Text>
            </Pressable>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Every small step helps you grow! 🌿
            </Text>
          </View>
        }
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Create a New Task 🌱
            </Text>

            <Text style={styles.modalSubtitle}>
              What would you like to learn today?
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your study task..."
              placeholderTextColor="#9AA397"
              value={newTask}
              onChangeText={setNewTask}
              maxLength={60}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setNewTask('');
                }}
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={styles.saveButton}
                onPress={handleAddTask}
              >
                <Text style={styles.saveText}>
                  Add Task
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F5E9',
    padding: 22,
    paddingTop: 55,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#788477',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#365C43',
    marginTop: 5,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#DDEBD9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  tagline: {
    color: '#849080',
    fontSize: 13,
    marginTop: 12,
    marginBottom: 22,
  },
  xpCard: {
    backgroundColor: '#52785C',
    borderRadius: 20,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpLabel: {
    color: '#E4EEDD',
    fontSize: 11,
    letterSpacing: 1,
  },
  xpNumber: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  level: {
    color: '#E4EEDD',
    fontSize: 12,
    marginTop: 5,
  },
  trophy: {
    fontSize: 42,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 16,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 25,
  },
  statNumber: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#365C43',
    marginTop: 7,
  },
  statLabel: {
    fontSize: 12,
    color: '#899184',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#365C43',
    marginTop: 28,
  },
  sectionSubtitle: {
    color: '#899184',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 13,
  },
  addButton: {
    backgroundColor: '#E4EEDD',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#A8BDA6',
  },
  addButtonText: {
    color: '#365C43',
    fontWeight: 'bold',
    fontSize: 15,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#A8BDA6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCircle: {
    backgroundColor: '#52785C',
    borderColor: '#52785C',
  },
  checkMark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskInfo: {
    flex: 1,
    marginLeft: 12,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#405744',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#9AA397',
  },
  subject: {
    fontSize: 12,
    color: '#9AA397',
    marginTop: 4,
  },
  taskXP: {
    color: '#D49B3D',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#899184',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 24,
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#365C43',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#899184',
    marginTop: 8,
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#F6F5E9',
    borderWidth: 1,
    borderColor: '#DDE5D7',
    borderRadius: 12,
    padding: 14,
    color: '#365C43',
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 22,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 17,
    borderRadius: 10,
    backgroundColor: '#F0F0E9',
  },
  cancelText: {
    color: '#647263',
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#52785C',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

