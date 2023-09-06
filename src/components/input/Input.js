import React from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import styles from "./InputStyles";
const Input = ({ handleText, addTodo, item }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Alınacak..."
        style={styles.input}
        placeholderTextColor="#fff"
        onChangeText={handleText}
        value={item}
      />
      <TouchableOpacity onPress={addTodo} style={styles.buttonContainer}>
        <Text style={styles.text}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Input;
