import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import ToDoList from "../components/ToDo";
import ForgotPassword from "../screens/authScreens/ForgotPassword";
import Login from "../screens/authScreens/Login";
import Register from "../screens/authScreens/Register";
import Profile from "../screens/Profile";
import EditProfilepage from "../screens/utils/EditProfilepage";

const StackNavigator = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="todo"
        component={ToDoList}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="home" size={24} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="person" size={24} />,
        }}
      ></Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName="Login"
        screenOptions={{ headershown: false }}
      >
        <StackNavigator.Screen
          name="Login"
          component={Login}
          options={{ title: "Login with your Account" }}
        />
        <StackNavigator.Screen
          name="Register"
          component={Register}
          options={{ title: "Registration First" }}
        />
        <StackNavigator.Screen
          name="EditProfilePage"
          component={EditProfilepage}
          options={{ title: "Update Profile Details" }}
        />
        <StackNavigator.Screen
          name="Reset password"
          component={ForgotPassword}
          options={{ title: "Reset Your password" }}
        />
        <StackNavigator.Screen name="Dashboard" component={MainTabs} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
