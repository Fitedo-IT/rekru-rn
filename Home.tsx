import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksFromServer = getCurrentTasks();
    tasks = tasksFromServer;
  });

  function handleAddTask(newTaskTitle: string) {
    const hasTaskWithThisName = tasks.findIndex((task) => task.title == newTaskTitle);

    if (hasTaskWithThisName) {
      Alert.alert('Nazwa zajęta');
    } else {
      tasks.push({
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      });
    }
  }

  function handleToggleTaskDone(id: number) {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
  }

  function handleRemoveTask(id: number) {
    tasks.filter((task) => task.id === id);
  }

  function handleUpdateTaskName(id: number, newTaskName: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          newTaskName,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        updateTaskName={handleUpdateTaskName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
