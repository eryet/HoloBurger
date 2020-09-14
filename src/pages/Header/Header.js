import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./Styles";

const Header = () => {
  return (
    <View style={styles.flexrow}>
      <View style={styles.left_view}>
        <Text style={styles.left_text}>Holo</Text>
      </View>
      <View>
        <Image
          source={require("../../../assets/fubuki_burger.gif")}
          style={styles.header_gif}
        />
      </View>
      <View style={styles.right_view}>
        <Text style={styles.right_text}>Burger</Text>
      </View>
    </View>
  );
};

export default Header;
