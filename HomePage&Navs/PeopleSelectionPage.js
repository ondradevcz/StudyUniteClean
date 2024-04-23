// PeopleSelectionPage.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

const subjects = [
  "Počítačové vědy",
  "Chemie",
  "Fyzika",
  "Biologie",
  "Matematika",
  "Literatura",
  "Historie",
  "Ekonomie",
  "Psychologie",
  "Pedagogika",
  "Umění",
  "ZSV",
  "Politika",
  "Film",
  "Podnikání",
  "Memes",
];

const PeopleSelectionPage = ({ navigation }) => {
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
          <View style={styles.scrollContainer}>
            <Text style={styles.scrollTxt}>scrolluj</Text>

            <Image
              style={styles.iconScroll}
              source={require("../assets/icons/scrollicon.png")}
            />
          </View>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject}
              style={styles.button}
              onPress={() =>
                navigation.navigate("PeoplePage", { selectedSubject: subject })
              }
            >
              <Text style={styles.buttonText}>{subject}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1007",
  },
  button: {
    backgroundColor: (rgb = "rgba(217, 217, 217, 0.6)"),
    height: 50,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Avenir",
    fontWeight: "bold",
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
  scrollview: {
    backgroundColor: "#1F1007",
    marginTop: 90,
    width: "100%",
    height: "100%",
  },
  outBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "1F1007",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollTxt: {
    color: "#93E546",
    fontSize: 15,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    left: 0,
  },
  iconScroll: {
    height: 25,
    width: 15,
    position: "absolute",
    right: 0,
  },
  scrollContainer: {
    width: 70,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 270,
    marginBottom: 5,
  },
});

export default PeopleSelectionPage;
