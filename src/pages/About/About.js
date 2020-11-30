import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Flatlist,
  Image,
  Linking,
} from "react-native";
import { Divider } from "react-native-elements";

// component
import Header from "./Header.js";

// styles
import styles from "./Styles";
import headerStyles from "./headerStyles";
import { TouchableHighlight } from "react-native-gesture-handler";

const About = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.text_container}>
        <View style={styles.holoburger_text_view}>
          <Image
            style={styles.holoburger_text}
            source={require("../../../assets/cap_holoburger.png")}
          />
        </View>
        <Text style={styles.developed}>
          Developed by{" "}
          <Text
            style={{ color: "#3F96FA" }}
            onPress={() => Linking.openURL("https://github.com/eryet")}
          >
            EryetChen
          </Text>
        </Text>
        <Text style={styles.developed}>Built using React Native</Text>
        <Divider style={styles.divider} />
        <Text style={styles.special_thanks}>Special Thanks!</Text>
        <Text style={styles.about_header}>
          <Text
            style={{ color: "#3F96FA" }}
            onPress={() =>
              Linking.openURL("https://www.reddit.com/user/ExtraHP/")
            }
          >
            u/ExtraHP{" "}
          </Text>
          for the cute fubuki eating burger gif that being use as icon in this
          app
        </Text>
        <Text style={styles.about_header}>
          <Text
            style={{ color: "#3F96FA" }}
            onPress={() =>
              Linking.openURL("https://www.reddit.com/user/Avaradus/")
            }
          >
            u/Avaradus{" "}
          </Text>
          for the cute fubuki pixel art that being use for
          membership-restrict/non-archived stream thumbnail
        </Text>
        <Text style={styles.about_header}>
          my irl friend 佩塔 and ZIZI for beta testing the app
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default About;
