import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { auth, firestore } from "../config/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const Timer = ({ navigation, route }) => {
  const [secondsLeft, setSecondsLeft] = useState(route.params.duration * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [dayStreakIncreased, setDayStreakIncreased] = useState(false);

  const origin = route.params.origin; // Get the origin from Pomodoro2.js

  const handleUnlock = async (field, setState) => {
    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);
    try {
      await updateDoc(userRef, { [field]: true });
      setState(true);
    } catch (error) {
      console.error(`Failed to unlock ${field}:`, error);
    }
  };

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
          // Update lastPostDate and increment day streak
          await updateDoc(userRef, {
            lastPostDate: currentDate,
            Daystreak: currentDayStreak + 1,
          });

          setDayStreakIncreased(true);
        }

        if (origin === "Pomodoro") {
          const currentMoney = data.Money || 0; // Get current money
          // Add 100 Money for completing a Pomodoro session
          await updateDoc(userRef, {
            Money: currentMoney + 100,
          });
        }
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error updating Firebase:", error);
    }
  };

  useEffect(() => {
    let interval;
    if (!isPaused && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          const newTime = prev - 1;

          if (newTime === 0) {
            clearInterval(interval);
            updateDayStreak(); // Update the day streak when timer finishes

            if (origin === "Pomodoro") {
              // Unlock isActR when the origin is "Pomodoro"
              handleUnlock("ActRUnlocked", setDayStreakIncreased);
            }
          }

          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPaused, secondsLeft]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formattedTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.bigContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomePage")}
        style={styles.BackIconTO}
      >
        <Image
          style={styles.iconBack}
          source={require("../assets/icons/back-button.png")}
        />
      </TouchableOpacity>
      <Text style={styles.nadpis}>Časovač</Text>
      <Text style={styles.timer}>{formattedTime()}</Text>
      <TouchableOpacity style={styles.Btn1} onPress={togglePause}>
        <Text style={styles.btnTxt}>
          {isPaused ? "Pokračovat" : "Pozastavit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "#1F1007",
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
  timer: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 190,
  },
  Btn1: {
    width: 200,
    height: 42,
    backgroundColor: "#EF4D3C",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 275,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
});

export default Timer;
