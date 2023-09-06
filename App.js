import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import TodoList from "./src/components/todosList/TodoList";
import { useState } from "react";
import Input from "./src/components/input/Input";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleText = (text) => {
    setTodo(text);
  };
  const addTodo = () => {
    if (todo !== "") {
      const newTodo = {
        id: Math.random() * 1000,
        todo: todo,
        status: true,
      };
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const handleTodoLongPress = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  const deleteAll = () => {
    setTodos([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alışveriş Listesi</Text>
        <TouchableOpacity onPress={deleteAll}>
          <Text style={styles.deleteButton}>Hepsini Sil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TodoList todos={todos} onLongPress={handleTodoLongPress} />
        <Input handleText={handleText} addTodo={addTodo} item={todo} />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#35155D",
    paddingTop: Platform.OS == "android" ? 50 : 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F2E8C6",
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    color: "#eee",
    backgroundColor: "#533483",
    margin: 5,
    padding: 8,
    fontSize: 12,
    borderRadius: 8,
    fontWeight: "bold",
  },
  deleteText: {},
});
