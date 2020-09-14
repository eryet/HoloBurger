import React, { useState, useEffect } from "react";
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
import Constants from "expo-constants";

import styles from "./Styles";
import Header2 from "../Header/Header2";

const HoloChannel = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(`https://www.youtube.com/channel/${item.yt_channel_id}`)
      }
      style={styles.youtube_link}
    >
      <View style={styles.item}>
        <View style={styles.youtube_link}>
          <Image
            source={{
              uri: `${item.photo}`,
            }}
            style={styles.thumbnail}
          />
          <View style={styles.videolink_view}>
            <Text style={styles.youtube_title}>{item.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Channel = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.holotools.app/v1/channels/?limit=50")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => {
    return <HoloChannel item={item} />;
  };

  if (isLoading === false) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[...data.channels].sort((a, b) => {
            return (
              new Date(a.published_at).getTime() -
              new Date(b.published_at).getTime()
            );
          })}
          renderItem={renderItem}
          keyExtractor={(item) => item.yt_channel_id}
          ListHeaderComponent={<Header2 />}
          stickyHeaderIndices={[0]}
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
export default Channel;
