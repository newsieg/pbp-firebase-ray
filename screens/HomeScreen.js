// FirebaseMahasiswa\screens\HomeScreen.js

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function HomeScreen() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [data, setData] = useState([]);

  const addMahasiswa = async () => {
    await addDoc(collection(db, "mahasiswa"), {
      nama,
      nim,
      prodi,
    });

    fetchData();
  };

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "mahasiswa"));
    const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Mahasiswa</Text>

      <TextInput style={styles.input} placeholder="Nama" value={nama} onChangeText={setNama} />
      <TextInput style={styles.input} placeholder="NIM" value={nim} onChangeText={setNim} />
      <TextInput style={styles.input} placeholder="Program Studi" value={prodi} onChangeText={setProdi} />

      <Button title="Tambah" onPress={addMahasiswa} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nama: {item.nama}</Text>
            <Text>NIM: {item.nim}</Text>
            <Text>Program Studi: {item.prodi}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 12,
  },
  item: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  title: { textAlign: "center", fontSize: 24, marginBottom: 20 },
});
