import React, { useState } from "react";
import { AppLoading } from "expo";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";

const StartGameScreen = (props) => {
  const [enteredVal, setEnteredVal] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredVal(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredVal("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredVal);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be the number between 1 to 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setEnteredVal("");
    setSelectedNumber(parseInt(enteredVal));
    Keyboard.dismiss();
    // Entered value will be reset in next render cycle, so we can change access that after reset line
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryCard}>
        <Text style={{fontFamily: "VarelaRound_400Regular"}}>You Choosed</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        />
      </Card>
    );
  }

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start New Game</Text>
        <Card style={styles.inputContainer}>
          <Text style={{fontFamily: "VarelaRound_400Regular"}}>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredVal}
          />
          <View style={styles.btnContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color="red"
                color={Colors.accent}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "VarelaRound_400Regular",
  },
  button: {
    width: "45%",
  },
  input: {
    width: 50,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "VarelaRound_400Regular",
  },
  summaryCard: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartGameScreen;
