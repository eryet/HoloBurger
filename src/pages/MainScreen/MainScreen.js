import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Linking,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Menu, {
  MenuProvider,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageLoader } from "react-native-image-fallback";

import UpcomingTimer from "./UpcomingTimer";
import styles from "./Styles";
import headerStyles from "./headerStyles";

const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

const Live = ({ item }) => {
  const options = { day: "numeric", month: "short" };
  const imagesource = `https://i.ytimg.com/vi/${item.yt_video_key}/mqdefault.jpg`;
  const fallbacks = require("../../../assets/fbk_1m.png");
  const countdown = new Date(item.live_end)
    .toLocaleString()
    .replace("2020", "");
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `https://www.youtube.com/watch?v=${item.yt_video_key}`
          )
        }
        style={styles.youtube_link}
      >
        <View style={styles.youtube_link}>
          <ImageLoader
            source={imagesource}
            style={styles.thumbnail}
            fallback={fallbacks}
          />
          <View style={styles.videolink_view}>
            <Text
              style={styles.youtube_title}
              ellipsizeMode="tail"
              numberOfLines={3}
            >
              {item.title}
            </Text>
            <Text style={styles.youtube_channel} numberOfLines={1}>
              {item.channel.name}
            </Text>
            {item.status === "live" && (
              <Text style={styles.youtube_channel} numberOfLines={1}>
                {kFormatter(item.live_viewers)} watching!
              </Text>
            )}
            {item.status === "past" && (
              <Text style={styles.youtube_channel} numberOfLines={2}>
                {countdown}
              </Text>
            )}
            {item.status === "upcoming" && (
              <View>
                <UpcomingTimer schedule={item.live_schedule} />
              </View>
            )}
          </View>
          {item.status === "upcoming" && (
            <View style={styles.more}>
              <Menu>
                <MenuTrigger>
                  <MaterialIcons name="more-vert" size={24} color="#aaaaaa" />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption
                    onSelect={() => alert(`Test`)}
                    text="Set reminder"
                  />
                </MenuOptions>
              </Menu>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MainScreen = (props) => {
  const [data, setData] = useState([...props.data]);

  const renderItem = ({ item }) => {
    return (
      <View key={item.key}>
        <Live item={item} />
      </View>
    );
  };

  const sortByLiveSchedule = () => {
    const sorted = [...data].sort((a, b) => {
      return new Date(b.live_schedule) - new Date(a.live_schedule);
    });
    setData(sorted);
  };

  const sortByLiveSchedule2 = () => {
    const sorted = [...data].sort((a, b) => {
      return new Date(a.live_schedule) - new Date(b.live_schedule);
    });
    setData(sorted);
  };

  const sortByLiveViewerLeast = () => {
    const sorted = [...data].sort((a, b) => {
      return a.live_viewers - b.live_viewers;
    });
    setData(sorted);
  };

  const sortByLiveViewerMost = () => {
    const sorted = [...data].sort((a, b) => {
      return b.live_viewers - a.live_viewers;
    });
    setData(sorted);
  };

  const sortByLiveEnded = () => {
    const sorted = [...data].sort((a, b) => {
      return new Date(a.live_end) - new Date(b.live_end);
    });
    setData(sorted);
  };

  const sortByLiveEnded2 = () => {
    const sorted = [...data].sort((a, b) => {
      return new Date(b.live_end) - new Date(a.live_end);
    });
    setData(sorted);
  };

  // flatlist header with sortBy
  const FlatListHeader = (childprops) => {
    return (
      <View>
        <View style={headerStyles.flexrow}>
          <View>
            <Image
              source={require("../../../assets/fubuki_burger.gif")}
              style={headerStyles.header_gif}
            />
          </View>
          <View style={headerStyles.right_view}>
            <TouchableHighlight
              onPress={() => childprops.navigation.navigate("About")}
            >
              <Image source={require("../../../assets/cap_holoburger.png")} />
            </TouchableHighlight>
          </View>
          <Menu>
            <MenuTrigger style={styles.flexrowsort}>
              <MaterialIcons name="sort" size={30} color="white" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              {props.status === "live" && (
                <MenuOption
                  onSelect={sortByLiveSchedule}
                  text="Latest Stream"
                />
              )}
              {props.status === "live" && (
                <MenuOption
                  onSelect={sortByLiveSchedule2}
                  text="Oldest Stream"
                />
              )}
              {props.status === "live" && (
                <MenuOption
                  onSelect={sortByLiveViewerLeast}
                  text="Live Viewer (Least)"
                />
              )}
              {props.status === "live" && (
                <MenuOption
                  onSelect={sortByLiveViewerMost}
                  text="Live Viewer (Most)"
                />
              )}
              {props.status === "upcoming" && (
                <MenuOption
                  onSelect={sortByLiveSchedule}
                  text="Oldest Upcoming"
                />
              )}
              {props.status === "upcoming" && (
                <MenuOption
                  onSelect={sortByLiveSchedule2}
                  text="Latest Upcoming"
                />
              )}
              {props.status === "ended" && (
                <MenuOption onSelect={sortByLiveEnded} text="Oldest Ended" />
              )}
              {props.status === "ended" && (
                <MenuOption onSelect={sortByLiveEnded2} text="Newest Ended" />
              )}
            </MenuOptions>
          </Menu>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.yt_video_key}
        ListHeaderComponent={<FlatListHeader navigation={props.navigation} />}
        stickyHeaderIndices={[0]}
        extraData={data}
        refreshControl={<RefreshControl onRefresh={props.onRefresh} />}
      />
    </SafeAreaView>
  );
};

// sort by popupmenu styles
const optionsStyles = {
  optionsContainer: {
    backgroundColor: "#333333",
    padding: 10,
  },
  optionText: {
    fontSize: 20,
    color: "white",
  },
};

export default MainScreen;
