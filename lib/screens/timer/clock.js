import React from "react";
import { Text } from "react-native";

import { useTimer } from "../../providers/timer-provider";

export const Clock = () => {
  const { timeLeft } = useTimer();

  if (!timeLeft) {
    return null;
  }

  return <Text>{timeLeft}</Text>;
};
