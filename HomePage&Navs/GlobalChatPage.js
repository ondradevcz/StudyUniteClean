import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { auth, firestore } from "../config/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

const GlobalChatPage = ({ navigation }) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(firestore, "messages");
  const usersInfoRef = collection(firestore, "UsersInfo");

  useEffect(() => {
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesFromFirestore = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesFromFirestore);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = () => {
    const inappropriateWords = [
      "negr",
      "kokot",
      "Kokot",
      "Negr",
      "N word",
      "n word",
      "n Word",
      "Hajzl",
      "hajzl",
      "černá huba",
      "Černá huba",
      "cigán",
      "cikán",
      "píča",
      "Píča",
      "Piča",
      "piča",
      "čurák",
      "čůrák",
      "penis",
      "Čůrák",
      "Čurak",
      "curak",
      "Curak",
      "péro",
      "Péro",
      "sex",
      "Sex",
    ];
    const isMessageInappropriate = inappropriateWords.some((word) =>
      messageText.toLowerCase().includes(word)
    );

    if (isMessageInappropriate) {
      Alert.alert(
        "Nevhodná zpráva",
        "Tvoje zpráva obsahuje nevhodná slova, prosím odstraň je."
      );
    } else {
      fetchUsernameAndSendMessage();
    }
  };

  const fetchUsernameAndSendMessage = async () => {
    if (messageText.trim() !== "") {
      try {
        const userDocRef = doc(usersInfoRef, auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const username = userDocSnap.data().Username;
          await addDoc(messagesRef, {
            text: messageText,
            username: username,
            timestamp: new Date(),
          });
          setMessageText("");
        } else {
          console.log("No such user!");
        }
      } catch (error) {
        console.error(
          "Error fetching user or writing message to Firestore",
          error
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("HomePage")}
          style={styles.BackIconTO}
        >
          <Image
            style={styles.iconBack}
            source={require("../assets/icons/back-button.png")}
          />
        </TouchableOpacity>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.messageContainer}>
              <Text style={styles.username}>{item.username || "Unknown"}</Text>
              <Text style={styles.message}>{item.text}</Text>
            </TouchableOpacity>
          )}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.input}
            placeholder="Napište zprávu...."
            value={messageText}
            onChangeText={setMessageText}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.SendTO}>
            <Image
              style={styles.iconSend}
              source={require("../assets/icons/Send2.png")}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "#1F1007",
  },
  messagesList: {
    flex: 1,
    marginBottom: 10,
    marginTop: 40,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 4,
    backgroundColor: "#130A04",
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
    fontFamily: "Avenir",
    marginLeft: 3,
  },
  message: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Avenir",
    marginLeft: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    marginRight: 50,
    color: "#fff",
  },
  SendTO: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "0%",
    right: "0%",
    backgroundColor: "#B83637",
    borderRadius: 10,
    padding: 8,
  },
  iconSend: {
    height: 23,
    width: 26,
  },
  bottomContainer: {
    height: 50,
  },
  BackIconTO: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 25,
    left: 0,
  },
  iconBack: {
    height: 25,
    width: 25,
  },
});

export default GlobalChatPage;
