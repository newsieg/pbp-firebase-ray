// FirebaseMahasiswa\screens\LoginScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
  if (!email || !password) {
    alert("Email dan Password wajib diisi!");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));

    navigation.replace("Home");
  } catch (err) {
    alert("Login gagal: " + err.message);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login ke StudentsDatabase</Text>

      <TextInput placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail} />

      <TextInput placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword} />

      <Button title="Login" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent:"center", padding: 20 },
  input: {
    borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 20,
  },
  title: { textAlign: "center", fontSize: 26, marginBottom: 20 },
});
