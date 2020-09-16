import { StyleSheet } from "react-native";

const headerStyles = StyleSheet.create({
  flexrow: {
    flexDirection: "row",
    backgroundColor: "#121212",
  },
  header_gif: {
    marginVertical: 5,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overlayColor: "#121212",
  },
  right_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default headerStyles;
