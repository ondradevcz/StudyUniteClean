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

const SetupedPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nadpis}>Vše je nastaveno</Text>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate("IntroPage")}
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
  confirmButton: {
    height: 55,
    width: 330,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#4B910A",
    position: "absolute",
    top: 175,
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

export default SetupedPage;
