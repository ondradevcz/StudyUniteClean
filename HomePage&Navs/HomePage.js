import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Text,
  Alert,
} from "react-native";
import { auth, firestore } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const HomePage = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dayStreakIncreased, setDayStreakIncreased] = useState(false);
  const [isActRUnlocked, setIsActRUnlocked] = useState(false);
  const [isSpaRUnlocked, setIsSpaRUnlocked] = useState(false);
  const [isTLMUnlocked, setIsTLMUnlocked] = useState(false);
  const [isLSUnlocked, setIsLSUnlocked] = useState(false);

  const fetchUser = async () => {
    if (!auth.currentUser) {
      console.error("No user is signed in.");
      setRefreshing(false);
      return;
    }

    setRefreshing(true);

    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const currentDate = new Date().toDateString();
      setDayStreakIncreased(userSnap.data().lastPostDate === currentDate);
      setUserData(data);
      setIsActRUnlocked(data.ActRUnlocked || false);
      setIsSpaRUnlocked(data.SpaRUnlocked || false);
      setIsTLMUnlocked(data.TLMUnlocked || false);
      setIsLSUnlocked(data.LSUnlocked || false);
    } else {
      console.log("User document does not exist");
    }

    setRefreshing(false);
  };

  const handleUnlock = async (field, setState) => {
    const userRef = doc(firestore, "UsersInfo", auth.currentUser.uid);
    try {
      await updateDoc(userRef, { [field]: true });
      setState(true);
    } catch (error) {
      console.error(`Failed to unlock ${field}: `, error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onRefresh = useCallback(() => {
    fetchUser();
  }, []);

  const flameImage = dayStreakIncreased
    ? require("../assets/icons/fire.png")
    : require("../assets/icons/fire2.png");

  const streakTxtClr = dayStreakIncreased ? "#FD7706" : "#ADA99B";

  const checkAndNavigate = (isUnlocked, targetPage, alertMessage) => {
    if (isUnlocked) {
      navigation.navigate(targetPage);
    } else {
      Alert.alert("Uzamčeno", alertMessage, [{ text: "Jdu na to" }]); // Show alert if locked
    }
  };

  return (
    <View style={styles.bigContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.scrollContainer}>
            <Text style={styles.scrollTxt}>scrolluj</Text>
            <Image
              style={styles.iconScroll}
              source={require("../assets/icons/scrollicon.png")}
            />
          </View>
          <View style={styles.pullContainer}>
            <Text style={styles.pullTxt}>potáhni pro refresh</Text>
            <Image
              style={styles.iconPull}
              source={require("../assets/icons/PullArrow.png")}
            />
          </View>
          <Image
            style={styles.banner}
            source={require("../assets/homepage/Banner.png")}
          />
          <TouchableOpacity
            style={styles.PomTBtn}
            onPress={() => navigation.navigate("Pomodoro")}
          >
            <Image
              style={styles.LevelBtn}
              source={require("../assets/homepage/PomT-button.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ActRBtn}
            onPress={() =>
              checkAndNavigate(
                isActRUnlocked,
                "ActiveRecall",
                "Musíš si vyzkoušet alespoň jednou Pomodoro Technique"
              )
            }
          >
            <Image
              style={styles.LevelBtn}
              source={
                isActRUnlocked
                  ? require("../assets/homepage/ActR-button1.png")
                  : require("../assets/homepage/ActR-button2.png")
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SpaRBtn}
            onPress={() =>
              checkAndNavigate(
                isSpaRUnlocked,
                "SpacedRepetition",
                "Musíš si vyzkoušet alespoň jednou Active Recall"
              )
            }
          >
            <Image
              style={styles.LevelBtn}
              source={
                isSpaRUnlocked
                  ? require("../assets/homepage/SpaR-button1.png")
                  : require("../assets/homepage/SpaR-button2.png")
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TLMBtn}
            onPress={() =>
              checkAndNavigate(
                isTLMUnlocked,
                "TrafficLight",
                "Musíš si přečíst o Spaced Repetition"
              )
            }
          >
            <Image
              style={styles.LevelBtn}
              source={
                isTLMUnlocked
                  ? require("../assets/homepage/TLM-button1.png")
                  : require("../assets/homepage/TLM-button2.png")
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.LSBtn}
            onPress={() =>
              checkAndNavigate(
                isLSUnlocked,
                "LeitnerSystem",
                "Musíš si vyzkoušet alespoň jednou Traffic Light Method"
              )
            }
          >
            <Image
              style={styles.LevelBtn}
              source={
                isLSUnlocked
                  ? require("../assets/homepage/LS-button1.png")
                  : require("../assets/homepage/LS-button2.png")
              }
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.navigationBar2}>
        <View style={styles.coinContainer}>
          <Image
            style={styles.coin}
            source={require("../assets/icons/Coin.png")}
          />
          <Text style={styles.coinTxt}>{userData?.Money}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.logoTxt}>StudyUnite</Text>
        </View>
        <View style={styles.daystreakContainer}>
          <Image style={styles.flame} source={flameImage} />
          <Text style={[styles.daystreakTxt, { color: streakTxtClr }]}>
            {userData?.Daystreak}
          </Text>
        </View>
        <View style={styles.line2}></View>
      </View>
      <View style={styles.navigationBar}>
        <View style={styles.navigationBar}>
          <View style={styles.line}></View>

          <TouchableOpacity
            onPress={() => navigation.navigate("GlobalChatPage")}
            style={styles.iconMessagesTO}
          >
            <Image
              style={styles.iconMessages}
              source={require("../assets/icons/Send.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("MenuPage")}
            style={styles.iconProfileTO}
          >
            <Image
              style={styles.iconProfile}
              source={require("../assets/icons/Profile.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconProfileSearchTO}
            onPress={() => navigation.navigate("PeopleSelectionPage")}
          >
            <Image
              style={styles.iconProfileSearch}
              source={require("../assets/icons/PeopleSearch.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconRankingTO}
            onPress={() => navigation.navigate("BestUsers")}
          >
            <Image
              style={styles.iconRanking}
              source={require("../assets/icons/Ranking.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    height: 950,
    flex: 1,
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
    position: "absolute",
    left: 20,
    top: 125,
  },
  navigationBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#241308",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 3.5,
    backgroundColor: "#5F3C26",
    position: "absolute",
    top: 0,
  },
  iconProfileTO: {
    position: "absolute",
    bottom: 30,
    right: 35,
  },
  iconProfile: {
    width: 35,
    height: 35,
  },
  iconMessagesTO: {
    position: "absolute",
    left: 35,
    bottom: 30,
  },
  iconMessages: {
    width: 37,
    height: 33,
  },
  navigationBar2: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#241308",
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  line2: {
    width: "100%",
    height: 3.5,
    backgroundColor: "#5F3C26",
    position: "absolute",
    bottom: 0,
  },
  coinContainer: {
    backgroundColor: "#301A0D",
    width: 110,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 15,
    top: 50,
  },
  logoContainer: {
    backgroundColor: "#301A0D",
    width: 110,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
  },
  daystreakContainer: {
    backgroundColor: "#301A0D",
    width: 110,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    top: 50,
  },
  logoTxt: {
    color: "#603720",
    fontSize: 17,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  coin: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 10,
  },
  coinTxt: {
    color: "#E8E8E8",
    fontSize: 17,
    fontFamily: "Avenir",
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
  },
  daystreakTxt: {
    color: "#E8E8E8",
    fontSize: 17,
    fontFamily: "Avenir",
    fontWeight: "bold",
    marginTop: 2,
    marginRight: 10,
  },
  flame: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 10,
  },
  iconProfileSearchTO: {
    position: "absolute",
    left: "33%",
    bottom: 30,
  },
  iconProfileSearch: {
    width: 35,
    height: 35,
  },
  iconRankingTO: {
    position: "absolute",
    right: "33%",
    bottom: 30,
  },
  iconRanking: {
    width: 32,
    height: 35,
  },
  LevelBtn: {
    width: 220,
    height: 110,
  },
  banner: {
    width: "100%",
    height: undefined,
    aspectRatio: 5.7,
    position: "absolute",
    top: 168,
  },
  PomTBtn: {
    position: "absolute",
    top: 260,
    left: 22,
  },

  ActRBtn: {
    position: "absolute",
    top: 400,
    right: 22,
  },
  SpaRBtn: {
    position: "absolute",
    top: 540,
    left: 22,
  },
  TLMBtn: {
    position: "absolute",
    top: 680,
    left: 22,
  },
  LSBtn: {
    position: "absolute",
    top: 820,
    right: 22,
  },
  pullTxt: {
    color: "#CD3737",
    fontSize: 15,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    left: 0,
  },
  iconPull: {
    height: 20,
    width: 17,
    position: "absolute",
    right: 0,
  },
  pullContainer: {
    width: 158,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    top: 125,
  },
});

export default HomePage;
