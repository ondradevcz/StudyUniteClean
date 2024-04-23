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

const CommingSoon = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginPage")}
        style={styles.BackIconTO}
      >
        <Image
          style={styles.iconBack}
          source={require("../assets/icons/back-button.png")}
        />
      </TouchableOpacity>

      <Text style={styles.CommingSoonTxt}>
        Omlouváme se,{"\n"}
        <Text style={{ color: "#fff" }}>tato funkce zatím není dostupná</Text>
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
  CommingSoonTxt: {
    width: 350,
    color: "#4B910A",
    fontSize: 35,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
});

export default CommingSoon;
