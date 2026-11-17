
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

const achievements = [
  {
    id: '1',
    emoji: '🌱',
    title: 'First Step',
    description: 'Complete your first study task.',
    unlocked: true,
  },
  {
    id: '2',
    emoji: '🔥',
    title: 'Consistency Star',
    description: 'Maintain a 3-day study streak.',
    unlocked: true,
  },
  {
    id: '3',
    emoji: '📚',
    title: 'Knowledge Seeker',
    description: 'Complete 10 study tasks.',
    unlocked: false,
  },
  {
    id: '4',
    emoji: '🏆',
    title: 'Focus Champion',
    description: 'Complete your first focus session.',
    unlocked: false,
  },
  {
    id: '5',
    emoji: '⭐',
    title: 'Rising Learner',
    description: 'Earn 500 XP points.',
    unlocked: false,
  },
];

export default function RewardsScreen() {
  const unlockedCount = achievements.filter(
    item => item.unlocked
  ).length;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Achievements 🏆</Text>
      <Text style={styles.subtitle}>
        Celebrate every little achievement!
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryEmoji}>🎖️</Text>
        <View>
          <Text style={styles.summaryNumber}>
            {unlockedCount} / {achievements.length}
          </Text>
          <Text style={styles.summaryText}>Badges Unlocked</Text>
        </View>
      </View>

      <FlatList
        data={achievements}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.badgeCard,
            !item.unlocked && styles.lockedCard,
          ]}>
            <View style={styles.badgeCircle}>
              <Text style={styles.badgeEmoji}>
                {item.unlocked ? item.emoji : '🔒'}
              </Text>
            </View>

            <View style={styles.badgeInfo}>
              <Text style={styles.badgeTitle}>{item.title}</Text>
              <Text style={styles.badgeDescription}>
                {item.description}
              </Text>
              <Text style={styles.status}>
                {item.unlocked ? 'Unlocked ✓' : 'Not unlocked yet'}
              </Text>
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
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#52785C',
    borderRadius: 20,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  summaryEmoji: {
    fontSize: 40,
    marginRight: 18,
  },
  summaryNumber: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  summaryText: {
    color: '#E4EEDD',
    marginTop: 4,
  },
  badgeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  lockedCard: {
    opacity: 0.65,
  },
  badgeCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#E8EFDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeEmoji: {
    fontSize: 27,
  },
  badgeInfo: {
    flex: 1,
    marginLeft: 15,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#365C43',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#899184',
    marginTop: 4,
  },
  status: {
    fontSize: 11,
    color: '#52785C',
    fontWeight: '600',
    marginTop: 6,
  },
});
