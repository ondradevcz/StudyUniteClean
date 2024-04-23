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
      <Text style={styles.nadpis}>O čem je StudyUnite?</Text>

      <Text style={styles.Txt}>
        {
          "Naším posláním je naučit studenty se učit chytře, tak aby měli čas i na další věci na kterých záleží. Zároveň chceme lidi naučit si navzájem pomáhat.\n\n"
        }
        <Text style={{ color: "#E03B3C" }}>
          {
            "Pokud máš problém s tím že si i po hodinách učení nic nepamatuješ, v této aplikaci najdeš mnoho technik a metod tak se naučit cokoliv.\n\n"
          }
          <Text style={{ color: "#fff" }}>
            {
              "Jednoduše si tady najdeš někoho kdo tě bude doučovat a pomůže ti tak s čímkoli co ti nejde.\n\n"
            }
            <Text style={{ color: "#E03B3C" }}>
              Hned po registraci se můžeš představit v Globálním chatu, stačí
              kliknout na ikonu vlaštovku vespod.
            </Text>
          </Text>
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text style={styles.btnTxt}>Pokračovat</Text>
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
  Txt: {
    color: "#93E546",
    fontSize: 17,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    top: 150,
    width: 340,
  },
  confirmButton: {
    height: 55,
    width: 330,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#4B910A",
    position: "absolute",
    top: 710,
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
