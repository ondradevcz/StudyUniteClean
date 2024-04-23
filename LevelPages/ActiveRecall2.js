import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { auth, firestore } from "../config/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const ActiveRecall2 = ({ navigation }) => {
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

  // Function to update day streak
  const updateDayStreak = async () => {
    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);
    const currentDate = new Date().toDateString();

    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const lastPostDate = userSnap.data().lastPostDate;
        const currentDayStreak = userSnap.data().Daystreak || 0;

        if (lastPostDate !== currentDate) {
          await updateDoc(userRef, {
            lastPostDate: currentDate,
            Daystreak: currentDayStreak + 1,
          });

          setDayStreakIncreased(true);
        }
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error updating Firebase:", error);
    }
  };

  const handleButtonClick = async () => {
    // Add 25 Money for completing an Active Recall session
    await addMoney(25);
    await updateDayStreak(); // Update day streak
    await handleUnlock("SpaRUnlocked", setDayStreakIncreased);
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
          <Text style={styles.nadpis}>Active Recall</Text>
          <View style={styles.actionContainer1}>
            <View style={styles.innerContainer}>
              <Text style={styles.innerNadpis}>Čtecí část</Text>
              <Text style={styles.innerTxt}>
                Stručně si přečti poznámky a dej si 15 minut pauzu{" "}
              </Text>
            </View>
          </View>
          <View style={styles.actionContainer2}>
            <View style={styles.innerContainer}>
              <Text style={styles.innerNadpis}>První fáze</Text>
              <Text style={styles.innerTxt}>
                Nyní si vezmi papír a bez toho aby jsi se koukal do poznámek,
                zapiš si vše co si pamatuješ.{"\n"}Poté co si na nic dalšího už
                nebudeš moci vzpomenout, vezmi mi sešit a to co jsi napsal na
                papír, si oprav.{"\n"}Až to vše uděláš, věnuj se pár hodin
                něčemu jinému.
              </Text>
            </View>
          </View>
          <View style={styles.actionContainer3}>
            <View style={styles.innerContainer}>
              <Text style={styles.innerNadpis}>Druhá fáze</Text>
              <Text style={styles.innerTxt}>
                Po delší pauze si opět vezmi kus papíru a zapiš si co si
                pamatuješ.{"\n"}Tento proces můžeš opakovat jak dlouho jen
                chceš.{"\n"}Skvělé je vždy prodlužovat mezery mezi fázemi - tím
                si vybuduješ lepší dlouhodobou paměť.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.Btn1} onPress={handleButtonClick}>
            <Text style={styles.btnTxt}>Mám hotovo</Text>
          </TouchableOpacity>
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
    height: 850,
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
  nadpis: {
    color: "#fff",
    fontSize: 29,
    fontWeight: "bold",
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 100,
  },
  podnadpis: {
    color: "#EF4D3C",
    fontSize: 14,
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 140,
    left: "13.5%",
  },
  actionContainer1: {
    backgroundColor: "#241308",
    width: "100%",
    height: 115,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 150,
  },
  innerContainer: {
    width: "88%",
    height: "58%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 25,
  },
  innerNadpis: {
    color: "#fff",
    fontSize: 22.5,
    fontWeight: "bold",
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    left: 0,
    top: 0,
  },
  innerTxt: {
    color: "#fff",
    fontSize: 15,
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 30,
    left: 0,
  },
  Btn1: {
    width: "88%",
    height: 37,
    backgroundColor: "#DBBD41",
    position: "absolute",
    top: 815,
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
  actionContainer2: {
    backgroundColor: "#241308",
    width: "100%",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 295,
  },
  actionContainer3: {
    backgroundColor: "#241308",
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 565,
  },
});

export default ActiveRecall2;
