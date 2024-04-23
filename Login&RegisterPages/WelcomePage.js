import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/backgrounds/WelcomeBackground.png")}
        resizeMode="cover"
        style={styles.WelcomeBackground}
      >
        <View style={styles.WelcomeContainer}>
          <Text style={styles.WelcomeTxt}>
            Vytváříme{" "}
            <Text style={{ color: "#4B910A" }}>největší komunitu studentů</Text>
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginPage")}
            style={styles.LoginTO}
          >
            <View style={styles.LoginBtn}>
              <Text style={styles.LoginTxt}>Přihlásit se</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9BC9C3",
    justifyContent: "center",
    alignItems: "center",
  },
  WelcomeBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  LoginTO: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  LoginBtn: {
    backgroundColor: "#4B910A",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  LoginTxt: {
    color: "#fff",
    fontSize: 23,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  WelcomeTxt: {
    color: "#fff",
    fontSize: 35,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    bottom: 60,
  },
  WelcomeContainer: {
    width: 280,
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomePage;
