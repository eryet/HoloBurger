import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#303030",
  },
  text_container: {
    flexDirection: "column",
    marginHorizontal: 50,
  },
  holoburger_text_view: {
    marginVertical: 40,
    alignItems: "center",
  },
  holoburger_text: {
    width: 300,
    height: 57.83,
  },
  divider: {
    marginTop: 20,
    color: "white",
    height: 2,
  },
  special_thanks: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 25,
    color: "white",
  },
  developed: {
    fontSize: 15,
    color: "white",
  },
  about: {
    marginTop: 20,
    fontSize: 15,
    color: "white",
  },
  about: {
    marginTop: 20,
    fontSize: 15,
    color: "white",
  },
  about_list: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  about_btm: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    color: "white",
  },
  bullet: {
    color: "white",
    width: 130,
  },
});

export default styles;
