import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MenuProvider } from "react-native-popup-menu";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import MainScreen from "./src/pages/MainScreen/MainScreen";
import Channel from "./src/pages/Channel/Channel";

const Tab = createBottomTabNavigator();

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
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="live"
            tabBarOptions={{
              activeTintColor: "#38abe0",
              inactiveTintColor: "#909090",
              inactiveBackgroundColor: "#212121",
              activeBackgroundColor: "#212121",
            }}
          >
            <Tab.Screen
              name="live"
              options={{
                tabBarLabel: "Live!",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="live-tv" size={24} color={color} />
                ),
                tabBarBadge: data.live.length,
              }}
              children={() => (
                <MainScreen
                  data={[...data.live]}
                  status={"live"}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                />
              )}
            />
            <Tab.Screen
              name="Upcoming"
              options={{
                tabBarLabel: "Upcoming!",
                tabBarColor: "#303030",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5 name="hamburger" size={24} color={color} />
                ),
                tabBarBadge: data.upcoming.length,
              }}
              children={() => (
                <MainScreen
                  data={[...data.upcoming]}
                  status={"upcoming"}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                />
              )}
            />
            <Tab.Screen
              name="Ended"
              options={{
                tabBarLabel: "Ended!",
                tabBarColor: "#303030",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="video-off"
                    size={24}
                    color={color}
                  />
                ),
                tabBarBadge: data.ended.length,
              }}
              children={() => (
                <MainScreen
                  data={[...data.ended]}
                  status={"ended"}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                />
              )}
            />
            <Tab.Screen
              name="Channel"
              options={{
                tabBarLabel: "HoloChannel",
                tabBarColor: "#303030",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="youtube-subscription"
                    size={24}
                    color={color}
                  />
                ),
              }}
              component={Channel}
            />
          </Tab.Navigator>
        </NavigationContainer>
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
