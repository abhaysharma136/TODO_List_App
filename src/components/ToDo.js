import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../screens/authScreens/global";

const COLORS = { primary: "#1f145c", white: "#fff" };
export default function ToDoList() {
  const [profileId, setprofileId] = useState("");
  // console.log(profileId);

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

  const [todos, setTodos] = useState([
    // { id: 1, task: "First todo", completed: true },
    // { id: 2, task: "Second todo", completed: true },
    // { id: 3, task: "Third todo", completed: false },
  ]);

  const getUserData = async (userId) => {
    try {
      await fetch(`${API}/todoItem/?userId=${userId}`, {
        method: "GET",
      }).then((response) => {
        response.json().then((data) => {
          setTodos(data);
          // console.log(data);
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getUserData(profileId);
  }, [profileId, todos]);

  const ListItem = ({ todo }) => {
    //Delete Task API
    const deleteTask = async (taskId) => {
      try {
        await fetch(`${API}/todoItem/${taskId}`, {
          method: "DELETE",
        }).then((response) => {
          response.json().then((data) => {
            Alert.alert("Task Deleted Successfully");
          });
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? "line-through" : "none",
            }}
          >
            {todo?.task}
          </Text>
        </View>
        {/* {!todo?.completed && (
          <TouchableOpacity style={[styles.actionIcon]}>
            <Icon name="done" size={20} color={COLORS.white} />
          </TouchableOpacity>
        )} */}
        <TouchableOpacity
          style={[styles.actionIcon, { backgroundColor: "red" }]}
        >
          <Icon
            name="delete"
            size={20}
            color={COLORS.white}
            onPress={() => deleteTask(todo?._id)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const [Addtasks, setAddTasks] = useState("");
  const userData = {
    userId: profileId,
    task: Addtasks,
    completed: false,
  };
  const AddTask = async (userData) => {
    try {
      await fetch(`${API}/todoItem/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }).then((response) => {
        response.json().then((data) => {
          Alert.alert("Task Succefully Added");
        });
      });
    } catch (error) {
      Alert.alert(error.message);
      throw error;
    }
  };

  function handleSubmit(para1) {
    AddTask(para1);
    setAddTasks("");
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, color: COLORS.primary }}
        >
          TODO APP
        </Text>
        <Icon name="edit" size={25} color="red" />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      ></FlatList>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Todo"
            onChangeText={(text) => setAddTasks(text)}
            value={Addtasks}
          />
        </View>
        <TouchableOpacity>
          <View style={styles.iconContiner}>
            <Icon
              name="add"
              color={COLORS.white}
              size={30}
              onPress={() => handleSubmit(userData)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 3,
  },
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    color: COLORS.white,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  iconContiner: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
