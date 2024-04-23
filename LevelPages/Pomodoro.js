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

const Pomodoro = ({ navigation }) => {
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
            style={styles.tomatoImg}
            source={require("../assets/icons/Tomato.png")}
          />
          <View style={styles.rectangle}>
            <View style={styles.innerContainer}>
              <Text style={styles.nadpis}>Pomodoro Technique</Text>
              <Text style={styles.podnadpis}>
                Zorganizuj si učení a buď co nejefektivnější
              </Text>
              <View style={styles.line}></View>
              <Text style={styles.podnadpis2}>Organizace a řízení času</Text>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => navigation.navigate("Pomodoro2")}
              >
                <Text style={styles.btnTxt}>Spustit</Text>
              </TouchableOpacity>
              <Text style={styles.nadpis2}>O čem to je?</Text>
              <Text style={styles.txt}>
                Technika Pomodoro je naprostý základ pro efektivní učení.
                Spočívá totiž v organizaci času. Každý z nás má často problém se
                soustředit po dlouhou dobu a v tuto chvíli se hodí znát
                Pomodoro. {"\n"}Je to jednoduché. Učíme se časových intervalech
                - začneš se učit po dobu 25 minut a poté si dáš 5 minut pauzu.
                Tímto způsobem to zopakuješ čtyřikrát a dáš si delší přestávku
                30 minut.
                {"\n"}Pokud to chceš posunout ještě na další úroveň, můžeš si to
                nastavit tak že si svůj úkol, například tu látku co se máš
                naučit rozdělíš na menší úkoly a těm se budeš věnovat po dobu
                konkrétních intervalů.
              </Text>
              <Text style={styles.nadpis3}>Proč to funguje?</Text>
              <Text style={styles.txt2}>
                Díky této technice se můžeš skvěle zorganizovat a lépe si práci
                rozdělit na menší části. Zároveň budeš mít ale pravidelně krátké
                přestávky, tudíž si snáz udržíš pozornost a energii.
              </Text>
              <Text style={styles.nadpis4}>Proč to nemusí fungovat?</Text>
              <Text style={styles.txt3}>
                Pomodoro se hlavně hodí na povinnosti do kterých se ti nechce.
                Zároveň na rozložení většího problému na menší. Toto se hodí
                například ve škole ale pokud děláte něco, co vyžaduje se
                soustředit bez přestání například hodinu, tato metoda
                pravděpodobně nebude to nejlepší.
              </Text>
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
  rectangle: {
    width: "100%",
    height: 1000,
    backgroundColor: "#241308",
    position: "absolute",
    top: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  tomatoImg: {
    width: 180,
    height: 180,
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
    top: 490,
    left: 0,
  },
  txt2: {
    color: "#fff",
    fontSize: 13.5,
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 520,
    left: 0,
  },
  nadpis4: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 635,
    left: 0,
  },
  txt3: {
    color: "#fff",
    fontSize: 13.5,
    textAlign: "left",
    position: "absolute",
    fontFamily: "Avenir",
    top: 665,
    left: 0,
  },
  Btn: {
    width: 115,
    height: 37,
    backgroundColor: "#EF4D3C",
    position: "absolute",
    top: 100,
    right: 0,
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

export default Pomodoro;
