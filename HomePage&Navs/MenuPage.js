import { signOut } from "firebase/auth";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { auth, firestore } from "../config/firebase";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const MenuPage = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const [currentUserEmail, setCurrentUserEmail] = useState(""); // State to hold the logged-in user's email

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail("");
      }
    });

    return unsubscribe;
  }, []);

  const deleteUserAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        // Reference to the user's document in the 'users' collection
        const userDocRef = doc(firestore, "UsersInfo", user.uid);

        // Delete the user's document
        await deleteDoc(userDocRef);

        // After deleting the user's document, delete the user's account
        await user.delete();
        console.log("User account and all related data deleted successfully");

        // Handle post-deletion logic, such as navigation or state updates
        // ... (e.g., navigate to a "goodbye" or login screen)
      } catch (error) {
        console.error(
          "Error deleting user account and/or related data:",
          error
        );
      }
    } else {
      console.log("No user is currently signed in");
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Smazat účet",
      "Opravdu chcete smazat svůj účet? Tuto akci nelze vrátit",
      [
        { text: "Zrušit", style: "cancel" },
        { text: "Smazat", onPress: deleteUserAccount, style: "destructive" },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomePage")}
        style={styles.BackIconTO}
      >
        <Image
          style={styles.iconBack}
          source={require("../assets/icons/back-button.png")}
        />
      </TouchableOpacity>

      <Text style={styles.userEmail}>{currentUserEmail}</Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonTO}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutTxt}>Odhlásit se z účtu</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={styles.deleteAccountButtonTO}
        >
          <View style={styles.deleteAccountButton}>
            <Text style={styles.deleteAccountTxt}>Smazat účet</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#170C05",
    justifyContent: "center",
    alignItems: "center",
  },
  BackIconTO: {
    position: "absolute",
    top: 50,
    left: 25,
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  logoutButtonTO: {
    height: 55,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  logoutButton: {
    backgroundColor: "#8A9084",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  logoutTxt: {
    color: "#fff",
    fontSize: 19,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  userEmail: {
    color: "#fff",
    fontSize: 21,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    top: 50,
    paddingLeft: 30,
  },
  actionContainer: {
    width: 300,
    height: 115,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 60,
  },
  deleteAccountButtonTO: {
    height: 55,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
  },
  deleteAccountButton: {
    backgroundColor: "#B83637",
    height: 50,
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    position: "absolute",
    top: 0,
    left: 0,
  },
  deleteAccountTxt: {
    color: "#fff",
    fontSize: 19,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
});

export default MenuPage;
