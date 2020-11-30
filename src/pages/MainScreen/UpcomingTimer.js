import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { formatDistanceToNow } from "date-fns";

import styles from "./Styles";

const UpcomingTimer = (props) => {
  // recieve schedule props
  const [countdown, setCountdown] = useState("");

  // if timer hit callback refresh
  useEffect(() => {
    const counter = setInterval(() => {
      const countdown = new Date(props.schedule);
      const now = new Date().getTime();
      const distance = countdown - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      distance < 0
        ? setCountdown("Started!")
        : setCountdown(
            formatDistanceToNow(new Date(props.schedule), {
              includeSeconds: true,
            })
          );
    }, 1000);
    return () => clearInterval(counter);
  }, []);

  return (
    <Text style={styles.upcoming_timer} numberOfLines={1}>
      Timer: {countdown}
    </Text>
  );
};

export default UpcomingTimer;
