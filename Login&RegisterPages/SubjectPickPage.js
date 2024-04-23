import { signOut } from "firebase/auth";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";

const SubjectPickPage = ({ navigation }) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const isSubjectSelected = (subject) => {
    return selectedSubjects.includes(subject);
  };

  const toggleSubject = (subject) => {
    setSelectedSubjects((prevSelectedSubjects) => {
      if (isSubjectSelected(subject)) {
        return prevSelectedSubjects.filter((s) => s !== subject);
      } else {
        if (prevSelectedSubjects.length < 2) {
          return [...prevSelectedSubjects, subject];
        } else {
          Alert.alert("Upozornění", "Můžeš zvolit maximálně dva obory.");
          return prevSelectedSubjects;
        }
      }
    });
  };

  const confirmSelection = async () => {
    if (selectedSubjects.length === 0) {
      Alert.alert(
        "Upozornění",
        "Musíš zvolit alespoň jeden obor před potvrzením."
      );
      return;
    }

    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);
    try {
      await setDoc(userRef, { Obor: selectedSubjects }, { merge: true });
      Alert.alert("Úspěch", "Tvůj výběr oborů byl uložen.");
      navigation.navigate("NamePage");
    } catch (error) {
      Alert.alert(
        "Chyba",
        "Nepodařilo se uložit tvůj výběr oborů. Zkus to prosím znovu."
      );
      console.error("Error writing document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View style={styles.header}>
          <Text style={styles.nadpis}>Co tě baví?</Text>
        </View>

        <View style={styles.bigContainer}>
          <View style={styles.bcHeader}>
            <Text style={styles.podnadpis}>můžeš zvolit až dvě možnosti</Text>

            <Text style={styles.scrollTxt}>scrolluj</Text>

            <Image
              style={styles.iconScroll}
              source={require("../assets/icons/scrollicon.png")}
            />
          </View>

          <View style={styles.Body}>
            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Počítačové vědy") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Počítačové vědy")}
            >
              <Text style={styles.btnTxt}>Počítačové vědy</Text>

              <Image
                style={styles.iconObor}
                source={require("../assets/icons/computerscience.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Chemie") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Chemie")}
            >
              <Text style={styles.btnTxt}>Chemie</Text>

              <Image
                style={styles.iconOborChemie}
                source={require("../assets/icons/chemie.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Fyzika") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Fyzika")}
            >
              <Text style={styles.btnTxt}>Fyzika</Text>

              <Image
                style={styles.iconObor}
                source={require("../assets/icons/fyzika.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Biologie") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Biologie")}
            >
              <Text style={styles.btnTxt}>Biologie</Text>

              <Image
                style={styles.iconOborBiologie}
                source={require("../assets/icons/biologie.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Matematika") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Matematika")}
            >
              <Text style={styles.btnTxt}>Matematika</Text>

              <Image
                style={styles.iconOborMatematika}
                source={require("../assets/icons/matematika.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Literatura") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Literatura")}
            >
              <Text style={styles.btnTxt}>Literatura</Text>

              <Image
                style={styles.iconOborLiteratura}
                source={require("../assets/icons/literatura.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Historie") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Historie")}
            >
              <Text style={styles.btnTxt}>Historie</Text>

              <Image
                style={styles.iconOborLiteratura}
                source={require("../assets/icons/historie.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Ekonomie") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Ekonomie")}
            >
              <Text style={styles.btnTxt}>Ekonomie</Text>

              <Image
                style={styles.iconOborEkonomie}
                source={require("../assets/icons/ekonomie.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Psychologie") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Psychologie")}
            >
              <Text style={styles.btnTxt}>Psychologie</Text>

              <Image
                style={styles.iconOborPsychologie}
                source={require("../assets/icons/Psychologie.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Pedagogika") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Pedagogika")}
            >
              <Text style={styles.btnTxt}>Pedagogika</Text>

              <Image
                style={styles.iconOborPedagogika}
                source={require("../assets/icons/Pedagogika.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Umění") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Umění")}
            >
              <Text style={styles.btnTxt}>Umění</Text>

              <Image
                style={styles.iconOborUmeni}
                source={require("../assets/icons/Arts.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("ZSV") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("ZSV")}
            >
              <Text style={styles.btnTxt}>ZSV</Text>

              <Image
                style={styles.iconOborUmeni}
                source={require("../assets/icons/ZSV.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Politika") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Politika")}
            >
              <Text style={styles.btnTxt}>Politika</Text>

              <Image
                style={styles.iconOborPolitika}
                source={require("../assets/icons/Politika.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Film") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Film")}
            >
              <Text style={styles.btnTxt}>Film</Text>

              <Image
                style={styles.iconOborFilm}
                source={require("../assets/icons/Film.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Podnikání") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Podnikání")}
            >
              <Text style={styles.btnTxt}>Podnikání</Text>

              <Image
                style={styles.iconOborBusiness}
                source={require("../assets/icons/Business.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.oborBtnTO,
                isSubjectSelected("Memes") && styles.selectedOborBtn,
              ]}
              onPress={() => toggleSubject("Memes")}
            >
              <Text style={styles.btnTxt}>Memes</Text>

              <Image
                style={styles.iconOborUmeni}
                source={require("../assets/icons/Memes.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmSelection}
            >
              <Text style={styles.btnTxt}>Potvrdit výběr</Text>
            </TouchableOpacity>

            <Text style={styles.bottomTxt}>
              {"Nenašel jsi svoji zálibu nebo oblíbený předmět?\n"}
              <TouchableOpacity
                onPress={() => navigation.navigate("SupportPage")}
              >
                <Text style={{ color: "#7AC931", paddingTop: 4 }}>
                  Napiš nám a my ho přidáme! (klikni)
                </Text>
              </TouchableOpacity>
            </Text>

            <Image
              style={styles.PC}
              source={require("../assets/backgrounds/PC.png")}
            />
          </View>
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
  nadpis: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    bottom: 0,
  },
  bigContainer: {
    width: "100%",
    height: 1530,
    paddingTop: 95,
  },
  podnadpis: {
    color: "#E03B3C",
    fontSize: 15,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    left: 0,
  },
  scrollTxt: {
    color: "#93E546",
    fontSize: 15,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    top: 28,
  },
  iconScroll: {
    position: "absolute",
    top: 25,
    left: 54,
    height: 25,
    width: 15,
  },
  header: {
    height: 95,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bcHeader: {
    width: "90%",
    height: 55,
    alignItems: "center",
    position: "absolute",
    left: "5%",
  },
  Body: {
    width: "85%",
    height: "100%",
    alignItems: "center",
    position: "absolute",
    left: "7.5%",
    top: 60,
  },
  oborBtnTO: {
    backgroundColor: (rgb = "rgba(217, 217, 217, 0.6)"),
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 15,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  selectedOborBtn: {
    backgroundColor: "#B83637",
    opacity: 1,
  },
  iconObor: {
    height: 20,
    width: 20,
    position: "absolute",
    right: 20,
  },
  iconOborChemie: {
    height: 17,
    width: 20,
    position: "absolute",
    right: 20,
  },
  confirmButton: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#4B910A",
    marginTop: 20,
  },
  iconOborBiologie: {
    height: 22,
    width: 17,
    position: "absolute",
    right: 21,
  },
  iconOborMatematika: {
    height: 20,
    width: 18,
    position: "absolute",
    right: 20,
  },
  iconOborLiteratura: {
    height: 22,
    width: 18,
    position: "absolute",
    right: 20,
  },
  iconOborEkonomie: {
    height: 20,
    width: 20,
    position: "absolute",
    right: 20,
  },
  bottomTxt: {
    marginTop: 15,
    width: 250,
    color: "#fff",
    fontSize: 15,
    fontFamily: "Avenir",
    marginRight: 70,
  },
  PC: {
    marginTop: 30,
    height: 278,
    width: 300,
  },
  iconOborPsychologie: {
    height: 22,
    width: 20,
    position: "absolute",
    right: 20,
  },
  iconOborPedagogika: {
    height: 19,
    width: 22,
    position: "absolute",
    right: 19,
  },
  iconOborUmeni: {
    height: 22,
    width: 22,
    position: "absolute",
    right: 19,
  },
  iconOborPolitika: {
    height: 22,
    width: 20,
    position: "absolute",
    right: 20,
  },
  iconOborFilm: {
    height: 21,
    width: 23,
    position: "absolute",
    right: 18,
  },
  iconOborBusiness: {
    height: 21,
    width: 24,
    position: "absolute",
    right: 18.5,
  },
});

export default SubjectPickPage;
