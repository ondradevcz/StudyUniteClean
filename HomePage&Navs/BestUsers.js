import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";

const BestUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(firestore, "UsersInfo");
      const querySnapshot = await getDocs(usersRef);
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Sort users by Money in descending order
      const sortedUsers = fetchedUsers.sort((a, b) => b.Money - a.Money);
      setUsers(sortedUsers);
    };

    fetchUsers(); // Fetch users on component mount
  }, []); // Dependency array is empty, runs only once on mount

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
      <ScrollView style={styles.scrollview}>
        <View style={styles.outBox}>
          {users.map((user, index) => (
            <TouchableOpacity
              key={user.id}
              onPress={() =>
                navigation.navigate("UserProfilePage", { userId: user.id })
              }
              style={styles.userCardTouchable}
            >
              <View style={styles.userCard}>
                <Text style={styles.rank}>#{index + 1}</Text>
                {/* Display rank */}
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: user.profilePic || "default-profile-pic-url",
                  }}
                />
                <Text style={styles.subject}>{user.Obor.join(", ")}</Text>
                <Text
                  style={styles.username}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {user.Username}{" "}
                </Text>
                <Text style={styles.money}>${user.Money}</Text>
                {/* Show money */}
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
    backgroundColor: "#1F1007",
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
    left: 55,
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
  money: {
    fontSize: 21,
    fontFamily: "Avenir",
    fontWeight: "bold",
    color: "#FFCC4D",
    position: "absolute",
    right: 15,
  },
  rank: {
    fontSize: 24,
    fontFamily: "Avenir",
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    left: 15,
  },
  subject: {
    fontSize: 15,
    color: "#E03B3C",
    fontFamily: "Avenir",
    position: "absolute",
    left: 110,
    top: 36,
  },
  username: {
    fontSize: 18,
    color: "white",
    fontFamily: "Avenir",
    position: "absolute",
    left: 110,
    top: 13,
    fontWeight: "bold",
    width: 180,
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

export default BestUsers;
