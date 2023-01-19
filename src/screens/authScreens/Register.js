import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { API } from "./global";

export default function Register({ navigation }) {
  const [registrationStatus, setRegistrationStatus] = useState("");

  // const verify = () => {
  //   navigation.navigate("Login");
  // };

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const userData = {
    FirstName: firstName,
    LastName: lastName,
    email: email,
    password: password,
  };
  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(userData),
  // };

  const registeruser = async (userData) => {
    try {
      await fetch(`${API}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }).then((response) => {
        response.json().then((data) => {
          handleFinalResult(data);
        });
      });
    } catch (error) {
      Alert.alert(error.message);
      throw error;
    }

    const handleFinalResult = (user) => {
      setRegistrationStatus(user);
      if (user.message === "Email Sent to registered Email") {
        Alert.alert("Successfully registration");
        navigation.navigate("Login");
      } else {
        Alert.alert(user.message);
      }
    };
  };
  // if (registrationStatus.message === "Email Sent to registered Email") {
  //   verify();
  // }
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginVertical: 40, fontSize: 24 }}>
        Welcome to the TODO APP
      </Text>
      <View style={{ width: "90%", gap: 40 }}>
        <TextInput
          placeholder="Email Address"
          style={styles.inputStyle}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.inputStyle}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          placeholder="First Name"
          style={styles.inputStyle}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.inputStyle}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <Button
          title="SignIN"
          style={{ marginTop: 15 }}
          onPress={() => registeruser(userData)}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    marginVertical: 0,
    borderBottomColor: "black",
    fontSize: 18,
    fontWeight: "700",
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 320,
    marginBottom: 10,
  },
});
