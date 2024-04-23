import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (user) {
          const userRef = doc(firestore, "UsersInfo", user.uid);
          // Set the initial values for Level, DayStreak, and Money to 1
          await setDoc(
            userRef,
            {
              Email: user.email,
              Daystreak: 0,
              Money: 0,
            },
            { merge: true }
          );

          navigation.navigate("SubjectPickPage");
        }
      } catch (err) {
        console.log("got error: ", err.message);
        Alert.alert("Chyba při registraci", err.message, [
          {
            text: "Zkusit znovu",
            onPress: () => console.log("Zkusit znovu pressed"),
            style: "cancel",
          },
        ]);
      }
    } else {
      Alert.alert("Chyba", "Prosím vyplňte e-mail a heslo.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/backgrounds/Background.png")}
        resizeMode="cover"
        style={styles.LoginBackground}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginPage")}
          style={styles.BackIconTO}
        >
          <Image
            style={styles.iconBack}
            source={require("../assets/icons/back-button.png")}
          />
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <View style={styles.emailButton}>
            <View style={styles.loginContainerWhite}>
              <TextInput
                style={styles.loginInput}
                placeholder={"Email"}
                value={email}
                onChangeText={(value) => setEmail(value)}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.passwordButton}>
            <View style={styles.loginContainerWhite}>
              <TextInput
                style={styles.loginInput}
                secureTextEntry={true}
                placeholder={"Heslo"}
                value={password}
                onChangeText={(value) => setPassword(value)}
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.loginButtonTO}>
            <View style={styles.loginButton}>
              <Text style={styles.loginTxt}>Zaregistrovat se</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.registraceContainer}>
            <Text style={styles.registraceTxt1}>Již máte účet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
              <Text style={styles.registraceTxt2}>Přihlásit se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1007",
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
  LoginBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: "70%",
    height: "100%",
    height: 370,
    justifyContent: "center",
    alignItems: "center",
  },
  loginInput: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
    left: 25,
    width: 220,
  },
  loginContainerWhite: {
    backgroundColor: "#B0B5AB",
    opacity: 0.75,
    height: "80 %",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  emailButton: {
    backgroundColor: "#4B910A",
    height: 55,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    bottom: 90,
  },
  passwordButton: {
    backgroundColor: "#4B910A",
    height: 55,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    position: "absolute",
    top: 135,
  },
  loginButtonTO: {
    height: 55,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 202.5,
  },
  loginButton: {
    backgroundColor: "#B83637",
    height: 55,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  loginTxt: {
    color: "#fff",
    fontSize: 19,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  FrgtPasswordTxt: {
    color: "#B83637",
    fontSize: 14,
    fontFamily: "Avenir",
    fontWeight: "bold",
    position: "absolute",
  },
  FrgtPasswordTO: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 93,
  },
  registraceContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
  },
  registraceTxt1: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Avenir",
  },
  registraceTxt2: {
    color: "#7AC931",
    fontSize: 14,
    fontFamily: "Avenir",
  },
});

export default SignUpPage;
