import React from "react";
import { Button } from "react-native-paper";

import { useTimer } from "../../providers/timer-provider";

export const Control = () => {
  const { start } = useTimer();

  return (
    <Button mode="contained" onPress={start}>
      Start
    </Button>
  );
};
