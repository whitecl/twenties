import { fromUnixTime, getUnixTime, intervalToDuration } from "date-fns";
import { pipe } from "ramda";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

const twenty = 20 * 60;

const timestampForTimer = () => getUnixTime(new Date()) + twenty;

const formatTimeLeft = endTimestamp => {
  if (!endTimestamp || getUnixTime(new Date()) > endTimestamp) {
    return null
  }

  return pipe(
    timestamp => fromUnixTime(timestamp),
    endDate => intervalToDuration({ start: new Date(), end: endDate }),
    duration =>
      `${duration.minutes
        .toString()
        .padStart(2, "0")}:${duration.seconds.toString().padStart(2, "0")}`
  )(endTimestamp);
};

export const Timer = () => {
  const [currentEndTime, setCurrentEndTime] = useState();
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    setTimeout(() => setTicker(ticker + 1), 1000);
  });

  const timeLeft = formatTimeLeft(currentEndTime)

  return (
    <View style={styles.container}>
      <Text>You can do anything for 20 minutes.</Text>
      {timeLeft && <Text>{timeLeft}</Text>}
      <Button
        mode="contained"
        onPress={() => setCurrentEndTime(timestampForTimer())}
      >
        Start
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
