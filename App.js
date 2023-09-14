import React, { useState, useEffect } from "react";
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
import Input from "./src/components/input/Input";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Uygulama başlatıldığında AsyncStorage'den verileri alın
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      if (data !== null) {
        // AsyncStorage'den alınan JSON verisini diziye dönüştürün
        setTodos(JSON.parse(data));
      }
    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  };

  const saveData = async (newTodos) => {
    try {
      // Todos'u AsyncStorage'e kaydet, JSON.stringify kullanarak string'e dönüştürün
      await AsyncStorage.setItem("data", JSON.stringify(newTodos));
    } catch (error) {
      console.error("Veri kaydedilemedi:", error);
    }
  };

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
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      saveData(newTodos); // Yeni todos'u kaydet
      setTodo("");
    }
  };

  const handleTodoLongPress = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
    saveData(newTodos); // Değiştirilmiş todos'u kaydet
  };

  const toggleTodoStatus = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, status: !todo.status };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
    saveData(newTodos); // Durumu değiştirilmiş todos'u kaydet
  };

  const deleteAll = () => {
    setTodos([]);
    AsyncStorage.clear(); // AsyncStorage'yi temizle
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
        <TodoList
          todos={todos}
          onLongPress={handleTodoLongPress}
          onPress={toggleTodoStatus}
        />
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
