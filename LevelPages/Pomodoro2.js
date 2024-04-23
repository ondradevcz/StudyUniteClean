import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
  Linking,
} from "react-native";
import { auth, firestore } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Pomodoro2 = ({ navigation }) => {
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
          <Text style={styles.nadpis}>Pomodoro Technique</Text>
          <Text style={styles.podnadpis}>
            Jakmile spustíš interval, zapne se{"\n"}odpočet/časovač
          </Text>
          <View style={styles.actionContainer1}>
            <View style={styles.innerContainer}>
              <Text style={styles.innerNadpis}>
                Studijní interval (25 minut)
              </Text>
              <Text style={styles.innerTxt}>Teď se po tuto dobu uč</Text>
              <TouchableOpacity
                style={styles.Btn1}
                onPress={() =>
                  navigation.navigate("Timer", {
                    origin: "Pomodoro",
                    duration: 25,
                  })
                }
              >
                <Text style={styles.btnTxt}>Spustit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actionContainer2}>
            <View style={styles.innerContainer}>
              <Text style={styles.innerNadpis}>Kratší pauza (5 minut)</Text>
              <Text style={styles.innerTxt}>
                Teď si dej pauzu, nedoporučujeme dělat nic co ti dá víc dopaminu
                - např. Instagram
              </Text>
              <TouchableOpacity
                style={styles.Btn1}
                onPress={() =>
                  navigation.navigate("Timer", {
                    origin: "Pomodoro",
                    duration: 0.1,
                  })
                }
              >
                <Text style={styles.btnTxt}>Spustit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actionContainer3}>
            <View style={styles.innerContainer}>
              <Text style={styles.innerNadpis}>Dlouhá pauza (30 minut)</Text>
              <Text style={styles.innerTxt}>
                Teď si dej pauzu, nedoporučujeme dělat nic co ti dá víc dopaminu
                - např. Instagram
              </Text>
              <TouchableOpacity
                style={styles.Btn1}
                onPress={() =>
                  navigation.navigate("Timer", {
                    origin: "Pomodoro",
                    duration: 30,
                  })
                }
              >
                <Text style={styles.btnTxt}>Spustit</Text>
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
    height: 950,
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
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 210,
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
    width: "100%",
    height: 37,
    backgroundColor: "#EF4D3C",
    position: "absolute",
    bottom: 0,
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
    height: 215,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 420,
  },
  actionContainer3: {
    backgroundColor: "#241308",
    width: "100%",
    height: 215,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 665,
  },
});

export default Pomodoro2;
