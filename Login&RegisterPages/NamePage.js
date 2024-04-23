import { signOut } from "firebase/auth";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";

const NamePage = ({ navigation }) => {
  const [name, setName] = useState("");

  const saveNameToFirestore = async () => {
    if (!name.trim()) {
      Alert.alert("Chyba", "Musíš zadat jméno.");
      return;
    }

    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);

    try {
      await setDoc(userRef, { Name: name }, { merge: true });
      Alert.alert("Úspěch", "Tvé jméno bylo uloženo.");
      navigation.navigate("UsernamePage");
    } catch (error) {
      Alert.alert(
        "Chyba",
        "Nepodařilo se uložit tvé jméno. Zkus to prosím znovu."
      );
      console.error("Error writing document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nadpis}>Jak se jmenuješ?</Text>

      <Text style={styles.podnadpis}>ostatní uvidí tvoje jméno</Text>

      <View style={styles.nameField}>
        <View style={styles.loginContainerWhite}>
          <TextInput
            style={styles.nameInput}
            placeholder="Zadejte své jméno"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={saveNameToFirestore}
      >
        <View style={styles.containerComponent}>
          <Text style={styles.btnTxt}>Pokračovat</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1007",
    justifyContent: "center",
    alignItems: "center",
  },
  nadpis: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    top: 90,
  },
  podnadpis: {
    color: "#93E546",
    fontSize: 15,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    top: 123,
    left: 77,
  },
  nameField: {
    backgroundColor: "#4B910A",
    height: 55,
    width: 330,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    position: "absolute",
    top: 190,
  },
  loginContainerWhite: {
    backgroundColor: "#B0B5AB",
    opacity: 0.75,
    height: "80 %",
    width: "96.5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  nameInput: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    left: 25,
    height: "100%",
    width: 220,
  },
  confirmButton: {
    height: 55,
    width: 330,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#4B910A",
    position: "absolute",
    top: 265,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  containerComponent: {
    backgroundColor: "#1F1007",
    height: "80 %",
    width: "97%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
});

export default NamePage;
