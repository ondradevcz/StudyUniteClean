import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Button,
} from "react-native";
import { auth, firestore } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const SpacedRepetition = ({ navigation }) => {
  const [dayStreakIncreased, setDayStreakIncreased] = useState(false);

  // Function to unlock a field
  const handleUnlock = async (field, setState) => {
    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);
    try {
      await updateDoc(userRef, { [field]: true });
      setState(true);
    } catch (error) {
      console.error(`Failed to unlock ${field}:`, error);
    }
  };

  // Function to add a specific amount of Money
  const addMoney = async (amount) => {
    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);
    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const currentMoney = userSnap.data().Money || 0; // Get current Money
        await updateDoc(userRef, {
          Money: currentMoney + amount, // Add specified Money
        });
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error updating Money:", error);
    }
  };

  // Function to update the day streak
  const updateDayStreak = async () => {
    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);
    const currentDate = new Date().toDateString();

    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const lastPostDate = data.lastPostDate;
        const currentDayStreak = data.Daystreak || 0; // Get the current day streak

        if (lastPostDate !== currentDate) {
          await updateDoc(userRef, {
            lastPostDate: currentDate,
            Daystreak: currentDayStreak + 1, // Increment the day streak by one
          });

          setDayStreakIncreased(true);
        }
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error updating day streak:", error);
    }
  };

  // Composite function to unlock, update day streak, and navigate
  const handleButtonClick = async () => {
    await handleUnlock("TLMUnlocked", setDayStreakIncreased); // Unlock a specific field
    await updateDayStreak(); // Update day streak
    await addMoney(25);
    navigation.navigate("HomePage"); // Navigate to HomePage
  };
  return (
    <View style={styles.bigContainer}>
      <ScrollView contentContainerStyle={styles.scrollview}>
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
          <Image
            style={styles.srImg}
            source={require("../assets/icons/SpacedRepetition.png")}
          />
          <View style={styles.rectangle}>
            <View style={styles.innerContainer}>
              <Text style={styles.nadpis}>Spaced Repetition</Text>
              <Text style={styles.podnadpis}>Vybuduj si dlouhodobou paměť</Text>
              <View style={styles.line}></View>
              <Text style={styles.podnadpis2}>Zapamatování informací</Text>
              <Text style={styles.nadpis2}>O čem to je?</Text>
              <Text style={styles.txt}>
                Spaced Repetition je taktéž ověřená technika jak si zapamatovat
                jakoukoli látku. Je podobná Active Recall ale časové intervaly
                jsou mnohem delší.
                {"\n"}Většinou se používají tzv. flashcards. Tomu se říká
                Leitner System ale o tom si povíme v následujících levelech.
                Hlavní pointa metody je že si vámi zvolených způsobem postupně v
                delších časových intervalech opakujete učivo.
              </Text>
              <Text style={styles.nadpis3}>Nevýhody</Text>
              <Text style={styles.txt2}>
                Tato metoda zabere opravdu hodně času a je už poměrně pokročilá
                jelikož ji musíš kombinovat s jinými technikami jako jsou
                flashcards či Active Recall.
              </Text>
              <TouchableOpacity style={styles.Btn1} onPress={handleButtonClick}>
                <Text style={styles.btnTxt}>Je mi to jasný</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    height: "100%",
    backgroundColor: "#1F1007",
  },
  scrollview: {
    backgroundColor: "#1F1007",
    flexGrow: 1,
    paddingBottom: 80,
  },
  container: {
    backgroundColor: "#1F1007",
    width: "100%",
    height: 700,
    flex: 1,
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
  rectangle: {
    width: "100%",
    height: 1000,
    backgroundColor: "#241308",
    position: "absolute",
    top: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  srImg: {
    width: 170,
    height: 170,
    position: "absolute",
    top: 60,
  },
  innerContainer: {
    width: 350,
    height: "100%",
    position: "absolute",
    top: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  nadpis: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 0,
    left: 0,
  },
  podnadpis: {
    color: "#fff",
    fontSize: 13.5,
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 40,
    left: 0,
  },
  line: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#5F3C26",
    position: "absolute",
    top: 85,
  },
  podnadpis2: {
    color: "#fff",
    fontSize: 13.5,
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 111.5,
    left: 0,
  },
  nadpis2: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 200,
    left: 0,
  },
  txt: {
    color: "#fff",
    fontSize: 13.5,
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 230,
    left: 0,
  },
  nadpis3: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 395,
    left: 0,
  },
  txt2: {
    color: "#fff",
    fontSize: 13.5,
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 425,
    left: 0,
  },
  Btn1: {
    width: "88%",
    height: 37,
    backgroundColor: "#E9B34F",
    position: "absolute",
    top: 520,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
});

export default SpacedRepetition;
