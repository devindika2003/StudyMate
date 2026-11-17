
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const StudyContext = createContext();

const initialTasks = [
  {
    id: '1',
    title: 'Review Chemistry notes',
    subject: 'Chemistry',
    done: false,
  },
  {
    id: '2',
    title: 'Practice JavaScript',
    subject: 'Computer Science',
    done: false,
  },
  {
    id: '3',
    title: 'Complete Mathematics exercises',
    subject: 'Mathematics',
    done: false,
  },
];

export function StudyProvider({ children }) {
  const [xp, setXp] = useState(120);
  const [tasks, setTasks] = useState(initialTasks);

  const [reminders, setReminders] = useState([]);
  const [remindersLoaded, setRemindersLoaded] = useState(false);

  // Load saved reminders
  useEffect(() => {
    const loadReminders = async () => {
      try {
        const savedReminders =
          await AsyncStorage.getItem('studyReminders');

        if (savedReminders !== null) {
          setReminders(JSON.parse(savedReminders));
        }
      } catch (error) {
        console.log('Error loading reminders:', error);
      } finally {
        setRemindersLoaded(true);
      }
    };

    loadReminders();
  }, []);

  // Save reminders whenever they change
  useEffect(() => {
    if (remindersLoaded) {
      AsyncStorage.setItem(
        'studyReminders',
        JSON.stringify(reminders)
      ).catch((error) => {
        console.log('Error saving reminders:', error);
      });
    }
  }, [reminders, remindersLoaded]);

  const toggleTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = {
            ...task,
            done: !task.done,
          };

          setXp((currentXP) =>
            updatedTask.done
              ? currentXP + 10
              : currentXP - 10
          );

          return updatedTask;
        }

        return task;
      })
    );
  };

  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      subject: 'Personal',
      done: false,
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  };

  const addXP = (amount) => {
    setXp((currentXP) => currentXP + amount);
  };

  // Add exam or assignment reminder
  const addReminder = (title, type, dueDate) => {
    const newReminder = {
      id: Date.now().toString(),
      title,
      type,
      dueDate,
    };

    setReminders((previousReminders) => [
      ...previousReminders,
      newReminder,
    ]);
  };

  // Delete a reminder
  const removeReminder = (reminderId) => {
    setReminders((previousReminders) =>
      previousReminders.filter(
        (reminder) => reminder.id !== reminderId
      )
    );
  };

  return (
    <StudyContext.Provider
      value={{
        xp,
        tasks,
        toggleTask,
        addTask,
        addXP,
        reminders,
        addReminder,
        removeReminder,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  return useContext(StudyContext);
}
