
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

const subjects = [
  { id: '1', name: 'Chemistry', emoji: '🧪', progress: '65%', color: '#E4EFE0' },
  { id: '2', name: 'Computer Science', emoji: '💻', progress: '45%', color: '#E8EAF5' },
  { id: '3', name: 'Mathematics', emoji: '📐', progress: '30%', color: '#F8EBD8' },
];

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Learning Space 📚</Text>
      <Text style={styles.subtitle}>
        Every subject is a new opportunity to grow.
      </Text>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color }]}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.subjectName}>{item.name}</Text>
              <Text style={styles.progress}>
                Learning progress: {item.progress}
              </Text>
              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    { width: item.progress },
                  ]}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
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
  },
  subtitle: {
    color: '#899184',
    marginTop: 8,
    marginBottom: 25,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 35,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  subjectName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#365C43',
  },
  progress: {
    fontSize: 12,
    color: '#788477',
    marginTop: 8,
  },
  progressBackground: {
    height: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginTop: 8,
  },
  progressFill: {
    height: 7,
    backgroundColor: '#52785C',
    borderRadius: 5,
  },
});
