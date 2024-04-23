import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

const SupportPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SubjectPickPage")}
        style={styles.BackIconTO}
      >
        <Image
          style={styles.iconBack}
          source={require("../assets/icons/back-button.png")}
        />
      </TouchableOpacity>

      <Text style={styles.SupportTxt}>
        Můžeš nás kontaktovat těmito způsoby:{"\n"}
        {"\n"}
        <Text style={{ color: "#fff" }}>
          Instagram:{"\n"}@study.unite{"\n"}@withondra{"\n"}
          {"\n"}Email:{"\n"}
          studyunite.app@gmail.com
        </Text>
      </Text>
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
  SupportTxt: {
    width: 350,
    color: "#4B910A",
    fontSize: 25,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    top: 120,
  },
});

export default SupportPage;
