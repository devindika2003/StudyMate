
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { useStudy } from '../../context/StudyContext';

export default function FocusScreen() {
  const { addXP } = useStudy();

  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds(previous => {
        if (previous <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          setCompleted(true);
          addXP(25);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(25 * 60);
    setCompleted(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Focus Time ⏱️</Text>

      <Text style={styles.subtitle}>
        Small steps lead to big achievements.
      </Text>

      <View style={styles.timerCard}>
        <Text style={styles.plant}>🌱</Text>

        <Text style={styles.timer}>
          {String(minutes).padStart(2, '0')}:
          {String(remainingSeconds).padStart(2, '0')}
        </Text>

        <Text style={styles.timerLabel}>
          {completed ? 'Session completed!' : '25-minute focus session'}
        </Text>

        {completed && (
          <Text style={styles.reward}>
            Great work! +25 XP ⭐
          </Text>
        )}

        <Pressable
          style={styles.startButton}
          onPress={() => setIsRunning(!isRunning)}
          disabled={completed}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : 'Start Focus'}
          </Text>
        </Pressable>

        <Pressable style={styles.resetButton} onPress={resetTimer}>
          <Text style={styles.resetText}>Reset Timer</Text>
        </Pressable>
      </View>

      <Text style={styles.tip}>
        💡 Tip: Keep distractions away and focus on one task at a time.
      </Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#365C43',
  },
  subtitle: {
    color: '#899184',
    marginTop: 8,
  },
  timerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    marginTop: 35,
  },
  plant: {
    fontSize: 55,
  },
  timer: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#52785C',
    marginTop: 15,
  },
  timerLabel: {
    color: '#899184',
    marginTop: 8,
  },
  reward: {
    color: '#D49B3D',
    fontWeight: 'bold',
    marginTop: 12,
  },
  startButton: {
    backgroundColor: '#52785C',
    padding: 16,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButton: {
    padding: 14,
    marginTop: 5,
  },
  resetText: {
    color: '#788477',
    fontWeight: '600',
  },
  tip: {
    color: '#788477',
    textAlign: 'center',
    marginTop: 25,
    lineHeight: 22,
  },
});
