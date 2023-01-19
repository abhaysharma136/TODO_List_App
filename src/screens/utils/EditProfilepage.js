import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { API } from "../authScreens/global";

export default function EditProfilepage({ route, navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const updateData = {
    FirstName: firstName,
    LastName: lastName,
  };

  const pId = route.params;
  let p2ID = pId.userId;
  //   console.log(p2ID);
  const UpdateUser = async (userData) => {
    try {
      await fetch(`${API}/users/${p2ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }).then((response) => {
        response.json().then((data) => {
          handleFinalResult();
        });
      });
    } catch (error) {
      Alert.alert(error.message);
      throw error;
    }

    const handleFinalResult = () => {
      Alert.alert("Details Successfully Updated");
      navigation.navigate("profile");
    };
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Make Profile Changes here
      </Text>
      <View style={{ marginLeft: 20 }}>
        <TextInput
          placeholder="Enter First Name"
          onChangeText={(text) => setFirstName(text)}
          style={{
            fontSize: 18,
            fontWeight: "700",
            borderColor: "gray",
            width: "100%",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            width: 270,
            marginBottom: 20,
          }}
        />
        <TextInput
          placeholder="Enter Last Name"
          onChangeText={(text) => setLastName(text)}
          style={{
            fontSize: 18,
            fontWeight: "700",
            borderColor: "gray",
            width: "100%",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            width: 270,
          }}
        />
        <Pressable
          onPress={() => UpdateUser(updateData)}
          style={{
            backgroundColor: "lightblue",
            height: 45,
            width: 270,
            marginRight: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
}
