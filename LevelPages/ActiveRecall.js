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

const ActiveRecall = ({ navigation }) => {
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
            style={styles.notesImg}
            source={require("../assets/icons/Notes.png")}
          />
          <View style={styles.rectangle}>
            <View style={styles.innerContainer}>
              <Text style={styles.nadpis}>Active Recall</Text>
              <Text style={styles.podnadpis}>
                Nauč se co nejvíce informací co nejrychleji
              </Text>
              <View style={styles.line}></View>
              <Text style={styles.podnadpis2}>Zapamatování informací</Text>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => navigation.navigate("ActiveRecall2")}
              >
                <Text style={styles.btnTxt}>Spustit</Text>
              </TouchableOpacity>
              <Text style={styles.nadpis2}>O čem to je?</Text>
              <Text style={styles.txt}>
                Jedna z nejefektivnějších technik jak si pamatovat informace.
                Během malého množství času se naučíš velké množství hrubých
                informací.{"\n"}Můžeš se tak učit například jazyky.{"\n"}
                Nejdříve si stručně přečtete poznámky a 15 minut děláte něco
                jiného.{"\n"}Vrátíte se a neuspořádaně si na papír začnete psát
                vše co si pamatujete. Jakmile si už nemůžete na nic vzpomenout,
                otevřete si sešit a uděláte opravu.{"\n"}Dáte si na pár hodin
                pauzu a poté si opět vezmete papír a bez toho aby jste otevírali
                sešit si zase zkusíte vzpomenout na co nejvíce informací.
              </Text>
              <Text style={styles.nadpis3}>Proč to funguje?</Text>
              <Text style={styles.txt2}>
                Mozek si při tomto způsobu učení ukládá informace v
                neuspořádaných skupinách. Zároveň si ale trénujete mozek tak aby
                si sám vzpomněl na určité informace v hluboké mysli.
              </Text>
              <Text style={styles.nadpis4}>Proč to nemusí fungovat?</Text>
              <Text style={styles.txt3}>
                Active Recall může být poměrně náročný. Musíte hodně psát a
                obecně to je o dost aktivnější než si poznámky jen číst.
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
  notesImg: {
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
    backgroundColor: "#DBBD41",
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

export default ActiveRecall;
