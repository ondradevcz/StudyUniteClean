import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../config/firebase";

const ActiveRecall2 = ({ navigation }) => {
  const [dayStreakIncreased, setDayStreakIncreased] = useState(false);

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
          <Text style={styles.nadpis}>Leitner System</Text>
          <View style={styles.actionContainer1}>
            <View style={styles.innerContainer}>
              <Text style={styles.innerNadpis}>Rozdělovací fáze</Text>
              <Text style={styles.innerTxt}>
                Rozdělíš učivo do skupin jako v Traffic Light Method
              </Text>
            </View>
          </View>
          <View style={styles.actionContainer2}>
            <View style={styles.innerContainer}>
              <Text style={styles.innerNadpis}>První fáze</Text>
              <Text style={styles.innerTxt}>
                Opakuješ si učivo pomocí metod jako jsou flashcards tak jak je
                uvedeno dole:
              </Text>
            </View>
          </View>
          <Image
            style={styles.boxesImg}
            source={require("../assets/icons/Boxes.png")}
          />
          <Text style={styles.boxTxt1}>Neumím</Text>
          <Text style={styles.boxTxt2}>OK</Text>
          <Text style={styles.boxTxt3}>Umím</Text>
          <TouchableOpacity style={styles.Btn1} onPress={handleButtonClick}>
            <Text style={styles.btnTxt}>Chápu to</Text>
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
    height: 135,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 170,
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
    backgroundColor: "#E5374E",
    position: "absolute",
    top: 690,
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
    height: 135,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 335,
  },
  boxesImg: {
    width: "88%",
    height: undefined,
    aspectRatio: 5.5,
    position: "absolute",
    top: 563,
  },
  boxTxt1: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    top: 530,
    left: "8.5%",
  },
  boxTxt2: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    top: 530,
  },
  boxTxt3: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    top: 530,
    right: "11.5%",
  },
});

export default ActiveRecall2;
