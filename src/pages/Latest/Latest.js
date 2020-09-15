import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, FlatList } from "react-native";

const Latest = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://api.holotools.app/v1/videos/?status=past&limit=50")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.yt_video_key}
        ListHeaderComponent={<FlatListHeader />}
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

export default Latest;
