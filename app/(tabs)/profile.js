
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';

import * as Notifications from 'expo-notifications';
import { useStudy } from '../../context/StudyContext';

export default function ProfileScreen() {
  const { xp, tasks } = useStudy();

  const completedCount = tasks.filter(task => task.done).length;

  const scheduleReminder = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Use Android to test',
        'Please test local notifications using Expo Go on your Android phone.'
      );
      return;
    }

    try {
      const permission =
        await Notifications.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission required',
          'Please allow notifications to receive study reminders.'
        );
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'StudyMate Reminder 🌱',
          body: 'Time to continue your learning journey!',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });

      Alert.alert(
        'Reminder Scheduled!',
        'Your study reminder will arrive in 5 seconds.'
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to schedule the reminder.'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Profile 👤</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>🌱</Text>
        </View>

        <Text style={styles.name}>StudyMate Learner</Text>
        <Text style={styles.level}>
          Level 2 · Growing Learner
        </Text>
        <Text style={styles.member}>
          Keep learning and growing!
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        My Learning Statistics
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>⭐</Text>
          <Text style={styles.statNumber}>{xp}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>✅</Text>
          <Text style={styles.statNumber}>
            {completedCount}
          </Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Badges</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        About StudyMate
      </Text>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutText}>
          StudyMate helps students organize their learning,
          build consistent study habits, and achieve their
          academic goals through fun daily challenges.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Study Reminders 🔔
      </Text>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutText}>
          Set a reminder to stay consistent with your
          daily learning activities.
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={scheduleReminder}
      >
        <Text style={styles.buttonText}>
          Set Study Reminder 🔔
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5E9',
    padding: 22,
    paddingTop: 65,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#365C43',
    marginBottom: 22,
  },
  profileCard: {
    backgroundColor: '#52785C',
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: '#E4EEDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 15,
  },
  level: {
    color: '#E4EEDD',
    marginTop: 7,
  },
  member: {
    color: '#E4EEDD',
    fontSize: 12,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#365C43',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 13,
    marginBottom: 13,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 18,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 25,
  },
  statNumber: {
    color: '#365C43',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 7,
  },
  statLabel: {
    color: '#899184',
    fontSize: 12,
    marginTop: 4,
  },
  aboutCard: {
    backgroundColor: '#E4EEDD',
    padding: 18,
    borderRadius: 17,
  },
  aboutText: {
    color: '#526B55',
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#52785C',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

