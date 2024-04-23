import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setErrorMessage("");
      } catch (err) {
        console.log("got error: ", err.message);
        setErrorMessage("Wrong email or password");
      }
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
          onPress={() => navigation.navigate("WelcomePage")}
          style={styles.BackIconTO}
        >
          <Image
            style={styles.iconBack}
            source={require("../assets/icons/back-button.png")}
          />
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>

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
                placeholder={"Heslo"}
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => setPassword(value)}
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.loginButtonTO}>
            <View style={styles.loginButton}>
              <Text style={styles.loginTxt}>Přihlásit se</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CommingSoon")}
            style={styles.FrgtPasswordTO}
          >
            <Text style={styles.FrgtPasswordTxt}>Zapomenuté heslo?</Text>
          </TouchableOpacity>

          <View style={styles.registraceContainer}>
            <Text style={styles.registraceTxt1}>Ještě nemáte účet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
              <Text style={styles.registraceTxt2}>Zaregistrovat se</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registraceContainer}>
            <Text style={styles.registraceTxt1}>Ještě nemáte účet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
              <Text style={styles.registraceTxt2}>Zaregistrovat se</Text>
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
    height: "100%",
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
  errorMessage: {
    position: "absolute",
    top: 35,
    color: "#B83637",
    fontSize: 16,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
});

export default LoginPage;
