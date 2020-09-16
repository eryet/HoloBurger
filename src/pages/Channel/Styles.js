import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#303030",
  },
  loading_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  header: {
    backgroundColor: "#212121",
  },
  header_text: {
    margin: 5,
    fontSize: 24,
    color: "white",
  },
  item: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
  },
  videolink_view: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    justifyContent: "center",
  },
  flex: {
    flex: 1,
  },
  youtube_title: {
    color: "white",
    paddingLeft: 10,
  },
  youtube_channel: {
    color: "gray",
  },
  youtube_link: {
    flex: 1,
    flexDirection: "row",
  },
  flexrowsort: {
    marginTop: 10,
    marginRight: 10,
    alignItems: "center",
  },
});

export default styles;
