import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#303030",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
  },
  channel_name: {
    fontSize: 18,
  },
  header_text: {
    marginLeft: 10,
    fontSize: 24,
    color: "white",
  },
  header_view: {
    flex: 1,
    justifyContent: "center",
  },
  item: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
  thumbnail: {
    width: 192,
    height: 108,
    margin: 5,
    resizeMode: "cover",
  },
  gif_wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  videolink_view: {
    flex: 1,
    flexDirection: "column",
    height: 108,
    margin: 5,
  },
  flex: {
    flex: 1,
  },
  youtube_title: {
    color: "white",
  },
  youtube_channel: {
    color: "#aaaaaa",
  },
  upcoming_timer: {
    color: "#B1FFFF",
  },
  youtube_link: {
    flex: 1,
    flexDirection: "row",
  },
  holo: {
    width: 120,
    height: 54,

    resizeMode: "contain",
  },
  burger: {
    width: 120,
    height: 54,
    resizeMode: "contain",
  },
});

export default styles;
