import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./authScreens/global";
export default function Profile({ navigation }) {
  const [profileId, setprofileId] = useState("");
  const [otherData, setOtherData] = useState({});

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        // Our data is fetched successfully
        setprofileId(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  const getUserData = async (userId) => {
    try {
      await fetch(`${API}/users/${userId}`, {
        method: "GET",
      }).then((response) => {
        response.json().then((data) => {
          setOtherData(data);
          // console.log(data);
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  // console.log(getUserData(profileId));
  useEffect(() => {
    getUserData(profileId);
  }, [profileId, otherData]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 100, height: 100, marginBottom: 40 }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }}
      ></Image>
      <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 20 }}>
        {otherData.email}
      </Text>
      <View style={{ paddingRight: 0 }}>
        <Text
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
        >
          {otherData.FirstName}
        </Text>

        <Text
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
        >
          {otherData.LastName}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 10,
          padding: 10,
          width: 280,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "blue",
            height: 45,
            width: 260,
            marginRight: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("EditProfilePage", { userId: profileId })
          }
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            Update Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
