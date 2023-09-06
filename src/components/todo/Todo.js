import React, { useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import styles from "./TodoStyles";
const Todo = ({ content, onLongPress }) => {
  const [status, setStatus] = useState(content.status);

  const press = () => {
    setStatus(!status);
  };

  return (
    <TouchableOpacity onPress={() => press()} onLongPress={onLongPress}>
      <Text style={(status && styles.todo) || styles.completed}>
        {content.todo}
      </Text>
    </TouchableOpacity>
  );
};

export default Todo;
