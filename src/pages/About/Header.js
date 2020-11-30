import React from "react";
import { View, Image, SafeAreaView, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./Styles";
import headerStyles from "./headerStyles";

const Header = (props) => {
  return (
    <View style={headerStyles.header}>
      <Image
        source={require("../../../assets/fubuki_burger.gif")}
        style={headerStyles.header_gif}
      />
      <View style={headerStyles.right_view}>
        <Image source={require("../../../assets/cap_holoburger.png")} />
      </View>
      <TouchableHighlight
        onPress={() => props.navigation.goBack()}
        style={headerStyles.back_icon}
      >
        <Ionicons name="md-arrow-round-back" size={30} color="white" />
      </TouchableHighlight>
    </View>
  );
};

export default Header;
