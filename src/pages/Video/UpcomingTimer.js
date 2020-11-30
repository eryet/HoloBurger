import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { formatDistanceToNow } from "date-fns";

import styles from "./Styles";

const UpcomingTimer = (props) => {
  // recieve schedule props
  const [countdown, setCountdown] = useState("");

  // if timer hit callback refresh
  useEffect(() => {
    const counter = setInterval(
      () =>
        setCountdown(
          formatDistanceToNow(new Date(props.schedule), {
            includeSeconds: true,
          })
        ),

      1000
    );
    return () => clearInterval(counter);
  }, []);

  return (
    <Text style={styles.upcoming_timer} numberOfLines={1}>
      Timer: {countdown}
    </Text>
  );
};

export default UpcomingTimer;
