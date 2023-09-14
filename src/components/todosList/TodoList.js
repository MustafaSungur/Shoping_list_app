import React from "react";
import { ScrollView } from "react-native";
import Todo from "../todo/Todo";
import styles from "./TodoListStyles";

const TodoList = ({ todos, onLongPress, onPress }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {todos.map((item) => (
        <Todo
          content={item}
          key={item.id}
          onLongPress={() => onLongPress(item.id)}
          onPress={() => onPress(item.id)}
        />
      ))}
    </ScrollView>
  );
};

export default TodoList;
