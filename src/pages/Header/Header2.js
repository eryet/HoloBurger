import React from "react";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Menu, {
  MenuProvider,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";

import styles2 from "./Styles2";
import styles from "../MainScreen/Styles";

const Header2 = () => {
  return (
    <View>
      <View style={styles2.flexrow}>
        <View>
          <Image
            source={require("../../../assets/fubuki_burger.gif")}
            style={styles2.header_gif}
          />
        </View>
        <View style={styles2.right_view}>
          <Image source={require("../../../assets/cap_holoburger.png")} />
        </View>
      </View>
    </View>
  );
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "#333333",
    padding: 10,
  },
  optionText: {
    fontSize: 18,
    color: "white",
  },
};

export default Header2;
