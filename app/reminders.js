import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { useStudy } from '../context/StudyContext';

// Configure notifications only if not on web
if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseDateInput = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const [year, month, day] = value.split('-').map(Number);
  const parsedDate = new Date(year, month - 1, day);
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }
  return parsedDate;
};

export default function RemindersScreen() {
  const {
    reminders,
    addReminder,
    removeReminder,
  } = useStudy();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Exam');
  const [date, setDate] = useState(new Date());
  const [webDateText, setWebDateText] = useState(
    formatDateForInput(new Date())
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Request notification permissions on mount (Mobile only)
  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS !== 'web') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Notification permissions not granted!');
        }
      }
    }
    requestPermissions();
  }, []);

  const handleWebDateChange = (value) => {
    setWebDateText(value);
    const selectedDate = parseDateInput(value);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter a reminder name.'
      );
      return;
    }

    let selectedDate = date;

    if (Platform.OS === 'web') {
      selectedDate = parseDateInput(webDateText);
      if (!selectedDate) {
        Alert.alert(
          'Invalid Date',
          'Please enter a valid date in YYYY-MM-DD format.'
        );
        return;
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDay = new Date(selectedDate);
    selectedDay.setHours(0, 0, 0, 0);

    if (selectedDay < today) {
      Alert.alert(
        'Invalid Date',
        'Please select today or a future date.'
      );
      return;
    }

    // Add reminder to state/storage
    addReminder(
      title.trim(),
      type,
      selectedDate.toISOString()
    );

    // Platform-specific notification handling
    if (Platform.OS === 'web') {
      // For Web preview: Show a browser alert/notification simulation
      setTimeout(() => {
        window.alert(`🔔 Notification Reminder!\nNew ${type}: "${title.trim()}" has been set.`);
      }, 500);
    } else {
      // For Mobile App (Android/iOS): Use expo-notifications
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `New ${type} Reminder! 📚`,
            body: `Don't forget: "${title.trim()}" is coming up.`,
            sound: true,
          },
          trigger: { seconds: 2 },
        });
      } catch (error) {
        console.log('Error scheduling notification:', error);
      }
    }

    setTitle('');
    setDate(new Date());
    setWebDateText(formatDateForInput(new Date()));

    Alert.alert(
      'Success 🌱',
      'Your reminder has been saved and notification scheduled!'
    );
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeReminder(id),
        },
      ]
    );
  };

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString();
  };

  const renderReminder = ({ item }) => {
    const daysLeft = Math.ceil(
      (
        new Date(item.dueDate).setHours(0, 0, 0, 0) -
        new Date().setHours(0, 0, 0, 0)
      ) / (1000 * 60 * 60 * 24)
    );

    return (
      <View style={styles.reminderCard}>
        <View style={styles.reminderIcon}>
          <Text style={styles.iconText}>
            {item.type === 'Exam' ? '📝' : '📚'}
          </Text>
        </View>

        <View style={styles.reminderInfo}>
          <Text style={styles.reminderType}>
            {item.type}
          </Text>
          <Text style={styles.reminderTitle}>
            {item.title}
          </Text>
          <Text style={styles.reminderDate}>
            📅 {formatDate(item.dueDate)}
          </Text>
          <Text style={styles.daysLeft}>
            {daysLeft === 0
              ? 'Due today!'
              : daysLeft === 1
              ? '1 day remaining'
              : daysLeft < 0
              ? 'Past deadline'
              : `${daysLeft} days remaining`}
          </Text>
        </View>

        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteText}>✕</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.container}
      data={reminders}
      keyExtractor={(item) => item.id}
      renderItem={renderReminder}
      ListHeaderComponent={
        <View>
          <Text style={styles.heading}>
            My Reminders 🔔
          </Text>
          <Text style={styles.subtitle}>
            Never miss an important day!
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              Create a Reminder 🌱
            </Text>

            <Text style={styles.label}>
              Reminder Type
            </Text>

            <View style={styles.typeRow}>
              {['Exam', 'Assignment'].map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.typeButton,
                    type === item && styles.selectedType,
                  ]}
                  onPress={() => setType(item)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      type === item && styles.selectedTypeText,
                    ]}
                  >
                    {item === 'Exam' ? '📝 ' : '📚 '}
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>
              Reminder Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder={
                type === 'Exam'
                  ? 'e.g. Chemistry Mid Exam'
                  : 'e.g. Mobile App Assignment'
              }
              placeholderTextColor="#9AA397"
              value={title}
              onChangeText={setTitle}
              maxLength={70}
            />

            <Text style={styles.label}>
              Due Date
            </Text>

            {Platform.OS === 'web' ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={webDateText}
                  onChangeText={handleWebDateChange}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9AA397"
                  keyboardType="numbers-and-punctuation"
                />
                <Text style={styles.dateHint}>
                  Enter date as YYYY-MM-DD
                </Text>
              </View>
            ) : (
              <View>
                <Pressable
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateText}>
                    📅 {date.toLocaleDateString()}
                  </Text>
                  <Text style={styles.changeText}>
                    Change
                  </Text>
                </Pressable>

                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={
                      Platform.OS === 'ios'
                        ? 'spinner'
                        : 'default'
                    }
                    minimumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      if (Platform.OS !== 'ios') {
                        setShowDatePicker(false);
                      }
                      if (selectedDate) {
                        setDate(selectedDate);
                      }
                    }}
                  />
                )}

                {Platform.OS === 'ios' && showDatePicker && (
                  <Pressable
                    style={styles.doneButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.doneText}>
                      Done
                    </Text>
                  </Pressable>
                )}
              </View>
            )}

            <Pressable
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>
                + Save Reminder
              </Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>
            Upcoming Reminders 📌
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>🌱</Text>
          <Text style={styles.emptyTitle}>
            No reminders yet!
          </Text>
          <Text style={styles.emptyText}>
            Add your first exam or assignment reminder.
          </Text>
        </View>
      }
      ListFooterComponent={
        <View style={{ height: 30 }} />
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6F5E9',
  },
  container: {
    padding: 22,
    paddingTop: 55,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#365C43',
  },
  subtitle: {
    fontSize: 14,
    color: '#899184',
    marginTop: 7,
    marginBottom: 22,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 22,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#365C43',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#647263',
    marginBottom: 9,
    marginTop: 13,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 13,
    borderRadius: 12,
    backgroundColor: '#F2F3EC',
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#52785C',
  },
  typeText: {
    color: '#647263',
    fontWeight: '600',
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#F6F5E9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE5D7',
    padding: 14,
    fontSize: 14,
    color: '#365C43',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F6F5E9',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE5D7',
  },
  dateText: {
    color: '#365C43',
    fontWeight: '600',
  },
  changeText: {
    color: '#52785C',
    fontWeight: 'bold',
  },
  dateHint: {
    color: '#899184',
    fontSize: 12,
    marginTop: 7,
  },
  doneButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  doneText: {
    color: '#52785C',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#52785C',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 22,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#365C43',
    marginTop: 28,
    marginBottom: 15,
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 17,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#E4EEDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 23,
  },
  reminderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  reminderType: {
    color: '#899184',
    fontSize: 11,
    fontWeight: 'bold',
  },
  reminderTitle: {
    color: '#365C43',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 3,
  },
  reminderDate: {
    color: '#899184',
    fontSize: 12,
    marginTop: 5,
  },
  daysLeft: {
    color: '#D49B3D',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  deleteButton: {
    padding: 9,
  },
  deleteText: {
    color: '#C56C60',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 18,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 38,
  },
  emptyTitle: {
    color: '#365C43',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emptyText: {
    color: '#899184',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
});