import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { API } from "./global";

export default function ForgotPassword() {
  const [result, setResult] = useState("");

  function sentRegistrationEmail(email) {
    fetch(`${API}/email/sent`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "content-Type": "application/json",
      },
    });
    // res.then((result)=>result.json()).then((user)=>setResult(user));
  }

  const handleMessage = (email) => {
    sentRegistrationEmail(email);
    Alert.alert("Registration email sent");
    setResult("");
  };
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>ForgotPassword??</Text>
      <View
        style={{
          width: "90%",
          gap: 40,
          marginVertical: 40,
          alignItems: "center",
          backgroundColor: "#e1e1e1",
        }}
      >
        <TextInput
          placeholder="Entered your registered Email"
          onChangeText={(text) => setResult(text)}
          value={result}
        />
      </View>
      <Button
        title="Send Email"
        style={{ width: "90%", marginTop: 20 }}
        onPress={() => handleMessage(result)}
      ></Button>
    </View>
  );
}
