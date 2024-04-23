import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

const UserProfilePage = ({ navigation, route }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      const userId = route.params?.userId;
      if (!userId) {
        setError("No userId provided");
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(firestore, "UsersInfo", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          setError("User profile does not exist.");
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, [route.params?.userId]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text>User profile is not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.BackIconTO}
      >
        <Image
          style={styles.iconBack}
          source={require("../assets/icons/back-button.png")}
        />
      </TouchableOpacity>

      <Text style={styles.name}>{userProfile.Name}</Text>
      <Text style={styles.username}>{`@${userProfile.Username}`}</Text>
      <Image
        style={styles.profilePic}
        source={{ uri: userProfile.ProfilePicURL || "your-default-image-url" }}
      />
      <Text style={styles.obory}>{userProfile.Obor.join(", ")}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("CommingSoon2")}
        style={styles.dmBtn}
      >
        <Text style={styles.dmBtnTxt}>Zpráva</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1007",
  },
  BackIconTO: {
    position: "absolute",
    top: 50,
    left: "7%",
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "grey",
    position: "absolute",
    top: 95,
    right: "7%",
  },
  name: {
    color: "#fff",
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: 25,
    position: "absolute",
    top: 100,
    left: "7%",
  },
  username: {
    color: "#fff",
    fontFamily: "Avenir",
    fontSize: 18,
    position: "absolute",
    top: 138,
    left: "7%",
  },
  obory: {
    color: "#E03B3C",
    fontSize: 16,
    fontFamily: "Avenir",
    position: "absolute",
    top: 170,
    left: "7%",
  },
  dmBtn: {
    paddingTop: 45,
    paddingLeft: 100,
    paddingRight: 100,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "absolute",
    top: 230,
    left: "7%",
  },
  dmBtnTxt: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Avenir",
    position: "absolute",
    fontWeight: "bold",
  },
});

export default UserProfilePage;
