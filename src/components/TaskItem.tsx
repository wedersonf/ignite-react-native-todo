import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItem {
  item: Task;
  index: number;
  onToggleTaskDone: (id: number) => void;
  onRemoveTask: (id: number) => void;
  onEditTask: (id: number, title: string) => void;
}

export function TaskItem({ item, index, onToggleTaskDone, onRemoveTask, onEditTask}: TaskItem) {
  const textInputRef = useRef<TextInput>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(item.title);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTask(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    onEditTask(item.id, task);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => onToggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            value={task}
            onChangeText={setTask}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity
            style={{ paddingLeft: 24, paddingRight: 12 }}
            onPress={handleCancelEditing}
          >
            <Icon 
              name="x"
              size={24}
              color="#B2B2B2"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingLeft: 24, paddingRight: 12 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.diver} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingLeft: 12, paddingRight: 24 }}
          onPress={() => onRemoveTask(item.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  diver: { 
    width: 1, 
    height: 24, 
    backgroundColor: 'rgba(196, 196, 196, 0.24)' 
  }
})