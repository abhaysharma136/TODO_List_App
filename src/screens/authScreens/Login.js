import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { API } from "./global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = { primary: "orange" };
export default function Login({ navigation }) {
  const [loginStatus, setLoginStatus] = useState({});
  const verify = () => {
    _storeData();
    navigation.push("Dashboard");
  };
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("userId", loginStatus.id);
    } catch (error) {
      // Error saving data
    }
  };

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const userData = {
    email: email,
    password: password,
  };

  const loginUser = async (userData) => {
    try {
      await fetch(`${API}/users/login`, {
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
    }

    const handleFinalResult = (user) => {
      setLoginStatus(user);
      Alert.alert(user.message);
    };
  };
  useEffect(() => {
    if (loginStatus.message === "Succesfull Login") {
      verify(loginStatus);
    }
  }, [loginStatus]);

  useEffect(() => {}, []);
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "column",
        width: "100%",
        height: "80%",
        justifyContent: "center",
      }}
    >
      <View style={{ marginTop: 100 }}>
        <View
          style={{ alignItems: "center", marginBottom: 20, fontWeight: 300 }}
        >
          <Text style={{ marginVertical: 40, fontSize: 24 }}>Welcome Back</Text>
        </View>

        {/* <Text style={{ fontWeight: "700", fontSize: 24 }}>Login</Text> */}
        <View>
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
          <Text
            style={{
              marginBottom: 10,
              color: "grey",
              textDecorationLine: "underline",
              marginLeft: 200,
            }}
            onPress={() => navigation.navigate("Reset password")}
          >
            Forgot Password
          </Text>
        </View>
      </View>
      <View>
        <View style={{ marginBottom: 15 }}>
          <Button title="SignIN" onPress={() => loginUser(userData)} />
        </View>
        <View>
          <Button
            title="New User"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
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
    marginVertical: 20,
    borderBottomColor: "black",
    fontSize: 18,
    fontWeight: "700",
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 320,
    marginBottom: 20,
  },
});
