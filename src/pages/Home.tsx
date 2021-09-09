import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Task } from '../components/TaskItem';
import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.some(task => task.title === newTaskTitle);

    if (taskExist) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }
    
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const attTasks = tasks.map(task => task.id === taskId
      ? { ...task, title: taskNewTitle }
      : task
    );

    setTasks(attTasks);
  }

  function handleToggleTaskDone(id: number) {
    const attTasks = tasks.map(task => task.id === id 
      ? { ...task, done: !task.done }
      : task
    );

    setTasks(attTasks);
  }

  function removeTask(id: number) {
    const attTasks = tasks.filter(task => task.id !== id);
  
    setTasks(attTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => removeTask(id)},
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})