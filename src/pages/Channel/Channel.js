import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableHighlight,
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
import { useNavigation } from "@react-navigation/native";

import styles from "./Styles";
import headerStyles from "./headerStyles";

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
  const navigation = useNavigation();

  useEffect(() => {
    Promise.all([
      fetch("https://api.holotools.app/v1/channels/?limit=50"),
      fetch("https://api.holotools.app/v1/channels/?limit=10&order=desc"),
    ])
      .then(([response1, response2]) =>
        Promise.all([response1.json(), response2.json()])
      )
      .then(([response1, response2]) => {
        const merge = response1.channels.concat(response2.channels);
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

  const renderItem = ({ item }) => {
    return <HoloChannel item={item} />;
  };

  const sortByPublishTime = () => {
    const sorted = [...data].sort((a, b) => {
      return (
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
      );
    });
    console.log(sorted);
    setData(sorted);
  };

  const sortByPublishTime2 = () => {
    const sorted = [...data].sort((a, b) => {
      return (
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    });
    console.log(sorted);
    setData(sorted);
  };

  const ChannelHeader = () => {
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
            <TouchableHighlight onPress={() => navigation.navigate("About")}>
              <Image source={require("../../../assets/cap_holoburger.png")} />
            </TouchableHighlight>
          </View>
          <Menu>
            <MenuTrigger style={styles.flexrowsort}>
              <MaterialIcons name="sort" size={30} color="white" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={sortByPublishTime} text="Oldest Channel" />
              <MenuOption onSelect={sortByPublishTime2} text="Latest Channel" />
            </MenuOptions>
          </Menu>
        </View>
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
          ListHeaderComponent={<ChannelHeader />}
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

export default Channel;
