import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  ActivityIndicator,
  FlatList,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import Menu, {
  MenuProvider,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { MaterialIcons } from "@expo/vector-icons";

// video style
import styles from "./Styles";
import UpcomingTimer from "./UpcomingTimer";
import headerStyles from "./headerStyles";

// need an indicator to show whether video is "live", "missing" or "past"
const Videos = ({ item }) => {
  const countdown = new Date(item.published_at)
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
          <Image
            source={{
              uri: `https://i.ytimg.com/vi/${item.yt_video_key}/mqdefault.jpg`,
            }}
            style={styles.thumbnail}
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

const Video = () => {
  const [date, setDate] = useState(Date.now());
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(
        "https://api.holotools.app/v1/videos/?start_date=2020-10-11&end_date=2020-10-12&limit=50"
      ),
      fetch(
        "https://api.holotools.app/v1/videos/?start_date=2020-10-11&end_date=2020-10-12&limit=50&offset=50"
      ),
    ])
      .then(([response1, response2]) =>
        Promise.all([response1.json(), response2.json()])
      )
      .then(([response1, response2]) => {
        const merge = response1.videos.concat(response2.videos);
        const sortedMerge = merge.sort((a, b) => {
          return (
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
          );
        });
        setData([...sortedMerge]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const VideoHeader = () => {
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
            <Image source={require("../../../assets/cap_holoburger.png")} />
          </View>
          <Menu>
            <MenuTrigger style={styles.flexrowsort}>
              <MaterialIcons name="sort" size={30} color="white" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                onSelect={() => alert("Test")}
                text="Oldest Channel"
              />
              <MenuOption
                onSelect={() => alert("Test")}
                text="Latest Channel"
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Videos item={item} />
      </View>
    );
  };

  if (isLoading === false) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.yt_channel_id}
          ListHeaderComponent={<VideoHeader />}
          stickyHeaderIndices={[0]}
          extraData={data}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </SafeAreaView>
    );
  }
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

export default Video;
