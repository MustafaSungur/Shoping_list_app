import Todo from "../todo/Todo";
import { ScrollView, TouchableHighlight, View } from "react-native";
import styles from "./TodoListStyles";
const TodoList = ({ todos, onLongPress }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {todos.map((item) => (
        <Todo
          content={item}
          key={item.id}
          onLongPress={() => onLongPress(item.id)}
        />
      ))}
    </ScrollView>
  );
};

export default TodoList;
