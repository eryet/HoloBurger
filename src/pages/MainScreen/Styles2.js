import { StyleSheet } from "react-native";

const styles2 = StyleSheet.create({
  flexrow: {
    flexDirection: "row",
    backgroundColor: "#121212",
  },
  left_view: {
    flex: 1,
    paddingRight: 15,
  },
  right_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  left_text: {
    textAlign: "right",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: "white",
    fontSize: 20,
  },
  right_text: {
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: "white",
    fontSize: 25,
  },
  header_gif: {
    marginVertical: 5,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overlayColor: "#121212",
  },
  sort_by: {
    color: "white",
    fontSize: 21,
  },
  flexrowsort: {
    position: "absolute",
    alignSelf: "flex-end",
  },
});

export default styles2;
