import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { AppLoading } from "expo";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";

const genRandBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return genRandBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    genRandBetween(1, 100, props.userChoice)
  );
  const [rounds,setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const {userChoice, onGameOver} = props;

  useEffect(()=>{
      if(currentGuess == userChoice) {
        onGameOver(rounds);
      }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 0 && currentGuess < props.userChoice) || (
        direction === 1 && currentGuess > props.userChoice
      )
    ) {
      Alert.alert("Don't lie!", "You know that it is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if(direction == 0) {
        currentHigh.current = currentGuess;
    }else{
        currentLow.current = currentGuess;
    }
    const nextNumber=genRandBetween(currentLow.current,currentHigh.current,currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
  };

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.screen}>
      <Text style={{fontFamily: "VarelaRound_400Regular"}}>Computer's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <View style={styles.button}>
          <Button
            title="Lower"
            onPress={() => {
              nextGuessHandler(0);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Greater"
            onPress={() => {
              nextGuessHandler(1);
            }}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  button: {
    width: "45%",
  },
});

export default GameScreen;
