import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  YellowBox,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MenuProvider } from "react-native-popup-menu";
import TabBar from "./TabBar";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import MainScreen from "./src/pages/MainScreen/MainScreen";
import Channel from "./src/pages/Channel/Channel";

const Tab = createBottomTabNavigator();

YellowBox.ignoreWarnings(["Animated: `useNativeDriver` was not specified."]);

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    background: "rgb(242, 242, 242)",
    card: "#303030",
    border: "#38abe0",
    notification: "rgb(255, 69, 58)",
  },
};

// Load and use resources that need to be loaded async by Expo SDK
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  // SplashScreen.preventAutoHideAsync();
  // SplashScreen.hideAsync();

  useEffect(() => {
    fetch(
      "https://api.holotools.app/v1/live?max_upcoming_hours=730&hide_channel_desc=1"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      let response = await fetch(
        "https://api.holotools.app/v1/live?max_upcoming_hours=730&hide_channel_desc=1"
      );
      let json = await response.json();
      setData(json);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  if (isLoading === false) {
    return (
      <MenuProvider>
        <TabBar bgNavBar="white" bgNavBarSelector="white" stroke="skyblue">
          <TabBar.Item
            icon={require("./assets/HoloBurgerIcon.png")}
            selectedIcon={require("./assets/HoloBurgerIcon.png")}
            title="Live"
            screenBackgroundColor={{ backgroundColor: "#008080" }}
          >
            <MainScreen
              data={[...data.live]}
              status={"ended"}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          </TabBar.Item>
          <TabBar.Item
            icon={require("./assets/HoloBurgerIcon.png")}
            selectedIcon={require("./assets/HoloBurgerIcon.png")}
            title="Upcoming"
            screenBackgroundColor={{ backgroundColor: "#F08080" }}
          >
            <MainScreen
              data={[...data.upcoming]}
              status={"ended"}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          </TabBar.Item>
          <TabBar.Item
            icon={require("./assets/HoloBurgerIcon.png")}
            selectedIcon={require("./assets/HoloBurgerIcon.png")}
            title="Ended"
            screenBackgroundColor={{ backgroundColor: "#485d72" }}
          >
            <MainScreen
              data={[...data.ended]}
              status={"ended"}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          </TabBar.Item>
        </TabBar>
      </MenuProvider>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.live_header}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#303030",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  dark_mode: {
    backgroundColor: "#303030",
  },
});

export default App;
