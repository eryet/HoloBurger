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
  more: {
    marginTop: 5,
  },
  menu: {
    width: 200,
    height: 200,
  },
  sort_by: {
    color: "white",
    fontSize: 21,
  },
  flexrowsort: {
    marginTop: 10,
    marginRight: 10,
    alignItems: "center",
  },
});

export default styles;
