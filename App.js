import React, { useEffect, useState, useRef, useCallback } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { MenuProvider } from "react-native-popup-menu";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import MainScreen from "./src/pages/MainScreen/MainScreen";
import Channel from "./src/pages/Channel/Channel";
import Video from "./src/pages/Video/Video";
import About from "./src/pages/About/About";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

  const onRefresh = useCallback(async () => {
    try {
      let response = await fetch(
        "https://api.holotools.app/v1/live?max_upcoming_hours=730&hide_channel_desc=1"
      );
      let json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const TabScreen = ({ navigation }) => {
    return (
      <MenuProvider>
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
                data={[...data.live]
                  .filter((data) => {
                    return data.live_start !== null;
                  })
                  .sort((a, b) => {
                    return (
                      new Date(b.live_schedule) - new Date(a.live_schedule)
                    );
                  })}
                status={"live"}
                onRefresh={onRefresh}
                navigation={navigation}
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
                data={[...data.upcoming].sort((a, b) => {
                  return new Date(a.live_schedule) - new Date(b.live_schedule);
                })}
                status={"upcoming"}
                onRefresh={onRefresh}
                navigation={navigation}
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
                data={[...data.ended].sort((a, b) => {
                  return new Date(b.live_end) - new Date(a.live_end);
                })}
                status={"ended"}
                onRefresh={onRefresh}
                navigation={navigation}
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
            children={() => <Channel navigation={navigation} />}
          />
        </Tab.Navigator>
      </MenuProvider>
    );
  };

  if (isLoading === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={TabScreen} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
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
