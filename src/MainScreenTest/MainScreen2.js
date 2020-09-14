import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Linking,
  RefreshControl,
} from "react-native";
import { format, formatDistanceToNow } from "date-fns";

import UpcomingTimer from "./UpcomingTimer";
import styles from "./Styles";
import Header2 from "../Header/Header2";

const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

const Live = ({ item }) => {
  const countdown = formatDistanceToNow(new Date(item.live_schedule), {
    includeSeconds: true,
  });
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
            {item.status === "upcoming" && (
              <View>
                <UpcomingTimer schedule={item.live_schedule} />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MainScreen2 = (props) => {
  const [data, setData] = useState([...props.data]);

  useEffect(() => setData([...props.data]), [props]);

  const renderItem = ({ item }) => {
    return <Live item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.sort((a, b) => {
          return (
            new Date(a.live_schedule).getTime() -
            new Date(b.live_schedule).getTime()
          );
        })}
        renderItem={renderItem}
        keyExtractor={(item) => item.yt_video_key}
        ListHeaderComponent={<Header2 />}
        stickyHeaderIndices={[0]}
        extraData={data}
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default MainScreen2;
