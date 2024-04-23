// PeoplePage.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";

const PeoplePage = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const route = useRoute();
  const selectedSubject = route.params?.selectedSubject;

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(firestore, "UsersInfo");
      const q = selectedSubject
        ? query(usersRef, where("Obor", "array-contains", selectedSubject))
        : usersRef;
      const querySnapshot = await getDocs(q);
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(fetchedUsers);
    };

    if (selectedSubject) {
      fetchUsers();
    }
  }, [selectedSubject]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("PeopleSelectionPage")}
        style={styles.BackIconTO}
      >
        <Image
          style={styles.iconBack}
          source={require("../assets/icons/back-button.png")}
        />
      </TouchableOpacity>
      <ScrollView style={styles.scrollview}>
        <View style={styles.outBox}>
          {users.map((user) => (
            <TouchableOpacity
              key={user.id}
              onPress={() =>
                navigation.navigate("UserProfilePage", { userId: user.id })
              }
              style={styles.userCardTouchable}
            >
              <View style={styles.userCard}>
                <Image
                  style={styles.profilePic}
                  source={{ uri: user.profilePic || "default-profile-pic-url" }}
                />
                <Text style={styles.name}>{user.Name.replace(" ", "\n")}</Text>
                <Text style={styles.subject}>{user.Obor.join(", ")}</Text>
                <Text style={styles.username}>{user.Username}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1007",
  },
  scrollview: {
    backgroundColor: "#1F1007",
    marginTop: 80,
  },
  outBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "1F1007",
    justifyContent: "center",
    alignItems: "center",
  },
  userCard: {
    width: 380,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    backgroundColor: "#130A04",
  },
  userCardTouchable: {
    marginBottom: 10, // Add spacing between touchable elements
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "grey",
    position: "absolute",
    left: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Avenir",
    color: "grey",
    position: "absolute",
    right: 20,
    top: 17,
    textAlign: "right",
  },
  subject: {
    fontSize: 15,
    color: "#E03B3C",
    fontFamily: "Avenir",
    position: "absolute",
    left: 62,
    top: 38,
  },
  username: {
    fontSize: 18,
    color: "white",
    fontFamily: "Avenir",
    position: "absolute",
    left: 62,
    top: 15,
    fontWeight: "bold",
  },
  BackIconTO: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 45,
    left: 15,
  },
  iconBack: {
    height: 25,
    width: 25,
  },
});

export default PeoplePage;
