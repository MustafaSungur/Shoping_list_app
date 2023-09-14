import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./TodoStyles";

const Todo = ({ content, onLongPress, onPress }) => {
  const press = () => {
    onPress();
  };

  return (
    <TouchableOpacity onPress={press} onLongPress={onLongPress}>
      <Text style={(content.status && styles.todo) || styles.completed}>
        {content.todo}
      </Text>
    </TouchableOpacity>
  );
};

export default Todo;
