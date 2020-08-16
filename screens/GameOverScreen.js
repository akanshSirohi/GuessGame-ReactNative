import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AppLoading } from "expo";

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";


const GameOverScreen = (props) => {
  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text style={{fontSize: 25,fontFamily: "VarelaRound_400Regular"}}>The Game is Over!</Text>
        <View style={styles.resContainer}>
            <View style={styles.resChild}>
                <Text style={{fontFamily: "VarelaRound_400Regular"}}>Number of rounds:-</Text>
                <NumberContainer>{props.rounds}</NumberContainer>
            </View>
            <View style={styles.resChild}>
                <Text style={{fontFamily: "VarelaRound_400Regular"}}>Number was:- </Text>
                <NumberContainer>{props.userNum}</NumberContainer>
            </View>
        </View>
        <View style={styles.button}>
            <Button title="New Game" onPress={()=>{props.onRestart()}} color={Colors.accent} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
      alignItems: 'center',
      justifyContent: 'center'
  },
  button: {
      marginTop: 20
  },
  resContainer: {
      flexDirection: 'row',
      marginTop: 20
  },
  resChild: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10
  }
});

export default GameOverScreen;
