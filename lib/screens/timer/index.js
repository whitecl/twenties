import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { TimerProvider } from "../../providers/timer-provider";
import { Clock } from "./clock";
import { Control } from "./control";

export const Timer = () => {
  return (
    <TimerProvider>
      <View style={styles.container}>
        <Text>You can do anything for 20 minutes.</Text>
        <Clock />
        <Control />
        <StatusBar style="auto" />
      </View>
    </TimerProvider>
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
