import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flexrow: {
    flexDirection: "row",
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  left_view: {
    flex: 1,
    paddingRight: 15,
  },
  right_view: {
    paddingLeft: 10,
    flex: 1,
  },
  left_text: {
    textAlign: "right",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: "white",
    fontSize: 32,
  },
  right_text: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: "white",
    fontSize: 32,
  },
  header_gif: {
    marginVertical: 10,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overlayColor: "#121212",
  },
});

export default styles;
