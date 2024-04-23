import { signOut } from "firebase/auth";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { auth, firestore } from "../config/firebase";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useState } from "react";

const UsernamePage = ({ navigation }) => {
  const [name, setName] = useState("");

  const checkUsernameExists = async (username) => {
    const usersRef = collection(firestore, "UsersInfo");
    const q = query(usersRef, where("Username", "==", username.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // returns true if username exists
  };

  const saveNameToFirestore = async () => {
    const trimmedName = name.trim().toLowerCase();
    if (!trimmedName) {
      Alert.alert("Chyba", "Musíš zadat uživatelské jméno.");
      return;
    }

    const usernameExists = await checkUsernameExists(trimmedName);
    if (usernameExists) {
      Alert.alert("Chyba", "Uživatelské jméno už někdo používá.");
      return;
    }

    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);

    try {
      await setDoc(userRef, { Username: trimmedName }, { merge: true });
      Alert.alert("Úspěch", "Tvé uživatelské jméno bylo uloženo.");
      navigation.navigate("SetupedPage");
    } catch (error) {
      Alert.alert(
        "Chyba",
        "Nepodařilo se uložit tvé uživatelské jméno. Zkus to prosím znovu."
      );
      console.error("Error writing document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nadpis}>Zvol si uživatelské jméno</Text>

      <Text style={styles.podnadpis}>
        pozor, ostatní tě tak uvidí, vyhni se vulgárním jménům
      </Text>

      <View style={styles.nameField}>
        <View style={styles.loginContainerWhite}>
          <TextInput
            style={styles.nameInput}
            placeholder="Uživatelské jméno"
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="none"
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
    fontSize: 27,
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
    left: 38,
    width: 200,
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

export default UsernamePage;
