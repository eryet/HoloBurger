import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Flatlist,
  Image,
  Linking,
  ScrollView,
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
      <ScrollView style={styles.scrollView}>
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
          <Text style={styles.special_thanks}>Disclaimer</Text>
          <Text style={styles.about}>
            This is only a fan app. This is NOT a Hololive official app, and
            does not represent interests of CoverCorp and/or related companies.
            Content watched and consumed through this app are properties of
            their respective streamers and owners. Please support the streamers
            in your own way, such as subscribing, watching, superchats, buying
            merchandise, etc
          </Text>
          <Divider style={styles.divider} />
          <Text style={styles.special_thanks}>FAQ</Text>
          <Text style={styles.about_list}>
            Some livestreams are missing / not showing up? ⏳
          </Text>
          <Text style={styles.about}>
            {"  •  "}Unscheduled guerilla streams may take up to 15~20 minutes
            before it will show up.
          </Text>
          <Text style={styles.about}>
            {"  •  "}See{" "}
            <Text
              style={{ color: "#3F96FA" }}
              onPress={() => Linking.openURL("https://schedule.hololive.tv/")}
            >
              schedule.hololive.tv
            </Text>{" "}
            for official schedule and links.
          </Text>
          <Divider style={styles.divider} />
          <Text style={styles.special_thanks}>Special Thanks!</Text>
          <Text style={styles.about}>
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
          <Text style={styles.about}>
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
          <Text style={styles.about_btm}>
            my friend 佩塔 and ZIZI for beta testing the app
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default About;
